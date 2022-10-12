//Import and initialise Express
const express = require("express");
const app = express();

//Install middleware in order to create request - npm i body-parser
//Then import and initialise it like below
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//import the routes data handling file
const nameRouter = require("./routes/nameRoutes.js");

const movieRouter = require("./routes/movieRoutes.js");

//Import the routes from the database db.js -> .. means the parent folder
// const { nameModel, childOfMoviesModel, moviesModel } = require("./db.js");

//Implement some middleware before the routing that logs the current time to the console but still passes the request on to the next function
const logger = (req, res, next) => {
    console.log(new Date());
    next();
}
app.use (logger);

//Using the router app in the appropriate place between the correct middleware and giving it an optional name for user friendliness
app.use("/names", nameRouter);

app.use("/movies", movieRouter);

//Syntax for creating a working local host server
const server = app.listen(4494, () => console.log(`Server succesfully started on port ${server.address().port}`));

module.exports = server;
