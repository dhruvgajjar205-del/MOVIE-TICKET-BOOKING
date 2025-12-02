const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  duration: { type: Number }, // in minutes
  releaseDate: { type: Date },
  showTimes: [String], // e.g., ["10:00", "14:30", "19:00"]
  price: { type: Number, required: true, default: 150.00 },
  posterUrl: { type: String }
});

module.exports = mongoose.model('Movie', MovieSchema);