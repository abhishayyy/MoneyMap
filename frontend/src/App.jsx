import React, { useState } from 'react';
import Auth from './components/Auth';
import NewDashboard from './components/NewDashboard';
import { getUser } from './lib/api';
import './styles.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="moneymap-root">
      {user ? (
        <NewDashboard user={user} onLogout={() => setUser(null)} />
      ) : (
        <Auth onAuth={setUser} />
      )}
    </div>
  );
}
