import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking data from location state
  const booking = location.state?.booking;

  // If no booking data, redirect to home or booking page
  React.useEffect(() => {
    if (!booking) {
      navigate('/', { replace: true });
    }
  }, [booking, navigate]);

  if (!booking) {
    return null; // or loader spinner if desired
  }

  const { movieTitle, seatsSelected, totalAmount, showTime } = booking;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 255, 0.2)',
        border: '2px solid blue',
        color: 'black',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', fontWeight: 'bold', color: 'blue' }}>Booking Confirmed</h2>

        <div style={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Thank you for your booking. Here are your ticket details:
        </div>

        <div style={{ textAlign: 'left', fontSize: '1rem', color: 'black' }}>
          <p><strong>Movie:</strong> {movieTitle}</p>
          <p><strong>Showtime:</strong> {showTime}</p>
          <p><strong>Seats:</strong> {seatsSelected?.join(', ')}</p>
          <p><strong>Total Price:</strong> ₹{totalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
