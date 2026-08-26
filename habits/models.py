from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

class Habit(models.Model):
    """
    Representa un hábito creado por un usuario.
    """
    FREQUENCY_CHOICES = [
        ('daily', 'Diario'),
        ('weekly', 'Semanal'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=200, verbose_name='Nombre')
    description = models.TextField(blank=True, verbose_name='Descripción')
    frequency = models.CharField(
        max_length=10,
        choices=FREQUENCY_CHOICES,
        default='daily',
        verbose_name='Frecuencia'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')
    is_active = models.BooleanField(default=True, verbose_name='Activo')

    class Meta:
        verbose_name = 'Hábito'
        verbose_name_plural = 'Hábitos'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.user.username})'

    def get_current_streak(self):
        """Calcula la racha actual (días consecutivos cumplidos hasta hoy)."""
        today = timezone.localdate()
        streak = 0
        date = today

        while True:
            log = self.logs.filter(date=date, completed=True).first()
            if log:
                streak += 1
                date -= timezone.timedelta(days=1)
            else:
                break

        return streak

    def get_max_streak(self):
        """Calcula la racha máxima histórica."""
        logs = self.logs.filter(completed=True).order_by('date').values_list('date', flat=True)
        logs = list(logs)

        if not logs:
            return 0

        max_streak = 1
        current_streak = 1

        for i in range(1, len(logs)):
            diff = (logs[i] - logs[i - 1]).days
            if diff == 1:
                current_streak += 1
                max_streak = max(max_streak, current_streak)
            else:
                current_streak = 1

        return max_streak

    def is_done_today(self):
        """Devuelve True si el hábito ya fue completado hoy."""
        today = timezone.localdate()
        return self.logs.filter(date=today, completed=True).exists()


class HabitLog(models.Model):
    """
    Registro diario de cumplimiento de un hábito.
    """
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date = models.DateField(verbose_name='Fecha')
    completed = models.BooleanField(default=False, verbose_name='Cumplido')
    notes = models.TextField(blank=True, verbose_name='Notas')

    class Meta:
        verbose_name = 'Registro de hábito'
        verbose_name_plural = 'Registros de hábitos'
        ordering = ['-date']
        unique_together = ['habit', 'date']  # Un solo registro por hábito por día

    def __str__(self):
        status = '✅' if self.completed else '❌'
        return f'{status} {self.habit.name} — {self.date}'


