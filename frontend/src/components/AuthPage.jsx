import React, { useState } from 'react';
import { orderAPI } from '../services/api';
import '../styles/AuthPage.css';

const AuthPage = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }

    if (isSignup && !formData.email) {
      setError('Email is required for signup');
      return;
    }

    try {
      setLoading(true);
      let response;

      if (isSignup) {
        response = await orderAPI.signup({
          username: formData.username,
          password: formData.password,
          email: formData.email,
        });
      } else {
        response = await orderAPI.login({
          username: formData.username,
          password: formData.password,
        });
      }

      const { token, username, message } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      setSuccess(`${message}! Welcome, ${username}!`);
      setFormData({ username: '', password: '', email: '' });

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(username);
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || (isSignup ? 'Signup failed' : 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError('');
    setSuccess('');
    setFormData({ username: '', password: '', email: '' });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🧺 Laundry Order System</h1>
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              className="link-btn"
              onClick={toggleMode}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
