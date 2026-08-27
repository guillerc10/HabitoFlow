from rest_framework import serializers
from .models import Habit, HabitLog

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name', 'description', 'frequency', 'created_at', 'is_active']
        read_only_fields = ['id', 'created_at']