const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function addMovies() {
  try {
    // Login admin
    const loginRes = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    const token = loginRes.data.token;

    // Add movies
    const movies = [
      {
        title: 'Inception',
        description: 'A mind-bending thriller',
        genre: 'Sci-Fi',
        duration: 148,
        releaseDate: '2010-07-16',
        showTimes: ['10:00', '14:30', '19:00'],
        price: 499,
        posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
      },
      {
        title: 'The Dark Knight',
        description: 'Batman fights Joker',
        genre: 'Action',
        duration: 152,
        releaseDate: '2008-07-18',
        showTimes: ['11:00', '15:00', '20:00'],
        price: 299,
        posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
      },
      {
        title: 'Interstellar',
        description: 'Space exploration adventure',
        genre: 'Sci-Fi',
        duration: 169,
        releaseDate: '2014-11-07',
        showTimes: ['12:00', '16:00', '21:00'],
        price: 599,
        posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'
      }
    ];

    for (const movie of movies) {
      const res = await axios.post(`${API_BASE}/movies`, movie, {
        headers: { 'x-auth-token': token }
      });
      console.log(`Added movie: ${res.data.title}`);
    }

    console.log('All movies added successfully');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

addMovies();
