import { useState, useEffect } from 'react';
import api from './api';
import { format, subDays } from 'date-fns';

function HabitDetail({ habitId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`logs/?habit=${habitId}`)
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error cargando logs:', error));
  }, [habitId]);

  const days = Array.from({ length: 30 }, (_, i) => subDays(new Date(), 29 - i));

  const isCompleted = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return logs.some(log => log.date === dateStr && log.completed);
  };

  return (
    <div>
      <h4>Últimos 30 días</h4>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {days.map(day => (
          <div
            key={day.toISOString()}
            title={format(day, 'yyyy-MM-dd')}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: isCompleted(day) ? '#40c463' : '#3a3a3a',
              borderRadius: '3px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitDetail;