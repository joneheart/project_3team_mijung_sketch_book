from django.urls import path
from . import views

urlpatterns = [
    path('', views.login),
    path('sign-up/', views.sign_up, name='sign-up'),
    path('logout/', views.logout, name='logout'),
]