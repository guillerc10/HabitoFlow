from django.shortcuts import render, get_object_or_404
from .models import Habit, HabitLog

def habit_list(request):
    habits = Habit.objects.all()
    return render(request, 'habits/habit_list.html', {'habits': habits})


def habit_detail(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id)
    logs = HabitLog.objects.filter(habit=habit).order_by('-date')
    return render(request, 'habits/habit_detail.html', {'habit': habit, 'logs': logs})