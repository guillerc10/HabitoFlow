from django.shortcuts import render, redirect, get_object_or_404
from .models import Habit, HabitLog
from .forms import HabitForm

def habit_list(request):
    habits = Habit.objects.all()
    return render(request, 'habits/habit_list.html', {'habits': habits})

def habit_detail(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id)
    logs = HabitLog.objects.filter(habit=habit).order_by('-date')
    return render(request, 'habits/habit_detail.html', {'habit': habit, 'logs': logs})

def habit_create(request):
    if request.method == 'POST':
        form = HabitForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('habit_list')
    else:
        form = HabitForm()
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Nuevo hábito'})

def habit_update(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id)
    if request.method == 'POST':
        form = HabitForm(request.POST, instance=habit)
        if form.is_valid():
            form.save()
            return redirect('habit_list')
    else:
        form = HabitForm(instance=habit)
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Editar hábito'})

def habit_delete(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id)
    if request.method == 'POST':
        habit.delete()
        return redirect('habit_list')
    return render(request, 'habits/habit_confirm_delete.html', {'habit': habit})