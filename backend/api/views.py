from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dotenv import load_dotenv
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth import update_session_auth_hash
from allauth.socialaccount.models import SocialAccount, SocialLogin
from django.contrib.auth import get_user_model
from django.core.exceptions import MultipleObjectsReturned
from rest_framework.views import APIView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialLogin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from allauth.socialaccount.helpers import complete_social_login
from django.core.exceptions import MultipleObjectsReturned
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import status
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialLogin

load_dotenv()



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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

@api_view(['POST'])
def get_user_by_token(request):
    token = request.data.get('token')  # token'ı POST body'sinden alıyoruz

    if not token:
        return Response({"msg": "Token not provided"}, status=400)

    try:
        token_obj = Token.objects.get(key=token)
        user = token_obj.user
    except Token.DoesNotExist:
        return Response({"msg": "Invalid token"}, status=401)

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })

@api_view(['GET'])
def Routes(request):
    routes = [
        '/rest-auth/google/',
        '/auth/login/',
        '/auth/logout/',
        '/auth/user/',
        '/auth/password/change/',
        '/auth/password/reset/',
        '/auth/password/reset/confirm/',
        '/register/',
    ]
    return Response(routes)

@api_view(['POST'])
@permission_classes([AllowAny])
def Register(request):
    if request.data:
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({"msg": "This email is already registered."}, status=400)

        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if username and email and password:
            user = User.objects.create_user(username=username, email=email, password=password)
            return Response({"msg": "User registered successfully."}, status=201)
        else:
            return Response({"msg": "Missing fields."}, status=400)
    else:
        return Response({"msg": "No data provided."}, status=400)

@api_view(['GET'])
def GetAllSites(request):
    sites = Site.objects.all().values("id", "domain", "name")
    return Response({"sites": list(sites)})

@api_view(['POST'])
def logout_view(request):
    token_key = request.data.get('token')

    if not token_key:
        return Response({"error": "Token not provided."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        token = Token.objects.get(key=token_key)
        token.delete()
        return Response({"success": "Token deleted successfully."}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def custom_password_reset(request):
    # POST isteği ile gelen veriyi alalım (email)
    if request.method == "POST":
        email = request.data.get('email')  # Kullanıcının email adresi
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({"error": "User with that email not found."}, status=404)

        # Kullanıcı bulunursa, reset token ve uid oluşturuyoruz
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(str(user.pk).encode('utf-8'))

        # Reset linkini frontend'e uygun formatta hazırlıyoruz
        reset_link = f"{settings.FRONTEND_URL}/reset-password/confirm/{uid}/{token}/"

        # E-posta içeriğini doğrudan string olarak yazıyoruz
        subject = "Password Reset Request"
        message = f"""
        Hello {user.username},

        You're receiving this email because you or someone else has requested a password reset for your account.

        To reset your password, click the link below:
        {reset_link}

        If you didn't request a password reset, you can safely ignore this email.

        Thank you for using our service!
        """

        # E-posta gönderme
        send_mail(subject, message, 'no-reply@localhost', [email])

        return JsonResponse({"message": "Password reset email sent!"}, status=200)
    
    return JsonResponse({"error": "Invalid request method."}, status=400)

@csrf_exempt
@api_view(['POST'])
def custom_password_reset_confirm(request, uidb64, token):
    # Body'den uid ve token alıyoruz
    new_password1 = request.data.get('new_password1')
    new_password2 = request.data.get('new_password2')

    if not new_password1 or not new_password2:
        raise ValidationError("Yeni şifreler boş olamaz.")

    if new_password1 != new_password2:
        raise ValidationError("Şifreler eşleşmiyor.")

    # Token ve UID'yi doğrulamak için işlem yapalım
    try:
        uid = urlsafe_base64_decode(uidb64).decode('utf-8')
        user = get_user_model().objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        raise ValidationError("Geçersiz link veya kullanıcı.")

    if not default_token_generator.check_token(user, token):
        raise ValidationError("Geçersiz token.")

    # Yeni şifreyi ayarlıyoruz
    form = SetPasswordForm(user, request.data)
    if form.is_valid():
        form.save()

        # Kullanıcının oturumunu güncelliyoruz
        update_session_auth_hash(request, user)

        return Response({"message": "Şifreniz başarıyla sıfırlandı."}, status=status.HTTP_200_OK)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

import jwt
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

@csrf_exempt
@api_view(['POST'])
def google_login(request):
    # Frontend'den JWT token'ı al
    print(request,"bomboclat")
    google_token = request.data.get('token')
    if not google_token:
        return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Google'dan gelen token'ı decode ediyoruz (signature doğrulaması olmadan)
        decoded_data = jwt.decode(google_token, options={"verify_signature": False})
    except jwt.DecodeError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

    # decoded_data içinden bilgileri çekiyoruz
    email = decoded_data.get('email')
    first_name = decoded_data.get('given_name')
    last_name = decoded_data.get('family_name')
    username = email.split('@')[0]  # email'in '@' öncesini username yapıyoruz

    if not email:
        return Response({'error': 'Email not found in token'}, status=status.HTTP_400_BAD_REQUEST)

    # Kullanıcı daha önce kaydolmuş mu diye kontrol ediyoruz
    user, created = User.objects.get_or_create(email=email, defaults={
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
    })

    # Eğer kullanıcı yeni değilse username farklı olabilir, yine email üzerinden devam ediyoruz

    # Kullanıcıya token üretiyoruz (varsa alıyoruz)
    token, _ = Token.objects.get_or_create(user=user)

    return Response({
        'message': 'Login successful',
        'token': token.key,
        'user': user.username,
    }, status=status.HTTP_200_OK)