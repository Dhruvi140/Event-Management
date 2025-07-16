import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(form.username, form.password);
    if (success) {
      const toast = document.getElementById('loginToast');
      if (toast) {
        new window.bootstrap.Toast(toast).show();
      }
      setTimeout(() => navigate('/'), 1500);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-primary fw-bold mb-4">🔐 Admin Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="form-control shadow-sm"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="form-control shadow-sm"
              required
            />
          </div>

          {error && <div className="text-danger mb-3 small">{error}</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary rounded-pill shadow">
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
        <div
          id="loginToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="2000"
        >
          <div className="d-flex">
            <div className="toast-body">✅ Login successful!</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
