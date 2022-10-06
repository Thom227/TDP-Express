//Import and initialise Express
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
//Install middleware in order to create request - npm i body-parser
//Then import it like above and initialise it like below
app.use(bodyParser.json());

//Implement some middleware before the routing that logs the current time to the console but still passes the request on to the next function
const logger = (req, res, next) => {
    console.log(new Date());
    next();
}

app.use (logger);

//Create a requst handler that listens for GET requests at /, make it send a response of "Hello, my name is Thom"
app.get("/", (req, res) => res.send("Hello, my name is Thom"));

//Create a non-constant array containing the names of everyone on your row
let nameList = ["Luke", "Fauzia", "Shakeel", "Mimi", "Michael"];

//Create a request handler that listens at /getAll and responds with the whole array
app.get("/getAll", (req, res) => res.send(nameList));

//Create a request handler that fetches the name at the index specified in a URL parameter
app.get("/getName/:id", (req, res) => res.send(nameList[req.params.id]));

//Create a request handler that deletes the name at the index specified in a URL parameter
app.delete("/deleteName/:id", (req, res) => {
    res.send(nameList.splice(req.params.id, 1));
});

//Create a request handler that creates a new name in the array by sending a JSON object in the request body
app.post("/postName", (req, res) => {
    const name = req.body.name;
    nameList.push(name);
    res.status(201).send(`${name} added successfully`);
    console.log(nameList[nameList.length -1]);
}) //In postman go to body -> raw -> JSON and input JSON file { "NAME":"NAME"}

//Create a request handler that replaces a name in the array with a name specified in a query parameter at an indes specigied in a URL parameter
app.put("Replace/:id", (req, res) => {
    const newName = req.query.name;
    const oldName = nameList[req.params.id];
    nameList[req.params.id] = newName;
    res.send(`Replaced ${oldName} with ${nameList[req.params.id]}`);

})

//Syntax for creating a working local host server
const server = app.listen(4494, () => console.log(`Server succesfully started on port ${server.address().port}`));
