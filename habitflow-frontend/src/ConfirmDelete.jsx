function ConfirmDelete({ habitName, onConfirm, onCancel }) {
  return (
    <div>
      <p>¿Seguro que quieres eliminar <strong>{habitName}</strong>?</p>
      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={onConfirm}>Sí, eliminar</button>
        <button className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}

export default ConfirmDelete;