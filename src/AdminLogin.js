import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig'; // Import Firebase authentication instance
import './AdminLogin.css'; // Import CSS file for styling

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Perform login with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if the user email is of admin type
      if (user.email.endsWith('@admin.com')) {
        onLogin(true); // Notify parent component that admin is logged in
      } else {
        setError('Only admins are allowed to log in.');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>
      <div className="input-container">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminLogin;
