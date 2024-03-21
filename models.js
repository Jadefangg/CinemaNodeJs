const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title:{type: String, required: true},
    Description:{type: String, required: true},
    Genre:{
        Name: String,
        Description: String
    },
    Director:{
        Name: String,
        Bio: String   
    },
    Actors: [String], //array of strings for actors.
    ImagePath: String,
    Featured: Boolean
});

let userSchema=mongoose.Schema({ //creating a schema for the user.
    username:{type: String, required: true},  
    password:{type: String, required: true}, 
    email:{type: String, required: true}, 
    birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}] //array of movie objects.
});

let genreSchema=mongoose.Schema({ //creating a schema for the genre.
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre',required: true},
    Name:{type: String, required: true},
    Description:{type: String, required: true}
});

let directorSchema=mongoose.Schema({ //creating a schema for the director.
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Director',required: true},
    Name:{type: String, required: true},
    Bio:{type: String, required: true},
    Birth:{type: Date, required: true},
    Death:{type: Date}
});


let Movie=mongoose.model('Movie', movieSchema); //creating a model for the movie schema.
let User=mongoose.model('User', userSchema); //creating a model for the user schema.
let Genre=mongoose.model('Genre', genreSchema); //creating a model for the genre schema.
let Director=mongoose.model('Director', directorSchema); //creating a model for the director schema.

//exporting the models.
module.exports.Movies=Movie;
module.exports.Users=User; 
module.exports.Genres=Genre;
module.exports.Directors=Director; 