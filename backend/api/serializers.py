from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Building,BuildingFullData

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'  # Veya belirli alanları yazabilirsin

class BuildingFullDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingFullData
        fields = '__all__'  # Veya belirli alanları yazabilirsin


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser',
                  'date_joined', 'last_login', 'is_authenticated']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}
