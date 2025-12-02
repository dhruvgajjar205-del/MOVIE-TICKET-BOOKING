import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [modalMessage, setModalMessage] = useState('');
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  
  const bookingData = JSON.parse(localStorage.getItem('tempBooking')) || {};
  const { movieId, movieTitle, totalAmount, seatsSelected, showTime } = bookingData;

  const handleFakePayment = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      
      await axios.post('/api/bookings', {
        movieId,
        showtime: showTime, 
        seats: seatsSelected,
        totalPrice: totalAmount
      });

      setPaymentSuccess(true);
      setModalType('success');
      setModalMessage(`Your tickets are now booked!`);
      setShowModal(true);
      setCountdown(5);

      
      const booking = {
        movieTitle,
        seatsSelected,
        totalAmount,
        showTime
      };

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.removeItem('tempBooking');
            navigate('/booking-confirmation', { state: { booking } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => {
        localStorage.removeItem('tempBooking');
        navigate('/booking-confirmation', { state: { booking } });
      }, 3000);
    } catch (err) {
      setModalType('failure');
      setModalMessage(` Oops! Something went wrong with your booking. ${err.response?.data?.message || err.message}. Please check your details and try again. We're here to help!`);
      setShowModal(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!movieTitle) {
      return <h2>No Booking Data Found. Start booking a movie first.</h2>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: 'black'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
        border: '2px solid blue'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'blue',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          Secure Payment
        </h2>

        {/* Booking Summary */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '2px solid blue'
        }}>
          <h3 style={{
            color: 'blue',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold'
          }}>
            Booking Summary
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            <div>
              <p style={{ margin: '0.5rem 0', color: 'black', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <strong style={{ color: 'blue' }}>Movie:</strong> {movieTitle}
              </p>
              <p style={{ margin: '0.5rem 0', color: 'black', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <strong style={{ color: 'blue' }}>Showtime:</strong> {showTime}
              </p>
            </div>
            <div>
              <p style={{ margin: '0.5rem 0', color: 'black', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <strong style={{ color: 'blue' }}>Seats:</strong> {seatsSelected?.join(', ')}
              </p>
              <p style={{ margin: '0.5rem 0', color: 'black', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <strong style={{ color: 'blue' }}>Quantity:</strong> {seatsSelected?.length}
              </p>
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            background: 'blue',
            padding: '1rem',
            borderRadius: '10px',
            marginTop: '1rem'
          }}>
            <p style={{
              margin: '0',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
              Total: ₹{totalAmount}
            </p>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            color: 'blue',
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '1.3rem',
            fontWeight: 'bold'
          }}>
            Choose Payment Method
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: paymentMethod === 'card' ? 'blue' : 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid blue',
              color: 'black',
              fontWeight: 'bold'
            }}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ display: 'none' }}
              />
              Credit/Debit Card
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 1.5rem',
              background: paymentMethod === 'upi' ? 'blue' : 'white',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid blue',
              color: 'black',
              fontWeight: 'bold'
            }}>
              <input
                type="radio"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ display: 'none' }}
              />
              UPI Payment
            </label>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleFakePayment}>
          {paymentMethod === 'card' ? (
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '2px solid blue'
            }}>
              <h4 style={{
                color: 'blue',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                Card Details
              </h4>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Card Number (e.g., 4444 xxxx xxxx 1111)"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid blue',
                    borderRadius: '8px',
                    background: 'white',
                    color: 'black',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'blue'}
                  onBlur={(e) => e.target.style.borderColor = 'blue'}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  required
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid blue',
                    borderRadius: '8px',
                    background: 'white',
                    color: 'black',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'blue'}
                  onBlur={(e) => e.target.style.borderColor = 'blue'}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid blue',
                    borderRadius: '8px',
                    background: 'white',
                    color: 'black',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'blue'}
                  onBlur={(e) => e.target.style.borderColor = 'blue'}
                />
              </div>
            </div>
          ) : (
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '2px solid blue'
            }}>
              <h4 style={{
                color: 'blue',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: 'bold'
              }}>
                UPI Details
              </h4>
              <input
                type="text"
                placeholder="UPI ID (e.g., user@upi)"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid blue',
                  borderRadius: '8px',
                  background: 'white',
                  color: 'black',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'blue'}
                onBlur={(e) => e.target.style.borderColor = 'blue'}
              />
            </div>
          )}

          {/* Pay Now Button */}
          <button
            type="submit"
            disabled={loading || paymentSuccess}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#555' : 'blue',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(0, 0, 255, 0.4)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 255, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 255, 0.4)';
              }
            }}
          >
            {loading ? 'Processing Payment...' : 'Pay Now'}
          </button>
        </form>

        {/* Security Note */}
        <p style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: 'black',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          Your payment information is secure and encrypted
        </p>
      </div>

      {/* Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={{
          background: 'blue',
          color: 'white',
          border: 'none'
        }}>
          <Modal.Title>
            {modalType === 'success' ? 'Payment Successful' : 'Payment Failed'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          background: 'white',
          color: 'black',
          textAlign: 'center',
          padding: '2rem',
          border: '2px solid blue'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem'
          }}>
            {modalType === 'success' ? '' : '😔'}
          </div>
          <p style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            margin: '0 0 1rem 0'
          }}>
            {modalMessage}
          </p>
          {modalType === 'success' && (
            <p style={{
              fontSize: '1rem',
              margin: '0',
              color: 'black'
            }}>
              Redirecting to home in {countdown} seconds...
            </p>
          )}
        </Modal.Body>
        <Modal.Footer style={{
          background: 'blue',
          border: 'none',
          justifyContent: 'center'
        }}>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentPage;