import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', price: 150, posterUrl: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get('/api/movies');
    setMovies(res.data.sort((a, b) => a.title.localeCompare(b.title))); // Sort movies alphabetically
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    try {
      if (editing) {
        await axios.put(`/api/movies/${editingId}`, formData);
        setSuccess('Movie updated successfully!');
        setEditing(false);
        setEditingId(null);
      } else {
        await axios.post('/api/movies', formData);
        setSuccess('Movie added successfully!');
      }
      setFormData({ title: '', description: '', price: 150, posterUrl: '' });
      fetchMovies(); 
    } catch (err) {
      setError(err.response?.data?.msg || 'Error saving movie. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    clearMessages();
    try {
      await axios.delete(`/api/movies/${id}`);
      setSuccess('Movie deleted successfully!');
      fetchMovies();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting movie.');
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title,
      description: movie.description || '',
      price: movie.price,
      posterUrl: movie.posterUrl || ''
    });
    setEditing(true);
    setEditingId(movie._id);
    clearMessages();
  };

  const handleCancelEdit = () => {
    setFormData({ title: '', description: '', price: 150, posterUrl: '' });
    setEditing(false);
    setEditingId(null);
    clearMessages();
  };

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
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '2px solid blue'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'blue',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          Admin Dashboard - Movie Management
        </h2>

        {/* Add/Edit Movie Form */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '2px solid blue'
        }}>
          <h3 style={{
            color: 'black',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {editing ? 'Edit Movie' : 'Add New Movie'}
          </h3>

          {error && (
            <div style={{
              backgroundColor: 'white',
              color: 'red',
              padding: '0.75rem',
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
              padding: '0.75rem',
              borderRadius: '5px',
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: 'bold',
              border: '2px solid green'
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'black',
                fontWeight: 'bold'
              }}>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid blue',
                  borderRadius: '5px',
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

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'black',
                fontWeight: 'bold'
              }}>Description</label>
              <textarea
                name="description"
                placeholder="Enter movie description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid blue',
                  borderRadius: '5px',
                  background: 'white',
                  color: 'black',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s',
                  resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = 'blue'}
                onBlur={(e) => e.target.style.borderColor = 'blue'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'black',
                fontWeight: 'bold'
              }}>Price (₹)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter ticket price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid blue',
                  borderRadius: '5px',
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'black',
                fontWeight: 'bold'
              }}>Poster URL</label>
              <input
                type="url"
                name="posterUrl"
                placeholder="Enter poster image URL"
                value={formData.posterUrl}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid blue',
                  borderRadius: '5px',
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

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 2rem',
                  background: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
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
                {editing ? 'Update Movie' : 'Add Movie'}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: '0.75rem 2rem',
                    background: 'black',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4)';
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Movies List */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          border: '2px solid blue'
        }}>
          <h3 style={{
            color: 'black',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Current Movies ({movies.length})
          </h3>

          {movies.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'black', fontWeight: 'bold' }}>No movies added yet.</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {movies.map(movie => (
                <div key={movie._id} style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '1.5rem',
                  border: '2px solid blue',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h4 style={{
                    color: 'black',
                    marginBottom: '0.5rem',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}>
                    {movie.title}
                  </h4>
                  <p style={{
                    color: 'black',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {movie.description ? movie.description.substring(0, 100) + '...' : 'No description'}
                  </p>
                  <p style={{
                    color: 'blue',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    ₹{movie.price}
                  </p>

                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'space-between'
                  }}>
                    <button
                      onClick={() => handleEdit(movie)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 1rem',
                        background: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 255, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 1rem',
                        background: 'black',
                        color: 'white',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
