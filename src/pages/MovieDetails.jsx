import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    if (!selectedShowtime || selectedSeats.length === 0) {
      setError('Please select a showtime and seats');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        movieId: id,
        showtime: selectedShowtime,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * 10,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Booking successful!');
      setSelectedSeats([]);
      setSelectedShowtime('');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!movie) return <Container className="mt-5"><h2>Loading...</h2></Container>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={movie.posterUrl || 'https://via.placeholder.com/300x450'} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Duration:</strong> {movie.duration} min</p>
              <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <h3>Book Tickets</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Select Showtime</Form.Label>
            <Form.Select value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
              <option value="">Choose a showtime</option>
              {movie.showTimes?.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <h4>Select Seats</h4>
          <div className="mb-3">
            {['A', 'B', 'C', 'D', 'E'].map(row => (
              <div key={row} className="d-flex justify-content-center mb-2">
                {Array.from({ length: 10 }, (_, i) => `${row}${i + 1}`).map(seat => (
                  <Button
                    key={seat}
                    variant={selectedSeats.includes(seat) ? 'success' : 'outline-primary'}
                    size="sm"
                    className="me-1 mb-1"
                    onClick={() => handleSeatSelect(seat)}
                  >
                    {seat}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <p>Total Price: ${selectedSeats.length * 10}</p>
          <Button onClick={handleBooking} style={{ background: '#007bff', border: 'none' }}>Book Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
