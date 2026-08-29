import { useState } from 'react';
import Login from './Login';
import HabitList from './HabitList';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <>
          <p>Hola, {user}</p>
          <HabitList />
        </>
      ) : (
        <Login onLoginSuccess={(username) => setUser(username)} />
      )}
    </div>
  );
}

export default App;