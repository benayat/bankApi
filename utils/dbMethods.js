const path = require('path');
const fs = require('fs');
const uniquid = require('uniqid');
const pathDB = path.join(__dirname, '../db/movies.json');

const getAllMoviesFile = () => {
  const rawData = fs.readFileSync(pathDB);
  return JSON.parse(rawData);
};
const createMovie = (title, genre, length) => {
  const id = uniquid();
  return updateMovie(id, title, genre, length);
};
const updateMovie = (id, title, genre, length) => {
  const movie = { id, title, genre, length };
  console.log(movie);
  const movies = getAllMoviesFile();

  const indexToUpdate = movies.findIndex((movie) => movie.id === id);
  if (indexToUpdate === -1)
    throw Error('the item you want to update is not there!');
  movies[indexToUpdate] = movie;
  fs.writeFileSync(pathDB, JSON.stringify(movies));
  return movie;
};
const deleteMovie = (id) => {
  const movies = getAllMoviesFile();
  const indexToDelete = movies.findIndex((movie) => movie.id === id);
  if (indexToDelete === -1) throw Error("movie doesn't exist in the database");
  const result = movies.splice(indexToDelete, 1);
  if (result === []) console.log('error delete');
  fs.writeFileSync(pathDB, JSON.stringify(movies));
};
module.exports = {
  getAllMoviesFile,
  createMovie,
  updateMovie,
  deleteMovie,
};
