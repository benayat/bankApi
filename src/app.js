const express = require('express');
const {
  getAllMoviesFile,
  updateMovie,
  createMovie,
  deleteMovie,
} = require('../utils/dbMethods');

const port = 3000;

const app = express();
app.use(express.json());

//configure paths
// const pathStaticPublic = path.join(__dirname, '../public');

//configure views engine and partials and static
// app.use(express.json);
app.get('/', function (req, res) {
  res.send('Hello Node.js');
});

app.get('/api/movies', (req, res) => {
  const users = getAllMoviesFile();
  res.status(200).json(users);
});

app.get('/api/movies/:id', (req, res) => {
  const movies = getAllMoviesFile();
  console.log(req.params);
  res.status(200).json(movies.find((movie) => movie.id === req.params.id));
});
app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const movie = req.body;
    updateMovie(id, movie.title, movie.genre, movie.length);
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/api/movies', (req, res) => {
  try {
    const movie = req.body;
    const user = createMovie(movie.title, movie.genre, movie.length);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message, error2: 'problem with array' });
  }
});
app.delete('/api/movies/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    deleteMovie(id);
    res.status(201).send('success in deleting id' + id);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
