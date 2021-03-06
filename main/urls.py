"""project_3team_mijung_sketch_book URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('main', views.index, name='index'), # GET - main page
    path('paint/<int:id>/', views.paint, name='paint'), # GET - paint page
    path('painting', views.painting),  # POST - 제출 -> result로 이동
    path('mypage/', views.mypage, name='mypage'),
    path('delete/', views.delete_painting),
    path('detail/<int:id>/', views.detail, name='detail'),
]
