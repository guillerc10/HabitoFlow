import { useState, useEffect } from 'react';
import api from './api';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

function HabitCalendar({ habitId }) {
  const [logs, setLogs] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    api.get(`logs/?habit=${habitId}`)
      .then(response => setLogs(response.data))
      .catch(error => console.error('Error cargando logs:', error));
  }, [habitId]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = getDay(monthStart);

  const isCompleted = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return logs.some(log => log.date === dateStr && log.completed);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          ←
        </button>
        <strong className="text-capitalize">{format(currentMonth, "MMMM yyyy", { locale: es })}</strong>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(d => (
          <small key={d} className="text-muted">{d}</small>
        ))}

        {Array.from({ length: startPadding }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map(day => (
          <div
            key={day.toISOString()}
            title={format(day, "d 'de' MMMM", { locale: es })}
            style={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              fontSize: '0.75rem',
              backgroundColor: isCompleted(day) ? '#D1D066' : '#f1f1f1',
              border: isToday(day) ? '2px solid #0D21A4' : 'none',
              boxSizing: 'border-box',
              color: isCompleted(day) ? '#0D21A4' : '#666',
              fontWeight: isToday(day) ? 'bold' : 'normal',
            }}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitCalendar;