from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from . import models, forms, serializers
from django.contrib.auth.forms import UserCreationForm
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
import jwt
from django.conf import settings
import logging
from dotenv import load_dotenv
import os
import datetime
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes
from django.contrib.auth.models import User
from django.core.files.storage import FileSystemStorage
from allauth.account.forms import \
    default_token_generator as allauth_token_generator
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import int_to_base36, urlsafe_base64_decode
from django.contrib.auth.models import User

load_dotenv()



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['is_authenticated'] = user.is_authenticated
        token['is_superuser'] = user.is_superuser

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def Routes(request):
    routes = [
        '/rest-auth/google/',
        '/auth/login',
        '/auth/logout',
        '/auth/user',
        '/auth/password/change',
        '/auth/password/reset',
        '/auth/password/reset/confirm',
        '/register',
        '/login/',
    ]

    return Response(routes)


@api_view(['POST'])
def Register(request):
    form = UserCreationForm()
    if request.data:
        mails = [i.email for i in User.objects.all()]
        if request.data.get('email') in mails:
            return Response({"msg_en": "This email already in use. 😢", "msg_tr": "Girdiğiniz email kullanımda. 😢"}, status=400)
        form = forms.SignupForm(request.data)
        if form.is_valid():
            user = form.save()
            data = {"user": user}
            formprofile = forms.ProfileForm(data)
            if formprofile.is_valid():
                profile = formprofile.save()
                return Response({"msg_en": "Successfully registered. ✨", "msg_tr": "Başarıyla kayıt olundu. ✨"}, status=200)
            else:
                user.delete()
                return Response({"msg_en": "An error occured. 🤔", "msg_tr": "Bir hata oluştu. 🤔"}, status=400)
        else:
            print(form.errors)
            return Response({"msg_en": "Data is not valid. 🤨", "msg_tr": "Veri doğru değil. 🤨"}, status=400)
    else:
        return Response({"msg_en": "There was no data entered. 😒", "msg_tr": "Bize veri verilmedi. 😒"}, status=400)


@api_view(['POST'])
def GoogleAddOrGetProfile(request, id):
    """Profil ekler, user verisini alır."""
    if request.data:
        user = User.objects.get(id=request.data.get('user'))
        profile = models.Profile.objects.filter(user=user)
        if len(profile) > 0:
            serializer = serializers.ProfileSerializer(profile[0], many=False)
            return Response({"data": serializer.data}, status=200)
        form = forms.ProfileForm(request.data)
        if form.is_valid():
            profile = form.save()
            serializer = serializers.ProfileSerializer(profile, many=False)
            return Response({"data": serializer.data}, status=200)
        else:
            return Response({"msg_en": "Data is not valid. 😥", "msg_tr": "Veri doğru değil. 😥"}, status=400)
    else:
        return Response({"msg_en": "There was no data entered. 😒", "msg_tr": "Bize veri verilmedi. 😒"}, status=400)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def UpdateProfile(request):
    """
        Profili günceller bio, profilePhoto verilerini alır.
    """
    profile = get_object_or_404(models.Profile, id=request.user.id)
    if request.data:
        if request.data.get('bio'):
            profile.bio = request.data.get('bio')
        if 'profilePhoto' in request.FILES:
            profile.profilePhoto = request.FILES['profilePhoto']
        profile.save()
        data = serializers.ProfileSerializer(profile, many=False)
        return Response({"msg_en": "Successfully updated profile. 🚀", "msg_tr": "Profil başarıyla güncellendi. 🚀", "data": data.data}, status=200)
    else:
        return Response({"msg_en": "There was no data entered. 😒", "msg_tr": "Bize veri verilmedi. 😒"}, status=400)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def MuteProfile(request, mute_id):
    """Bir kişinin sessize alınmasını sağlar, mute_id parametresini alır."""
    profile = models.Profile.objects.filter(user=request.user)
    if len(profile) > 0:
        profile = profile[0]
    else:
        return Response({"msg_en": "Couldnt find the profile. 🥲", "msg_tr": "Profil bulunamadı. 🥲"}, status=400)
    mute = models.Profile.objects.filter(id=mute_id)
    if len(mute) > 0:
        mute = mute[0]
    else:
        return Response({"msg_en": "Couldnt find the profile. 🥲", "msg_tr": "Profil bulunamadı. 🥲"}, status=400)
    return Response({"msg_en": "Successfully muted "+mute.user.username+". 😄", "msg_tr": mute.user.username+" başarıyla sessize alındı. 😄"}, status=200)





class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173/login"
    client_class = OAuth2Client
