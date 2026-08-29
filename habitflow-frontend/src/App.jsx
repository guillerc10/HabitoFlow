import { useState } from 'react';
import Login from './Login';
import HabitList from './HabitList';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <>
          <nav className="navbar navbar-dark bg-dark px-3">
            <span className="navbar-text text-white">Hola, {user}</span>
          </nav>
          <HabitList />
        </>
      ) : (
        <Login onLoginSuccess={(username) => setUser(username)} />
      )}
    </div>
  );
}

export default App;