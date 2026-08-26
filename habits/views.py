from django.shortcuts import render, redirect, get_object_or_404
from .models import Habit
from .forms import HabitForm

def habit_create(request):
    if request.method == 'POST':
        form = HabitForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('habit_list')
    else:
        form = HabitForm()
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Nuevo hábito'})

def habit_update(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    if request.method == 'POST':
        form = HabitForm(request.POST, instance=habit)
        if form.is_valid():
            form.save()
            return redirect('habit_list')
    else:
        form = HabitForm(instance=habit)
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Editar hábito'})

def habit_delete(request, pk):
    habit = get_object_or_404(Habit, pk=pk)
    if request.method == 'POST':
        habit.delete()
        return redirect('habit_list')
    return render(request, 'habits/habit_confirm_delete.html', {'habit': habit})