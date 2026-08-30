function Landing({ onGetStarted, onLogin }) {
  return (
    <div>
      <nav className="navbar navbar-dark px-3 navbar-brand-custom">
        <span className="navbar-brand mb-0 h1">🔥 HabitFlow</span>
        <button className="btn btn-accent btn-sm" onClick={onLogin}>
          Iniciar sesión
        </button>
      </nav>

      <div className="text-center py-5" style={{ backgroundColor: '#B9C7F8' }}>
        <h1 className="display-4 fw-bold mb-3 text-primary-custom">
          Construye hábitos que duran
        </h1>
        <p className="lead mb-4" style={{ color: '#0D21A4' }}>
          Registra tus hábitos diarios, sigue tu racha y visualiza tu progreso — todo en un solo lugar.
        </p>
        <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
          Comenzar gratis
        </button>
      </div>

      <div className="container py-5">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="fs-1 mb-2">✅</div>
            <h5 className="text-primary-custom">Check-in diario</h5>
            <p className="text-muted">Marca tus hábitos cumplidos con un solo clic, cada día.</p>
          </div>
          <div className="col-md-4">
            <div className="fs-1 mb-2">🔥</div>
            <h5 className="text-primary-custom">Rachas automáticas</h5>
            <p className="text-muted">Ve cuántos días consecutivos llevas cumpliendo cada hábito.</p>
          </div>
          <div className="col-md-4">
            <div className="fs-1 mb-2">📊</div>
            <h5 className="text-primary-custom">Progreso visual</h5>
            <p className="text-muted">Un heatmap de 30 días te muestra tu constancia de un vistazo.</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-muted py-4 border-top">
        <small>HabitFlow — Proyecto de portafolio</small>
      </footer>
    </div>
  );
}

export default Landing;