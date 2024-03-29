import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from 'axios';

export default function StaffLoginForm() {
  const [SEmail, setSEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2500/staff/login', { SEmail, Password });
      if (response.data.State === 'Success') {
        // Navigate to StaffHome if login is successful
        navigate('/StaffHome');
      } else {
        setErrorMessage(response.data); // Display error message from backend
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='staff-wrapper'>
      <form onSubmit={handleLogin}>
        <h1>Staff Login</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className='input-box'>
          <input
            type="text"
            name="SEmail"
            id="username"
            placeholder='username'
            required
            value={SEmail}
            onChange={(e) => setSEmail(e.target.value)}
          />
        </div>
        <div className='input-box'>
          <input
            type="password"
            name="Password"
            id="password"
            placeholder='password'
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='remember'>
          <label htmlFor=""><input type='checkbox' />Remember </label>
          <a href='#'>Forgot Password</a>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
