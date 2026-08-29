from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse
from .models import Habit, HabitLog


class HabitModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.habit = Habit.objects.create(
            user=self.user,
            name='Leer',
            description='Leer 20 minutos al día',
            frequency='daily',
        )

    def test_habit_creation(self):
        self.assertEqual(self.habit.name, 'Leer')
        self.assertEqual(self.habit.user, self.user)
        self.assertTrue(self.habit.is_active)

    def test_streak_starts_at_zero(self):
        self.assertEqual(self.habit.get_current_streak(), 0)


class HabitAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.other_user = User.objects.create_user(username='otheruser', password='testpass123')
        self.habit = Habit.objects.create(user=self.user, name='Leer', frequency='daily')

    def test_unauthenticated_user_cannot_access_habits(self):
        response = self.client.get('/api/habitos/')
        self.assertEqual(response.status_code, 403)

    def test_authenticated_user_sees_only_own_habits(self):
        self.client.login(username='testuser', password='testpass123')
        response = self.client.get('/api/habitos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_user_cannot_see_others_habits(self):
        self.client.login(username='otheruser', password='testpass123')
        response = self.client.get('/api/habitos/')
        self.assertEqual(len(response.json()), 0)

    def test_checkin_creates_log(self):
        self.client.login(username='testuser', password='testpass123')
        response = self.client.post(f'/api/habitos/{self.habit.id}/checkin/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(HabitLog.objects.filter(habit=self.habit).exists())

    def test_checkin_toggles_completion(self):
        self.client.login(username='testuser', password='testpass123')
        self.client.post(f'/api/habitos/{self.habit.id}/checkin/')
        response = self.client.post(f'/api/habitos/{self.habit.id}/checkin/')
        self.assertEqual(response.json()['completed'], False)