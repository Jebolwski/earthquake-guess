from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from dotenv import load_dotenv
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import ValidationError
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
import jwt
from django.conf import settings
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status
from . import models
from . import serializers

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


import os
import pickle   
import numpy as np

from rest_framework.decorators import api_view
from rest_framework.response import Response
import pickle
import os

@api_view(['POST'])
def predict_damage(request):
    land_surface_condition_mapping = {
        'Flat': 0,
        'Moderate slope': 1,
        'Steep slope': 2
    }
    
    roof_type_mapping = {
        'Bamboo/Timber-Light roof': 0,
        'Bamboo/Timber-Heavy roof': 1,
        'RCC/RB/RBC': 2
    }
    
    foundation_type_mapping = {
        'Mud mortar-Stone/Brick': 0,
        'Bamboo/Timber': 1,
        'Cement-Stone/Brick': 2,
        'RC': 3
    }
    
    ground_floor_type_mapping = {
        'Mud': 0,
        'RC': 1,
        'Brick/Stone': 2,
        'Timber': 3
    }

    try:
        data = request.data
        print("1")
        # Veriyi al
        input_data = [
            float(data['plinth_area_sq_ft']),
            float(data['magnitude']),
            land_surface_condition_mapping[data['land_surface_condition']],  # mapping kullan!
            int(data['count_floors_pre_eq']),
            float(data['height_ft_pre_eq']),
            roof_type_mapping[data['roof_type']],                           # mapping kullan!
            int(data['age_building']),
            foundation_type_mapping[data['foundation_type']],               # mapping kullan!
            ground_floor_type_mapping[data['ground_floor_type']]             # mapping kullan!
        ]

        print("2222")

        input_array = np.array(input_data).reshape(1, -1)

        print("2")
        # Modellerin dosyalarını oku
        models_dir = os.path.join(os.path.dirname(__file__), 'models')  # Modeller burada olsun
        model_files = [
            "RandomForest_model_9features.sav",
            "GradientBoosting_model_9features.sav",
            "DecisionTree_model_9features.sav",
            "KNeighbors_model_9features.sav",
            "LinearRegression_model_9features.sav",
            "MLPRegressor_model_9features.sav",
            "AdaBoost_model_9features.sav"
        ]
        print("3")

        predictions = {}

        for model_file in model_files:
            print("4")
            model_path = os.path.join(models_dir, model_file)
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            print("5")
            prediction = model.predict(input_array)[0]
            predictions[model_file.replace("_model_9features.sav", "")] = prediction

        return Response(predictions, status=200)

    except Exception as e:
        print("6")
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_damage_and_save(request):
    land_surface_condition_mapping = {
        'Flat': 0,
        'Moderate slope': 1,
        'Steep slope': 2
    }
    
    roof_type_mapping = {
        'Bamboo/Timber-Light roof': 0,
        'Bamboo/Timber-Heavy roof': 1,
        'RCC/RB/RBC': 2
    }
    
    foundation_type_mapping = {
        'Mud mortar-Stone/Brick': 0,
        'Bamboo/Timber': 1,
        'Cement-Stone/Brick': 2,
        'RC': 3
    }
    
    ground_floor_type_mapping = {
        'Mud': 0,
        'RC': 1,
        'Brick/Stone': 2,
        'Timber': 3
    }

    try:
        data = request.data

        # Tahmin için verileri hazırla
        input_data = [
            float(data['plinth_area_sq_ft']),
            float(data['magnitude']),
            land_surface_condition_mapping[data['land_surface_condition']],
            int(data['count_floors_pre_eq']),
            float(data['height_ft_pre_eq']),
            roof_type_mapping[data['roof_type']],
            int(data['age_building']),
            foundation_type_mapping[data['foundation_type']],
            ground_floor_type_mapping[data['ground_floor_type']]
        ]

        input_array = np.array(input_data).reshape(1, -1)

        # Modellerin tahminini al
        models_dir = os.path.join(os.path.dirname(__file__), 'models')
        model_files = [
            "RandomForest_model_9features.sav",
            "GradientBoosting_model_9features.sav",
            "DecisionTree_model_9features.sav",
            "KNeighbors_model_9features.sav",
            "LinearRegression_model_9features.sav",
            "MLPRegressor_model_9features.sav",
            "AdaBoost_model_9features.sav"
        ]

        predictions = {}
        prediction_values = []

        for model_file in model_files:
            model_path = os.path.join(models_dir, model_file)
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            prediction = model.predict(input_array)[0]
            predictions[model_file.replace("_model_9features.sav", "")] = prediction
            prediction_values.append(prediction)

        # Ortalama tahmin
        avg_prediction = sum(prediction_values) / len(prediction_values)

        # Building nesnesini oluştur ve veritabanına kaydet
        building = models.Building.objects.create(
            user=request.user if request.user.is_authenticated else None,
            building_floor_count=data['count_floors_pre_eq'],
            building_height=data['height_ft_pre_eq'],
            building_age=data['age_building'],
            building_plinth_area=data['plinth_area_sq_ft'],
            earthquake_magnitude=data['magnitude'],
            foundation_type=data['foundation_type'],
            roof_type=data['roof_type'],
            land_surface_condition=data['land_surface_condition'],
            ground_floor_type=data['ground_floor_type'],
            prediction=round(avg_prediction,3)
        )
        print(building)

        return Response({
            'model_predictions': predictions,
            'average_prediction': avg_prediction,
            'building_id': building.id
        }, status=200)

    except Exception as e:
        return Response({'error': str(e)}, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def latest_predictions(request):
    buildings = models.Building.objects.all().order_by('-date_added')[:6]  # en son eklenenler en üstte
    serializer = serializers.BuildingSerializer(buildings, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_building_by_id(request, building_id):
    try:
        building = models.Building.objects.get(id=building_id, user=request.user)  # Kullanıcıya ait mi kontrol edilir
    except models.Building.DoesNotExist:
        return Response({'error': 'Building not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.BuildingSerializer(building)
    return Response(serializer.data, status=200)



