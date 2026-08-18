from django.urls import path
from . import views

urlpatterns = [
    path('', views.habit_list, name='habit_list'),
    path('habito/<int:habit_id>/', views.habit_detail, name='habit_detail'),
]