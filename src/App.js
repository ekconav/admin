import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminDashboard />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
