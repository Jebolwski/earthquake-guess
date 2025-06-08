from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Routes),
    path('get-all-sites/', views.GetAllSites),

    # Auth
    path('auth/register/', views.Register),
    path('get-user-by-token/', views.get_user_by_token),
    path('rest-auth/google/', views.google_login),
    path('auth/', include('dj_rest_auth.urls')),  # login, logout, password reset
    path('logout/', views.logout_view, name='logout'),


    path('save-real-data/', views.save_real_data, name='save-real-data'),
    path('predict-damage/', views.predict_damage, name='predict-damage'),
    path('predict-damage-and-save/', views.predict_damage_and_save, name='predict-damage-and-save'),
    path('latest-predictions/', views.latest_predictions, name='latest-predictions'),
    path('latest-full-buildings/', views.latest_full_buildings, name='latest-full-buildings'),
    path('get_users_last_three_predictions/', views.get_users_last_tree_predicted_buildings, name='get-users-last-three-predictions'),
    path('get_users_last_tree_added_buildings/', views.get_users_last_tree_added_buildings, name='get_users_last_tree_added_buildings'),
    path('get-building/<int:building_id>/', views.get_building_by_id, name='get_building_by_id'),
    path('get-full-building/<int:building_id>/', views.get_full_building_by_id, name='get_full_building_by_id'),
    # Password Reset
    path('user/password/reset/', views.custom_password_reset, name='custom_password_reset'),
    path('user/password/reset/confirm/<uidb64>/<token>/', views.custom_password_reset_confirm, name='custom_password_reset_confirm'),
]

