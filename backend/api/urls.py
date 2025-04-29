from django.urls import path, include
from . import views
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('', views.Routes),
    path('get-all-sites/', views.GetAllSites),

    # Auth
    path('auth/register/', views.Register),
    path('get-user-by-token/', views.get_user_by_token),
    path('rest-auth/google/', views.google_login),
    path('auth/', include('dj_rest_auth.urls')),  # login, logout, password reset
    path('logout/', views.logout_view, name='logout'),


    path('predict-damage/', views.predict_damage, name='predict-damage'),

    # Password Reset
    path('user/password/reset/', views.custom_password_reset, name='custom_password_reset'),
    path('user/password/reset/confirm/<uidb64>/<token>/', views.custom_password_reset_confirm, name='custom_password_reset_confirm'),
]

