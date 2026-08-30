
function ReminderBanner({ habits, permission, onRequestPermission }) {
  const pending = habits.filter(h => !h.completed_today && h.is_active);

  return (
    <div>
      {permission !== 'granted' && permission !== 'unsupported' && (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <span>🔔 Activa las notificaciones para no olvidar tus hábitos.</span>
          <button className="btn btn-sm btn-primary" onClick={onRequestPermission}>
            Activar
          </button>
        </div>
      )}

      {pending.length === 0 ? (
        <div className="alert alert-success d-flex align-items-center gap-2">
          <span>✅</span>
          <span>¡Ya marcaste todos tus hábitos de hoy!</span>
        </div>
      ) : (
        <div className="alert alert-warning d-flex align-items-center gap-2">
          <span>⏰</span>
          <span>
            Te falta{pending.length > 1 ? 'n' : ''} marcar {pending.length} hábito{pending.length > 1 ? 's' : ''} hoy:{' '}
            <strong>{pending.map(h => h.name).join(', ')}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

export default ReminderBanner;