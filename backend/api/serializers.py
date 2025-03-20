from rest_framework import serializers
from . import models
from django.contrib.auth.models import User




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_superuser',
                  'date_joined', 'last_login', 'is_authenticated']

        extra_kwargs = {'password': {
            'write_only': True,
            'required': True
        }}
