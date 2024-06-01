from django.db import models
from django.contrib.auth.models import User


class Filial(models.Model):
    name = models.CharField(max_length=100,null=False)
    manager = models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    notes = models.TextField(max_length=300,null=True)

    def __str__(self):
        return self.name


class Procedure(models.Model):
    name = models.CharField(max_length=50,null=False)
    shortname = models.CharField(max_length= 5,default="")
    cost = models.FloatField(max_length=10,null=False)
    notes = models.TextField(max_length=300,null=True)
    materials = models.TextField(max_length=300,null=False)

    def __str__(self):
        return self.name


class Record(models.Model):
    date = models.DateField(null=False)
    timeStart = models.TimeField(null=False)
    timeFinish = models.TimeField(null=False)
    filial = models.ForeignKey(Filial,on_delete=models.CASCADE,null=False,default=0)
    guest = models.ForeignKey(User,on_delete=models.CASCADE, related_name='guest',null=False)
    master = models.ForeignKey(User,on_delete=models.CASCADE, related_name='master',null=False)
    procedure = models.ForeignKey(Procedure,on_delete=models.CASCADE,null=False)

    def __str__(self):
        return f"Record: {self.id}"

def upload_image_path(instance, filename):
    shapes = filename.split('.')

    filename = f"{instance.user.username}.{shapes[1]}"
    return f'images/{filename}'


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=False)
    patronymic = models.CharField(max_length=50, null=False)
    status = models.CharField(max_length=20, null=False)
    phone = models.CharField(max_length=20, null=False)
    date_birth = models.DateField(null=False)
    notes = models.TextField(max_length=300,blank=True)
    photo = models.ImageField(upload_to=upload_image_path,blank=True)
    shortname = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.user.username


class SocialMedia(models.Model):
    name = models.CharField(max_length=50,null=False)

    def __str__(self):
        return self.name


class UserSocialMedia(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False)
    social_media = models.ForeignKey(SocialMedia, on_delete=models.CASCADE,null=False,default=0)
    url = models.URLField(null=False)

    def __str__(self):
        return f"{self.user.username} {self.social_media.name}"




