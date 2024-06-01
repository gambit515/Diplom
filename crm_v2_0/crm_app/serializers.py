from rest_framework import serializers
from .models import Record, Filial, Procedure, UserInfo
from django.contrib.auth.models import User


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = "__all__"


class FilialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filial
        fields = "__all__"


class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = UserInfoSerializer(source='userinfo', read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'profile']


class RecordSerializer(serializers.ModelSerializer):
    guest = UserSerializer(read_only=False)
    master = UserSerializer(read_only=False)
    procedure = ProcedureSerializer(read_only=False)
    filial = FilialSerializer(read_only=False)
    class Meta:
        model = Record
        fields = ['id', 'date', 'timeStart', 'timeFinish', 'master', 'guest', 'procedure','filial']
        # fields = "__all__"

    def create(self, validated_data):
        guest_id = validated_data.pop('guest_id')  # Попробуйте использовать 'guest_id' вместо 'guest'
        master_id = validated_data.pop('master_id')  # Аналогично для 'master_id'
        procedure_id = validated_data.pop('procedure_id')
        filial_id = validated_data.pop('filial_id')
        record = Record.objects.create(guest_id=guest_id, **validated_data)
        return record


class RecordSerializer(serializers.ModelSerializer):
    guest = UserSerializer(read_only=False)
    master = UserSerializer(read_only=False)
    procedure = ProcedureSerializer(read_only=False)
    filial = FilialSerializer(read_only=False)
    class Meta:
        model = Record
        fields = ['id', 'date', 'timeStart', 'timeFinish', 'master', 'guest', 'procedure','filial']
        # fields = "__all__"


class RecordCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = "__all__"



def display_dict_keys(dictionary):
    for key in dictionary.keys():
        print(key)










