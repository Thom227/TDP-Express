'use strict';

//Create a new project called error_handling, install express -> npm init -y, npm i express

//Set-up your Express app to listen on port 4000 (see further below @ server)
const express = require("express");
const app = express();

//Create an endpoint that throws an error
app.get("/getError", (req, res, next) => {
    const err = new Error("ERROR!");
    next(err);
});

//Add a piece of error-handling middleware that loads the error's stacktrace to the console then passes it on.
//Answer from exercises:
//app.use((err, req, res, next) => {
//     console.log(err.stack);
//     next(err);
// });

const errorLogger = (err, req, res, next) => {
    console.log(err.stack);
    next(err);
}

app.use(errorLogger);
//
//Add another piece of error-handling middlewre that sends a response informing the user that something has gone wrong - make sure to use an appropriate status code.
//Solution from the exercises:
// app.use((err, req, res, next) => {
//     res.status(500).send(err.message);
// });

const sendError = (err, req, res) => {
    res.status(500).send(err.message);
}

app.use(sendError);



const server = app.listen(4000, () => console.log(`Server succesfully started on port ${server.address().port}`));
