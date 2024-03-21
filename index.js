const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;  //importing the movie model from models.js
const Users = Models.User;  //importing the user model from models.js
const Directors = Models.Director;  //importing the director model from models.js
const Genres = Models.Genre;  //importing the genre model from models.js
mongoose.connect('mongodb://localhost:27017/test', //connecting to the database created previously.
{ useNewUrlParser: true, useUnifiedTopology: true });

//express  
const express = require('express');
const app = express();
//let auth = require('./auth')(app); //importing the auth.js file. [commented out for now USED FOR 2.9]
//const passport = require('passport'); [commented out for now USED FOR 2.9]
//require('./passport'); //importing the passport.js file. [commented out for now USED FOR 2.9]

//ROUTE HANDLERS
 app.get('/movies', 
 async (req, res) => {
  await Movies.find() //mongoose being used to query the database for all the movies.
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

morgan = require('morgan');
app.use(morgan('dev')); // morgan for logging.
// 'dev' is a pre-defined log format used within morgan.

  //movie directory for JSON object to be used in the route handler for /movies.
    const TopMovies =
   [
    {id:"1", title: 'The Shawshank Redemption', director: 'Frank Darabont', genre: 'Drama', releaseYear: '1994'},
    {id:"2", title: 'The Godfather', director: 'Francis Ford Coppola', genre: 'Drama', releaseYear: '1972'},
    {id:"3", title: 'The Dark Knight', director: 'Christopher Nolan', genre: 'Action', releaseYear: '2008'},
    {id:"4", title: 'The Godfather: Part II', director: 'Francis Ford Coppola', genre: 'Drama', releaseYear: '1974'},
    {id:"5", title: "Schindler's List", director: 'Steven Spielberg', genre: 'Biography', releaseYear: '1993'},
    {id:"6", title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', genre: 'Adventure', releaseYear: '2003'},
    {id:"7", title: 'Pulp Fiction', director: 'Quentin Tarantino', genre: 'Crime', releaseYear: '1994'},
    {id:"8", title: 'The Good, the Bad and the Ugly', director: 'Sergio Leone', genre: 'Western', releaseYear: '1966'},
    {id:"9", title: 'The Lord of the Rings: The Fellowship of the Ring', director: 'Peter Jackson', genre: 'Adventure', releaseYear: '2001'},
    {id:"10", title: 'Fight Club', director: 'David Fincher', genre: 'Drama', releaseYear: '1999'}];

    const users = [];
  //route handlers
  app.get('/movies', (req, res) => {
    res.json(TopMovies);
  });
  app.get('/', (req, res) => {
    res.send('Welcome!');
  });
  app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname }); //sends the documentation file to the user as response.
  });
  app.put('/users/:username', (req, res) => { res.send('Successful update of user information'); });


// Middleware to parse JSON bodies

//Get a movie by its id.
app.get('/movies/:id', async (req, res) => {
  const id = req.params.id;
  await Movies.findById(id)
    .then((movie) => {
      res.status(200).json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
app.use(express.json());
// POST /users endpoint
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).send('User added');
  // Code to add a new user
});
// PUT /users/:username/movies/:movieID endpoint
app.put('/users/:username/movies/:movieid', (req, res) => {
  // Code to add a movie to a user's favorites list
  // Access the username and movieID from req.params
});
//DELETE a movie bu movieID.
app.delete('/movies/:id', (req, res) => {
  res.send('Successful deletion of movie');
});
// DELETE /users/:username/movies/:movieID endpoint
app.delete('/users/:username/movies/:movieID', (req, res) => {
  // Code to remove a movie from a user's favorites list
  // Access the username and movieID from req.params
});
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//error handler - given at the end.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); 


