import { useState } from 'react';
import Landing from './Landing';
import Login from './Login';
import HabitList from './HabitList';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // 'landing' | 'login'

  if (user) {
    return (
      <div>
       <nav className="navbar navbar-dark px-3 d-flex justify-content-between navbar-brand-custom">
  <span className="navbar-text" style={{ color: '#D1D066' }}>🔥 HabitFlow — Hola, {user}</span>
  <button className="btn btn-accent btn-sm" onClick={() => setUser(null)}>
    Cerrar sesión
  </button>
</nav>
        <HabitList />
      </div>
    );
  }

  if (view === 'login') {
    return <Login onLoginSuccess={(username) => setUser(username)} />;
  }

  return (
    <Landing
      onGetStarted={() => setView('login')}
      onLogin={() => setView('login')}
    />
  );
}

export default App;