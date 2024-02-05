import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'diego' && password === '123') {
      onLogin(username);
    } else {
      alert('Sorry, you have entered an invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form className="login-form">
          <label htmlFor='username'>Username:</label>
          <input required type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor='password'>Password:</label>
          <input required type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='login-button' onClick={handleLogin}>Sign in</button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login;