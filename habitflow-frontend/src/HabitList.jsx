import { useState, useEffect } from 'react';
import api from './api';
import HabitDetail from './HabitDetail';
import HabitForm from './HabitForm';
import ConfirmDelete from './ConfirmDelete';

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingHabit, setEditingHabit] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingHabit, setDeletingHabit] = useState(null);

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
      .then(() => loadHabits())
      .catch(error => console.error('Error en check-in:', error));
  };

  const handleDelete = () => {
    api.delete(`habitos/${deletingHabit.id}/`)
      .then(() => {
        setDeletingHabit(null);
        loadHabits();
      })
      .catch(error => console.error('Error al eliminar:', error));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mis hábitos</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
          + Nuevo hábito
        </button>
      </div>

      {showCreateForm && (
        <div className="card p-3 mb-4 shadow-sm">
          <HabitForm
            onSaved={() => {
              setShowCreateForm(false);
              loadHabits();
            }}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      <div className="row g-3">
        {habits.map(habit => (
          <div className="col-12 col-md-6 col-lg-4" key={habit.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                {editingHabit?.id === habit.id ? (
                  <HabitForm
                    habit={habit}
                    onSaved={() => {
                      setEditingHabit(null);
                      loadHabits();
                    }}
                    onCancel={() => setEditingHabit(null)}
                  />
                ) : deletingHabit?.id === habit.id ? (
                  <ConfirmDelete
                    habitName={habit.name}
                    onConfirm={handleDelete}
                    onCancel={() => setDeletingHabit(null)}
                  />
                ) : (
                  <>
                    <h5 className="card-title">{habit.name}</h5>
                    <p className="card-text text-muted">{habit.description}</p>
                    <p className="mb-2">🔥 Racha actual: <strong>{habit.current_streak}</strong></p>
                    <div className="mt-auto d-flex gap-2 flex-wrap">
                      <button className="btn btn-success btn-sm" onClick={() => handleCheckin(habit.id)}>
                        Marcar hoy
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setExpandedId(expandedId === habit.id ? null : habit.id)}
                      >
                        {expandedId === habit.id ? 'Ocultar progreso' : 'Ver progreso'}
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setEditingHabit(habit)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setDeletingHabit(habit)}
                      >
                        Eliminar
                      </button>
                    </div>
                    {expandedId === habit.id && (
                      <div className="mt-3">
                        <HabitDetail habitId={habit.id} />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitList;