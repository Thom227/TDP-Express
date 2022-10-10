//Router is used to break up 'god files' into smaller segments. Router can be applied to data handling requests only.
//Import express like below and include .Router, paste all your data requests underneath and finish with the export module.exports(CONST)
const router = require("express").Router();


//Create a array containing the names of everyone on your row
let nameList = ["Luke", "Fauzia", "Shakeel", "Mimi", "Michael"];

//Create a requst handler that listens for GET requests at /, make it send a response of "Hello, my name is Thom"
router.get("/", (req, res) => res.send("Hello, my name is Thom"));

//Create a request handler that listens at /getAll and responds with the whole array
router.get("/getAll", (req, res) => res.send(nameList));

//Create a request handler that fetches the name at the index specified in a URL parameter
router.get("/getName/:id", (req, res) => res.send(nameList[req.params.id]));

//Create a request handler that deletes the name at the index specified in a URL parameter
router.delete("/deleteName/:id", (req, res) => {
    res.send(nameList.splice(req.params.id, 1));
});

//Create a request handler that creates a new name in the array by sending a JSON object in the request body
router.post("/postName", (req, res) => {
    const name = req.body.name;
    nameList.push(name);
    res.status(201).send(`${name} added successfully`);
    console.log(nameList[nameList.length -1]);
}) //In postman go to body -> raw -> JSON and input JSON file { "NAME":"NAME"}

//Create a request handler that replaces a name in the array with a name specified in a query parameter at an indes specigied in a URL parameter
router.put("Replace/:id", (req, res) => {
    const newName = req.query.name;
    const oldName = nameList[req.params.id];
    nameList[req.params.id] = newName;
    res.send(`Replaced ${oldName} with ${nameList[req.params.id]}`);

})


//At the end of the file, export it to be able to be used in the index file
module.exports = router;