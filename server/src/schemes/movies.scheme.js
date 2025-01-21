const mongoose = require('mongoose');

const MovieScheme = mongoose.Schema(
  {
    //_id: String, no hay que añadirlo
    title: String,
    year: Number,
    genre: String,
  },
  { collection: 'movies-collection' }
);

module.exports = MovieScheme;
