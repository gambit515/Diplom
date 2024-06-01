from django.contrib import admin
from .models import *


class RecordAdmin(admin.ModelAdmin):
    list_display = ('id','master', "guest", "date", "procedure")


class ProcedureAdmin(admin.ModelAdmin):
    list_display = ('id','name', "cost")


class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('id','user',)


class UserSocialMediaAdmin(admin.ModelAdmin):
    list_display = ('id','user',)


class SocialMediaAdmin(admin.ModelAdmin):
    list_display = ('id','name',)


class FilialAdmin(admin.ModelAdmin):
    list_display = ('id','name',)


admin.site.register(Record, RecordAdmin)
admin.site.register(Procedure, ProcedureAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(UserSocialMedia, UserSocialMediaAdmin)
admin.site.register(SocialMedia, SocialMediaAdmin)
admin.site.register(Filial, FilialAdmin)
