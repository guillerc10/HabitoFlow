import { useState, useEffect } from 'react';
import api from './api';
import HabitDetail from './HabitDetail';

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const loadHabits = () => {
    api.get('habitos/')
      .then(response => setHabits(response.data))
      .catch(error => console.error('Error cargando hábitos:', error));
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const handleCheckin = (habitId) => {
    api.post(`habitos/${habitId}/checkin/`)
      .then(() => {
        loadHabits();
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
          <p>🔥 Racha actual: {habit.current_streak}</p>
          <button onClick={() => handleCheckin(habit.id)}>Marcar hoy</button>
          <button onClick={() => setExpandedId(expandedId === habit.id ? null : habit.id)}>
            {expandedId === habit.id ? 'Ocultar progreso' : 'Ver progreso'}
          </button>
          {expandedId === habit.id && <HabitDetail habitId={habit.id} />}
        </div>
      ))}
    </div>
  );
}

export default HabitList;