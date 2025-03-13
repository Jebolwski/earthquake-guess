from django.urls import path
from . import views

urlpatterns = [
    path("predict", view=views.predict_damage, name="predict-damage"),
    path("get-all-buildings", view=views.get_all_buildings, name="get-all-buildings"),
    path("signup", view=views.signup, name="signup"),
    path("login", view=views.login, name="login"),
    path("test_token", view=views.test_token, name="test_token"),
]
