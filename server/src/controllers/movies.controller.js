const MovieModel = require('../models/Movie.model');

const moviesController = {};

moviesController.getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    console.log(allMovies);
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json({ error: 'Error reading database' + error });
  }
};

moviesController.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.findById(id);
    console.log(movie);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ error: 'Error reading database' + error });
  }
};

moviesController.getMoviesByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await MovieModel.find({ genre: { $eq: genre } });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error reading database' + error });
  }
};

moviesController.getMoviesByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const movies = await MovieModel.find({ year: { $gte: year } });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error reading database' + error });
  }
};

moviesController.getMoviesBetweenYears = async (req, res) => {
  const { start, end } = req.params;
  console.log(start);
  console.log(end);
  try {
    const movies = await MovieModel.find({
      year: { $gte: start, $lte: end },
    });
    if (!movies) {
      return res.status(200).json([]);
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ error: 'Error reading database' + error });
  }
};

moviesController.createMovie = async (req, res) => {
  const movieInfo = req.body;
  const newMovie = new MovieModel({ ...movieInfo });
  try {
    await newMovie.save();
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error reading/writing database' + error });
  }
};

moviesController.updateMovie = async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  try {
    const movieToUpdate = await MovieModel.findById(id);
    if (!movieToUpdate) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await MovieModel.updateOne({ _id: id }, { $set: { ...newInfo } });
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json({ error: 'Error writing database' + error });
  }
};

moviesController.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movieToUpdate = await MovieModel.findById(id);
    if (!movieToUpdate) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await MovieModel.deleteOne({ _id: id });
    const allMovies = await MovieModel.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json({ error: 'Error writing database' + error });
  }
};

module.exports = moviesController;
