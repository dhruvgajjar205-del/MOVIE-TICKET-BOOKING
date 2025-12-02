import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      setError('Error fetching bookings');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(`http://localhost:5000/api/bookings/${id}/cancel`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Booking cancelled successfully');
        fetchBookings();
      } catch (err) {
        setError('Error cancelling booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'booking-badge-confirmed';
      case 'cancelled':
        return 'booking-badge-cancelled';
      default:
        return 'booking-badge-default';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Container className="mt-5">
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'blue',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>My Bookings</h2>
        {error && (
          <div style={{
            backgroundColor: 'white',
            color: 'red',
            padding: '1rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '2px solid red'
          }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{
            backgroundColor: 'white',
            color: 'green',
            padding: '1rem',
            borderRadius: '5px',
            marginBottom: '1rem',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '2px solid green'
          }}>
            {success}
          </div>
        )}
        <Row>
          {bookings.map((booking) => (
            <Col md={6} lg={4} className="mb-4" key={booking._id}>
              <section style={{
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'white',
                border: '2px solid blue'
              }}>
                <Card style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '2px solid blue',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%'
                }}>
                  <Card.Body>
                    <Card.Title style={{
                      color: 'black',
                      fontWeight: 'bold',
                      marginBottom: '1rem',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>{booking.movie.title}</Card.Title>
                    <Card.Text style={{
                      color: 'black',
                      lineHeight: '1.6',
                      fontWeight: 'bold'
                    }}>
                      <strong>Showtime:</strong> {booking.showtime}<br />
                      <strong>Seats:</strong> {booking.seats.join(', ')}<br />
                      <strong>Total Price:</strong> ₹{booking.totalPrice}<br />
                      <strong>Status:</strong> <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </Card.Text>
                    {booking.status === 'confirmed' && (
                      <Button style={{
                        background: 'blue',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 6px rgba(0, 0, 255, 0.3)'
                      }} size="sm" onClick={() => handleCancel(booking._id)}>
                        Cancel Booking
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </section>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BookingHistory;
