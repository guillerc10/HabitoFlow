import { useState, useEffect } from 'react';
import api from './api';

function HabitForm({ habit, onSaved, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [error, setError] = useState('');

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description);
      setFrequency(habit.frequency);
    }
  }, [habit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const data = { name, description, frequency };
    const request = habit
      ? api.patch(`habitos/${habit.id}/`, data)
      : api.post('habitos/', data);

    request
      .then(() => onSaved())
      .catch(() => setError('No se pudo guardar el hábito. Revisa los datos.'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">{habit ? 'Editar hábito' : 'Nuevo hábito'}</h5>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="2"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Frecuencia</label>
        <select
          className="form-select"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        >
          <option value="daily">Diario</option>
          <option value="weekly">Semanal</option>
        </select>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default HabitForm;