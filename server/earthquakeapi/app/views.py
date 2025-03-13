import os
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Building
from .serializers import BuildingSerializer, UserSerializer
import joblib  # veya pickle
from django.http import JsonResponse
from .models import Building
from .serializers import BuildingSerializer
from rest_framework.decorators import api_view
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer


xg_model_path = r"C:\Users\mertg\OneDrive\Masaüstü\Dosya\Programming\data-eng\earthquake\earthquake-guess\server\earthquakeapi\app\models\xgboost.pkl"
dt_model_path = r"C:\Users\mertg\OneDrive\Masaüstü\Dosya\Programming\data-eng\earthquake\earthquake-guess\server\earthquakeapi\app\models\decision_tree.pkl"
rf_model_path = r"C:\Users\mertg\OneDrive\Masaüstü\Dosya\Programming\data-eng\earthquake\earthquake-guess\server\earthquakeapi\app\models\random_forest.pkl"
lr_model_path = r"C:\Users\mertg\OneDrive\Masaüstü\Dosya\Programming\data-eng\earthquake\earthquake-guess\server\earthquakeapi\app\models\logistic_regression.pkl"

xg_model = joblib.load(xg_model_path)
dt_model = joblib.load(dt_model_path)
rf_model = joblib.load(rf_model_path)
lr_model = joblib.load(lr_model_path)

# Kategorik değişkenler için encoding sözlükleri
foundation_type_encoding = {
    "Mud mortar-Stone/Brick": 0,
    "Cement-Stone/Brick": 1,
    "Bamboo/Timber": 2, 
    "RC": 3,
}

roof_type_encoding = {
    "Bamboo/Timber-Light roof": 0,
    "Bamboo/Timber-Heavy roof": 1,
    "RCC/RB/RBC": 2,
}

land_surface_condition_encoding = {
    "Moderate slope": 0,
    "Flat": 1,
    "Steep slope": 2,
}

ground_floor_type_encoding = {
    "Mud": 0,
    "RC": 1,
    "Brick/Stone": 2,
    "Timber": 3,
}

models = {
    "XGBoost": xg_model,
    "Decision Tree": dt_model,
    "Random Forest": rf_model,
    "Logistic Regression": lr_model
}

@csrf_exempt
def predict_damage(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
       

        # Kategorik değişkenleri sayısal hale getirme
        try:
            input_data = np.array([[
                data["building_floor_count"],
                data["building_height"],
                data["building_age"],
                data["building_plinth_area"],
                data["earthquake_magnitude"],
                foundation_type_encoding[data["foundation_type"]],
                roof_type_encoding[data["roof_type"]],
                land_surface_condition_encoding[data["land_surface_condition"]],
                ground_floor_type_encoding[data["ground_floor_type"]]
            ]])

            print("Input Data:", input_data)  # Debugging için

            predictions = {}
            for model_name, model in models.items():
                pred = model.predict(input_data)[0] + 1  # 1 tabanlı damage grade
                print(pred)
                predictions[model_name + "_damage_grade"] = int(pred)
                if data["save"]=="true":
                    # Gelen veriyi veritabanına kaydet
                    building = Building.objects.create(
                        building_floor_count=data["building_floor_count"],
                        building_height=data["building_height"],
                        building_age=data["building_age"],
                        building_plinth_area=data["building_plinth_area"],
                        earthquake_magnitude=data["earthquake_magnitude"],
                        foundation_type=data["foundation_type"],
                        roof_type=data["roof_type"],
                        land_surface_condition=data["land_surface_condition"],
                        ground_floor_type=data["ground_floor_type"],
                        date_added=now()  # Otomatik tarih ekleme
                    )

                    return JsonResponse({
                        "message": "Prediction successful, data saved!",
                        "predictions": predictions,
                        "building_id": BuildingSerializer(building).data
                    })
                
            return JsonResponse({
                "message": "Prediction successful, data not saved!",
                "predictions": predictions,
            })

        except KeyError as e:
            return JsonResponse({"error": f"Invalid category: {str(e)}"}, status=400)

    return JsonResponse({"error": "Only POST method allowed"}, status=405)


@api_view(["GET"])
@csrf_exempt 
def get_all_buildings(request):
    buildings = Building.objects.all()
    serializer = BuildingSerializer(buildings, many=True)
    print(serializer.data)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({'token': token.key, 'user': serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")
