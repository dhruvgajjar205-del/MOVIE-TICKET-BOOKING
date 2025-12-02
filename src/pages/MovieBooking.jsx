import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieBooking = () => {
  const { movieId } = useParams();

  
  const [showTime, setShowTime] = useState('');
  const [seatsSelected, setSeatsSelected] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        
        const res = await axios.get(`/api/movies/${movieId}`);
        setMovieDetails(res.data);
      } catch (err) {
        setError('Could not fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  
  const handleBooking = (e) => {
      e.preventDefault();

      
      if (!showTime || seatsSelected.length === 0) {
          alert("Please select a showtime and at least one seat.");
          return;
      }

      
      const totalAmount = seatsSelected.length * movieDetails.price;

      
      localStorage.setItem('tempBooking', JSON.stringify({
          movieId: movieId,
          movieTitle: movieDetails.title,
          seatsSelected: seatsSelected,
          showTime: showTime,
          totalAmount: totalAmount
      }));

      
      navigate('/payment');

      
  };

  if (loading) {
    return <h2>Loading movie details...</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>{error}</h2>;
  }

  if (!movieDetails) {
    return <h2>Movie details could not be loaded.</h2>;
  }

  
  const seatRows = ['A', 'B', 'C', 'D', 'E'];
  const seatCols = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: 'black'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '2px solid blue'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'blue',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          Book Tickets for {movieDetails.title}
        </h2>

        <form onSubmit={handleBooking}>
          {/* Showtime Selection */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              color: 'blue',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Select Showtime
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {(movieDetails.showTimes && movieDetails.showTimes.length > 0) ? movieDetails.showTimes.map(time => (
                <label key={time} style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: showTime === time ? 'blue' : 'white',
                  color: 'black',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid blue',
                  fontWeight: 'bold'
                }}>
                  <input
                    type="radio"
                    name="showTime"
                    value={time}
                    checked={showTime === time}
                    onChange={(e) => setShowTime(e.target.value)}
                    style={{ display: 'none' }}
                    required
                  />
                  {time}
                </label>
              )) : (
                ['10:00 AM', '02:30 PM', '07:00 PM'].map(time => (
                  <label key={time} style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.5rem',
                    background: showTime === time ? 'blue' : 'white',
                    color: 'black',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid blue',
                    fontWeight: 'bold'
                  }}>
                    <input
                      type="radio"
                      name="showTime"
                      value={time}
                      checked={showTime === time}
                      onChange={(e) => setShowTime(e.target.value)}
                      style={{ display: 'none' }}
                      required
                    />
                    {time}
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Seat Selection */}
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{
              color: 'blue',
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              Select Your Seats
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {/* Screen */}
              <div style={{
                width: '80%',
                height: '20px',
                background: 'blue',
                borderRadius: '10px 10px 50px 50px',
                marginBottom: '2rem',
                position: 'relative'
              }}>
                <span style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'black',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  SCREEN
                </span>
              </div>

              {/* Seats Grid */}
              {seatRows.map(row => (
                <div key={row} style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'blue',
                    fontWeight: 'bold',
                    width: '20px',
                    textAlign: 'center'
                  }}>
                    {row}
                  </span>
                  {seatCols.map(col => {
                    const seatId = `${row}${col}`;
                    const isSelected = seatsSelected.includes(seatId);
                    return (
                      <label key={seatId} style={{
                        display: 'inline-block',
                        width: '35px',
                        height: '35px',
                        background: isSelected ? 'blue' : 'white',
                        border: '2px solid blue',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: isSelected ? 'white' : 'black'
                      }}>
                        <input
                          type="checkbox"
                          value={seatId}
                          checked={isSelected}
                          onChange={(e) => {
                            setSeatsSelected(prev => e.target.checked ? [...prev, seatId] : prev.filter(s => s !== seatId));
                          }}
                          style={{ display: 'none' }}
                        />
                        {col}
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <div style={{
            background: 'white',
            borderRadius: '10px',
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
              Booking Summary
            </h4>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <p style={{ margin: '0.5rem 0', color: 'black', fontWeight: 'bold' }}>
                  <strong style={{ color: 'blue' }}>Selected Seats:</strong> {seatsSelected.join(', ') || 'None'}
                </p>
                <p style={{ margin: '0.5rem 0', color: 'black', fontWeight: 'bold' }}>
                  <strong style={{ color: 'blue' }}>Showtime:</strong> {showTime || 'Not selected'}
                </p>
              </div>
              <div style={{
                textAlign: 'right',
                background: 'blue',
                padding: '1rem',
                borderRadius: '10px',
                minWidth: '150px'
              }}>
                <p style={{
                  margin: '0',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  Total: ₹{seatsSelected.length * movieDetails.price}
                </p>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '1rem 3rem',
                background: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 255, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 255, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 255, 0.4)';
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieBooking;
