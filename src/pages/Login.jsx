import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);
      navigate(loggedInUser?.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        border: '2px solid blue'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: 'blue',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'black',
              fontWeight: 'bold'
            }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid blue',
                borderRadius: '5px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: 'white',
                color: 'black',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'blue'}
              onBlur={(e) => e.target.style.borderColor = 'blue'}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'black',
              fontWeight: 'bold'
            }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid blue',
                borderRadius: '5px',
                fontSize: '1rem',
                boxSizing: 'border-box',
                background: 'white',
                color: 'black',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'blue'}
              onBlur={(e) => e.target.style.borderColor = 'blue'}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Login
          </button>
        </form>
        {error && (
          <p style={{
            color: 'red',
            textAlign: 'center',
            marginTop: '1rem',
            fontWeight: 'bold'
          }}>
            {error}
          </p>
        )}
        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: 'black',
          fontWeight: 'bold'
        }}>
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: 'blue',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;