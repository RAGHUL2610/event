import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate(); // Import useNavigate
  const [SEmail, setSEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if credentials match
    if (SEmail === 'admin@gmail.com' && Password === 'admin@1234') {
      // Navigate to the desired route
      navigate('/AdminHome/view-event');
    } else {
      // Set error message for invalid credentials
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className='admin-wrapper'>
      <form onSubmit={handleLogin}> {/* Add onSubmit event handler */}
        <h1>Admin Login</h1>
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
        <button type="submit">Login</button> {/* Change button type to submit */}
      </form>
    </div>
  );
}
