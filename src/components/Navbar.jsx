
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();
    
    return (
        <nav style={navStyle}>
            <Link to="/" style={linkStyle}>GRAB YOUR SEAT</Link>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>

                {user && user.role === 'admin' && (
                    <Link to="/admin" style={linkStyle}>Admin Dashboard</Link>
                )}

                {user && user.role === 'user' && (
                    <Link to="/bookings" style={linkStyle}>My Bookings</Link>
                )}

                {user ? (
                    <>
                        <span style={{ color: '#333333', marginRight: '15px' }}>
                            Welcome, {user.username} ({user.role})
                        </span>
                        <button onClick={logout} style={buttonStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};


const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    background: 'white',
    color: 'black',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    borderBottom: '2px solid blue',
};

const linkStyle = {
    color: 'blue',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
};

const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
};

export default Navbar;
