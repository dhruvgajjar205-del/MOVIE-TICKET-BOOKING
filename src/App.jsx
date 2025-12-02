import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import MovieBooking from './pages/MovieBooking.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import BookingHistory from './pages/BookingHistory.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/book/:movieId" element={
              <PrivateRoute roles={['user']}>
                <MovieBooking />
              </PrivateRoute>
            } />

            <Route path="/payment" element={
              <PrivateRoute roles={['user']}>
                <PaymentPage />
              </PrivateRoute>
            } />

            <Route path="/admin" element={
              <PrivateRoute roles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            } />

            <Route path="/bookings" element={
              <PrivateRoute roles={['user']}>
                <BookingHistory />
              </PrivateRoute>
            } />

            <Route path="/booking-confirmation" element={
              <PrivateRoute roles={['user']}>
                <BookingConfirmation />
              </PrivateRoute>
            } />

            <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '2rem' }}>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
