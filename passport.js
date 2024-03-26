const passport = require('passport'),
LocalStrategy=require('passport-local').Strategy,
Models=require('./models.js'),
passportJWT=require('passport-jwt');

let Users=Models.User, //importing the user model from models.js
JWTStrategy=passportJWT.Strategy,   //importing the JWT strategy from passport-jwt.
ExtractJWT=passportJWT.ExtractJwt;  //importing the ExtractJWT from passport-jwt.

passport.use( //creating a new local strategy for authenticating the user.
    new LocalStrategy(  
      {
        usernameField: 'Username',
        passwordField: 'Password',
      },
      async (username, password, callback) => { //callback function to authenticate the user.
        console.log(`${username} ${password}`);
        await Users.findOne({ Username: username })//searching for the user by their username.
        .then((user) => {
          if (!user) {
            console.log('incorrect username'); //if the username is incorrect, log the message.
            return callback(null, false, {
              message: 'Incorrect username or password.',
            });
          }
          console.log('finished');
          return callback(null, user);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
            return callback(error);
          }
        })
      }
    )
  );
  
  
  passport.use(
    new JWTStrategy({    //creating a new JWT strategy .
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), //extracting the JWT from the header of the request.
    secretOrKey: 'your_jwt_secret'
  }, async (jwtPayload, callback) => {
    return await Users.findById(jwtPayload._id)
      .then((user) => {
        return callback(null, user);
      })
      .catch((error) => {
        return callback(error)
      });
  }));