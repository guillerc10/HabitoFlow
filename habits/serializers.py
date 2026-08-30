from rest_framework import serializers
from .models import Habit, HabitLog

class HabitSerializer(serializers.ModelSerializer):
    current_streak = serializers.SerializerMethodField()
    completed_today = serializers.SerializerMethodField()

    class Meta:
        model = Habit
        fields = ['id', 'name', 'description', 'frequency', 'created_at', 'is_active', 'current_streak', 'completed_today']
        read_only_fields = ['id', 'created_at']

    def get_current_streak(self, obj):
        return obj.get_current_streak()

    def get_completed_today(self, obj):
        return obj.is_done_today()


class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date', 'completed', 'notes']
        read_only_fields = ['id']