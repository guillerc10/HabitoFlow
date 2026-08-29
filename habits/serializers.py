from rest_framework import serializers
from .models import Habit, HabitLog

class HabitSerializer(serializers.ModelSerializer):
    current_streak = serializers.SerializerMethodField()

    class Meta:
        model = Habit
        fields = ['id', 'name', 'description', 'frequency', 'created_at', 'is_active', 'current_streak']
        read_only_fields = ['id', 'created_at']

    def get_current_streak(self, obj):
        return obj.get_current_streak()

class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date', 'completed', 'notes']
        read_only_fields = ['id']