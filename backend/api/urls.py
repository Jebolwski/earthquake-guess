from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('', views.Routes),

    path('user/password/reset/', PasswordResetView.as_view(),
         name='rest_password_reset'),
    path('user/password/reset/confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    # TODO Auth
    path('rest-auth/google/', views.GoogleLogin.as_view()),
    path('auth/', include('dj_rest_auth.urls')),
    path('register', views.Register),

    # TODO Profile
    path('profile/<int:id>/google', views.GoogleAddOrGetProfile),

]
