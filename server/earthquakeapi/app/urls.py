from django.urls import path
from .views import predict_damage
from . import views

urlpatterns = [
    path("predict", view=views.predict_damage, name="predict-damage"),
    path("get-all-blogs", view=views.get_all_buildings, name="get-all-buildings"),
]
