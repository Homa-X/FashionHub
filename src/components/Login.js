import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:3001';

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please fill in both username/email and password.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users?username=${username}`);

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (u) =>
            (u.username && u.username.toLowerCase() === username.toLowerCase()) ||
            (u.email && u.email.toLowerCase() === username.toLowerCase())
        );

        if (user && user.password === password) {
          alert(`Login successful for ${user.username}! Redirecting to home...`);
          localStorage.setItem('loggedInUser', JSON.stringify({ id: user.id, username: user.username, email: user.email }));
          navigate('/');
        } else {
          alert('Invalid username/email or password.');
        }
      } else {
        alert('Error connecting to the server.');
      }
    } catch (error) {
      alert('Error connecting to the server.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}

export default Login;
