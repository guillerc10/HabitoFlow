import { useState, useEffect } from 'react';
import api from './api';

function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    api.get('habitos/')
      .then(response => setHabits(response.data))
      .catch(error => console.error('Error cargando hábitos:', error));
  }, []);

  const handleCheckin = (habitId) => {
    api.post(`habitos/${habitId}/checkin/`)
      .then(response => {
        console.log('Check-in exitoso:', response.data);
      })
      .catch(error => console.error('Error en check-in:', error));
  };

  return (
    <div>
      <h1>Mis hábitos</h1>
      {habits.map(habit => (
        <div key={habit.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{habit.name}</h3>
          <p>{habit.description}</p>
          <button onClick={() => handleCheckin(habit.id)}>Marcar hoy</button>
        </div>
      ))}
    </div>
  );
}

export default HabitList;