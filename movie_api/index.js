 //EXPRESS APPLICATION
 
 const express = require('express');
 const app = express();

  morgan = require('morgan');
  app.use(morgan('dev')); // morgan for logging.
  // 'dev' is a pre-defined log format used within morgan.

  //movie directory for JSON object to be used in the route handler for /movies.
  const TopMovies =
   [
    {title: 'The Shawshank Redemption', director: 'Frank Darabont', genre: 'Drama', releaseYear: '1994'},
    {title: 'The Godfather', director: 'Francis Ford Coppola', genre: 'Drama', releaseYear: '1972'},
    {title: 'The Dark Knight', director: 'Christopher Nolan', genre: 'Action', releaseYear: '2008'},
    {title: 'The Godfather: Part II', director: 'Francis Ford Coppola', genre: 'Drama', releaseYear: '1974'},
    {title: "Schindler's List", director: 'Steven Spielberg', genre: 'Biography', releaseYear: '1993'},
    {title: 'The Lord of the Rings: The Return of the King', director: 'Peter Jackson', genre: 'Adventure', releaseYear: '2003'},
    {title: 'Pulp Fiction', director: 'Quentin Tarantino', genre: 'Crime', releaseYear: '1994'},
    {title: 'The Good, the Bad and the Ugly', director: 'Sergio Leone', genre: 'Western', releaseYear: '1966'},
    {title: 'The Lord of the Rings: The Fellowship of the Ring', director: 'Peter Jackson', genre: 'Adventure', releaseYear: '2001'},
    {title: 'Fight Club', director: 'David Fincher', genre: 'Drama', releaseYear: '1999'}];

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

// Middleware to parse JSON bodies
app.use(express.json());
// POST /users endpoint
app.post('/users', (req, res) => {
  // Code to add a new user
  // Access the user data from req.body
});
// PUT /users/:username/movies/:movieID endpoint
app.put('/users/:username/movies/:movieID', (req, res) => {
  // Code to add a movie to a user's favorites list
  // Access the username and movieID from req.params
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
