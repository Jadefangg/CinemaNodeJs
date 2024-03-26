const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json()); //middleware function to parse the request body and convert it into a JSON object.
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;  //importing the Movie model from models.js
const Users = Models.User;  //importing the user model from models.js
const Directors = Models.Director;  //importing the director model from models.js
const Genres = Models.Genre;  //importing the genre model from models.js
mongoose.connect('mongodb://localhost:27017/test', //connecting to the database created previously.
{ useNewUrlParser: true, useUnifiedTopology: true });
let auth = require('./auth')(app); //importing the auth.js file. [commented out for now USED FOR 2.9]
const passport = require('passport'); //[commented out for now USED FOR 2.9]
require('./passport'); //importing the passport.js file. [commented out for now USED FOR 2.9]


//ROUTE HANDLERS
//JWT authentication>
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(TopMoviesmovies);
    })
    .catch((error) => {s
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
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

    
  //route handlers

  //DELETE a movie by movieID.
  app.delete('/movies/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id;
    const movieIndex = TopMovies.findIndex(movie => movie.id === id);
  
    if (movieIndex === -1) {
      // Movie not found
      return res.status(404).send('Movie not found');
    }
  
    // Remove movie from array
    TopMovies.splice(movieIndex, 1);
  
    res.send('Movie deleted');
  });
 
  app.get('/',passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.send('Welcome!');
  });
  app.get('/documentation',passport.authenticate('jwt', { session: false }), async (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname }); //sends the documentation file to the user as response.
  });
  app.put('/users/:username', (req, res) => { res.send('Successful update of user information'); });
 

// POST /users endpoint



app.post('/users', (req, res) => {
  // Hash the password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Users.create({
        username: req.body.username,
        password: hash,
        email: req.body.email
      })
      .then(user => res.status(201).json(user))
      .catch(error => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
    });
});

/*  // PUT /users/:username/movies/:movieID endpoint
app.put('/users/:username/movies/:movieid',passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Code to add a movie to a user's favorites list
  // Access the username and movieID from req.params
});

//DELETE a movie bu movieID.
app.delete('/movies/:id',passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send('Successful deletion of movie');
});

// DELETE /users/:username/movies/:movieID endpoint
app.delete('/users/:username/movies/:movieID', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // Code to remove a movie from a user's favorites list
  // Access the username and movieID from req.params
});
*/
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//error handler - given at the end.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); 


