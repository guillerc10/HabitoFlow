from django.urls import path
from . import views


urlpatterns = [
    path('', views.habit_list, name='habit_list'),
    path('habito/<int:habit_id>/', views.habit_detail, name='habit_detail'),
    path('habito/nuevo/', views.habit_create, name='habit_create'),
    path('habito/<int:habit_id>/editar/', views.habit_update, name='habit_update'),
    path('habito/<int:habit_id>/eliminar/', views.habit_delete, name='habit_delete'),
    path('habito/<int:habit_id>/checkin/', views.habit_checkin, name='habit_checkin'),
]