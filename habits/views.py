from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Habit, HabitLog
from .forms import HabitForm
from django.contrib.auth.forms import UserCreationForm

@login_required
def habit_list(request):
    habits = Habit.objects.filter(user=request.user)
    return render(request, 'habits/habit_list.html', {'habits': habits})

@login_required
def habit_detail(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id, user=request.user)
    logs = HabitLog.objects.filter(habit=habit).order_by('-date')
    return render(request, 'habits/habit_detail.html', {'habit': habit, 'logs': logs})

@login_required
def habit_create(request):
    if request.method == 'POST':
        form = HabitForm(request.POST)
        if form.is_valid():
            habit = form.save(commit=False)
            habit.user = request.user
            habit.save()
            return redirect('habit_list')
    else:
        form = HabitForm()
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Nuevo hábito'})

@login_required
def habit_update(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id, user=request.user)
    if request.method == 'POST':
        form = HabitForm(request.POST, instance=habit)
        if form.is_valid():
            form.save()
            return redirect('habit_list')
    else:
        form = HabitForm(instance=habit)
    return render(request, 'habits/habit_form.html', {'form': form, 'titulo': 'Editar hábito'})

@login_required
def habit_delete(request, habit_id):
    habit = get_object_or_404(Habit, id=habit_id, user=request.user)
    if request.method == 'POST':
        habit.delete()
        return redirect('habit_list')
    return render(request, 'habits/habit_confirm_delete.html', {'habit': habit})


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})