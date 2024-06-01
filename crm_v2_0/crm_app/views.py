from collections import defaultdict
from datetime import datetime
import os

from django.db.models import Count
from django.forms import model_to_dict
from rest_framework import generics
from django.shortcuts import render
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from rest_framework.views import APIView
from .models import *
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


'''
class ScheduleAPIView(generics.ListAPIView):
    serializer_class = RecordSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Record.objects.filter(Master=user)
        else:
            return Response({'post': "Нихера не работает"})
'''

def get_user_id_from_token(auth_token):
    try:
        token = Token.objects.get(key=auth_token)
        user = token.user
        user_id = user.id
        return user_id
    except Token.DoesNotExist:
        return None


class FilialAPIView(generics.ListCreateAPIView):
    serializer_class = FilialSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Filial.objects
        else:
            return Response({'post': "Нихера не работает"})


class UserAPIView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return User.objects
        else:
            return Response({'post': "Нихера не работает"})


class ProcedureAPIView(generics.ListCreateAPIView):
    serializer_class = ProcedureSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Procedure.objects
        else:
            return Response({'post': "Нихера не работает"})

class ScheduleAPIView(generics.ListCreateAPIView):
    serializer_class = RecordSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Record.objects.filter(master=user)
        else:
            return Response({'post': "Нихера не работает"})


class ScheduleCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RecordCreateSerializer
    permission_classes = (IsAuthenticated,)





class GetUserInfo(APIView):
    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            result = get_full_info_about_user(user)
            if (result):
                return Response(result)
            else:
                return Response({f'UserInfo': f"Нихера не работает {result}"})


def get_full_info_about_user(user):
    try:
        user_info = UserInfo.objects.get(user=user)
        user_social_medias = UserSocialMedia.objects.filter(user=user)
        user_groups = user.groups.all()
        social_media_list = []
        user_groups_list = []

        # Упаковка всех ролей юзера
        if user_groups:
            for entry in user_groups:
                user_groups_list.append({
                    'name': entry.name,
                })

        # Упаковка всех социальных сетей юзера
        if user_social_medias:
            for entry in user_social_medias:
                social_media_list.append({
                    'name': entry.social_media.name,
                    'url': entry.url,
                })


        result = {
            'name': user.first_name,
            'surname': user.last_name,
            'patronymic': user_info.patronymic,
            'status': user_info.status,
            'phone': user_info.phone,
            'date_birth': user_info.date_birth,
            'social_medias': social_media_list,
            'user_groups': user_groups_list,
            #'photo': os.path.abspath('../images/'+user_info.photo.name),
            'photo': user_info.photo.name,
        }
        return result
    except Exception as e:
        print(f"Ошибка {e}")
        return None


class RecordsCountByDateView(APIView):
    def get(self, request):
        user = self.request.user
        if user.is_authenticated:
            records_count_by_date = Record.objects.filter(master=user) \
                .values('date') \
                .annotate(count=Count('id')) \
                .order_by('date')

            month_dict = defaultdict(list)

            # Создание словаря где ключом является номер месяца
            id_day = 0
            for entry in records_count_by_date:
                month_year = str(entry['date'].month) + "-" + str(entry['date'].year)
                month_dict[month_year].append({
                    'id': id_day,
                    'link': "#",
                    'dateOfTheDay': entry['date'].strftime('%d'),  # 'date': entry['Date'].strftime('%d-%m-%Y'),
                    'count': entry['count']
                })
                id_day += 1

            # Обработка словаря в массив данных
            result = []
            idmonth = 0
            for month_year, days in month_dict.items():
                result.append({
                    'id': idmonth,
                    'month_year': month_year,
                    'total': "",
                    'days': days
                })
                idmonth = +1
            return Response(result)
        else:
            return Response({'post': "Нихера не работает"})


'''
class ScheduleAPIView(APIView):
    def get(self, request):
        records_list = Record.objects.all().values()
        return Response({'records': list(records_list)})
        #queryset = Record.objects.all()
        #serializer_class = RecordSerializer

    def post(self, request):
        guest_id = request.data['Guest']
        master_id = request.data['Master']
        procedure_id = request.data['Procedure']

        # Получение объектов пользователя и процедуры
        serializer = RecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'post': serializer.data})
'''
