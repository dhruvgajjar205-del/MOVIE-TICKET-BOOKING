import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.posterUrl || 'https://via.placeholder.com/300x450'} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <p><strong>Price:</strong> ₹{movie.price}</p>
                <Button as={Link} to={`/movies/${movie._id}`} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
