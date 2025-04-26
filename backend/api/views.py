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

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:5173/"  # ana sayfa
    client_class = OAuth2Client

