
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from habits import views as habit_views
from rest_framework.routers import DefaultRouter
from habits.views import HabitViewSet
from habits.views import HabitLogViewSet
from habits.views import get_csrf_token, api_login, api_logout

router = DefaultRouter()
router.register(r'habitos', HabitViewSet, basename='habito')
router.register(r'logs', HabitLogViewSet, basename='habitlog')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('habits.urls')),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', habit_views.signup, name='signup'),
    path('api/', include(router.urls)),
    path('api/csrf/', get_csrf_token, name='api_csrf'),
    path('api/login/', api_login, name='api_login'),
    path('api/logout/', api_logout, name='api_logout'),
    
]