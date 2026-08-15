from django.contrib import admin
from .models import Habit, HabitLog


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'frequency', 'is_active', 'created_at')
    list_filter = ('frequency', 'is_active', 'user')
    search_fields = ('name', 'description', 'user__username')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)


@admin.register(HabitLog)
class HabitLogAdmin(admin.ModelAdmin):
    list_display = ('habit', 'date', 'completed')
    list_filter = ('completed', 'date', 'habit__user')
    search_fields = ('habit__name',)
    ordering = ('-date',)
