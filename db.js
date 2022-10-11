'use strict';

//Integrate Mongoose into an Express project and connect to a local MongoDB. Log if the connection was successfil or not to the console.
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/tdp_goose", {
//     useNewUrlParser: true    
// },
// function(err) {
//     if(err) {
//         "Error"
//     } else {
//         console.log("Connected to DB: tdp_goose");
//     }
// });

mongoose.connect("mongodb://localhost:27017/tdp_movies", {
    useNewUrlParser: true    
},
function(err) {
    if(err) {
        "Error"
    } else {
        console.log("Connected to DB: tdp_movies");
    }
});

//Make a schema
const nameSchema = new mongoose.Schema({
    disposition: {
        type: String,
        require: true
    },
    colour: String,
    name: {
        type: String,
        require: true
    }

});
//Create a 'movies' schema. Include fields such as title, description, date release etc. -> Using subdocuments, include additional nested date such as reviews and actors.
const childOfMovies = new mongoose.Schema({
    reviews: {
        type: String,
        require: false
    },
    actors: [{
        fName: {
            type: String,
            require: true
        },
        lName: {
            type: String,
            require: true
        },
        age:{
            type: Number,
            min: [1, "minimum is 1"],
            max: 3
        }
    }]
});

const movies = new mongoose.Schema({
    title: {
        children: [childOfMovies],

        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    dateReleased: {
        type: Date,
        require: true
    }
});



//object with all the mongo functions "name" = the name of the collection -> mongo will always pluralises it
const nameModel = mongoose.model("name", nameSchema);
const childOfMoviesModel = mongoose.model("childOfMovies", childOfMovies);
const moviesModel = mongoose.model("movies", movies);


module.exports = {
    nameModel,
    childOfMoviesModel,
    moviesModel    
}