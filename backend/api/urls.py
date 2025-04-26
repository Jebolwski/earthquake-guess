from django.urls import path, include
from . import views
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView

urlpatterns = [
    path('', views.Routes),
    path('get-all-sites/', views.GetAllSites),

    # Auth
    path('register/', views.Register),
    path('get-user-by-token/', views.get_user_by_token),
    path('rest-auth/google/', views.GoogleLogin.as_view()),
    path('auth/', include('dj_rest_auth.urls')),  # login, logout, password reset

    # Password Reset
    path('user/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('user/password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]

