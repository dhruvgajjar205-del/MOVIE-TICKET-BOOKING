import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get('/api/movies');
                setMovies(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) {
        return <h2 style={{ textAlign: 'center' }}>Loading Movies...</h2>;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'white',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                    color: 'blue',
                    fontSize: '3rem',
                    fontWeight: 'bold'
                }}>
                    Now Showing Movies
                </h2>

                {movies.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        background: 'white',
                        borderRadius: '15px',
                        padding: '3rem',
                        border: '2px solid blue'
                    }}>
                        <h3 style={{ color: 'black', marginBottom: '1rem', fontWeight: 'bold' }}>No Movies Available</h3>
                        <p style={{ color: 'black', fontSize: '1.2em', fontWeight: 'bold' }}>
                            Admin needs to add movies using the <strong style={{ color: 'blue' }}>/admin dashboard</strong>.
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        {movies.map(movie => (
                            <div key={movie._id} style={{
                                background: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                border: '2px solid blue',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 255, 0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                <img
                                    src={movie.posterUrl || 'https://via.placeholder.com/300x450'}
                                    alt={movie.title}
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{
                                        color: 'black',
                                        marginBottom: '0.5rem',
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {movie.title}
                                    </h3>
                                    <p style={{
                                        color: 'black',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        marginBottom: '1.5rem',
                                        minHeight: '3rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {movie.description ? movie.description.substring(0, 120) + '...' : 'No description available'}
                                    </p>
                                    <p style={{
                                        color: 'black',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        marginBottom: '1rem'
                                    }}>
                                        Price: ₹{movie.price}
                                    </p>

                                    {/* Book Tickets Button */}
                                    <button
                                        onClick={() => navigate(`/book/${movie._id}`)}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            background: 'blue',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '25px',
                                            fontSize: '1.1rem',
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
                                        Book Tickets
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
