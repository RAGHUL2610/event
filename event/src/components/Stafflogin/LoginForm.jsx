import React from 'react';
import './LoginForm.css';

export default function LoginForm() {
  return (
    <div className='a'>
      <div className='staff-wrapper'> {/* Updated class name */}
        <form action="">
          <h1>Staff Login</h1>
          <div className='input-box'>
            <input type="text" name="" id="username" placeholder='username' required />
          </div>
          <div className='input-box'>
            <input type="password" name="" id="password" placeholder='password' required />
          </div>
          <div className='remember'>
            <label htmlFor=""><input type='checkbox' />Remember </label>
            <a href='#'>Forgot Password</a>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}
