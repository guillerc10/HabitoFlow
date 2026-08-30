import { useState, useEffect } from 'react';
import api from './api';
import { format, subDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

function HabitDetail({ habitId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`logs/?habit=${habitId}`)
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error cargando logs:', error));
  }, [habitId]);

  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => subDays(today, 29 - i));

  const isCompleted = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return logs.some(log => log.date === dateStr && log.completed);
  };

  return (
    <div>
      <small className="text-muted d-block mb-2">
        Últimos 30 días — hoy es {format(today, "d 'de' MMMM", { locale: es })}
      </small>
      <div className="d-flex flex-wrap" style={{ gap: '3px' }}>
        {days.map(day => {
          const isToday = isSameDay(day, today);
          return (
            <div
              key={day.toISOString()}
              title={`${format(day, "EEEE d 'de' MMMM", { locale: es })}${isToday ? ' (hoy)' : ''}`}
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: isCompleted(day) ? '#D1D066' : '#e9ecef',
                borderRadius: '2px',
                border: isToday ? '2px solid #0d6efd' : 'none',
                boxSizing: 'border-box',
              }}
            />
          );
        })}
      </div>
      <div className="d-flex align-items-center gap-2 mt-2">
        <small className="text-muted">Leyenda:</small>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#40c463', borderRadius: '2px' }} />
        <small className="text-muted">Cumplido</small>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#e9ecef', borderRadius: '2px' }} />
        <small className="text-muted">No cumplido</small>
        <div style={{ width: '12px', height: '12px', border: '2px solid #0d6efd', borderRadius: '2px', boxSizing: 'border-box' }} />
        <small className="text-muted">Hoy</small>
      </div>
    </div>
  );
}

export default HabitDetail;