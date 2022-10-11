const router = require("express").Router();

//Import the movies model from db so we can interact with it
const {moviesModel, childOfMoviesModel} = require("./db.js");

router.get("/getAllMovies", (req, res) => moviesModel.find({}).then(results => res.send(results)).catch(err => next(err)));

router.get("/movieById/:id", (req, res, next) => {
    const {id} = req.params;
    if(!movies[id]) return next("No movies yet");
    res.send(movies[id])
});

//Jordan example 1
// router.post("/postMovie", (res, req, next) => {
//     if (!req.body.name) return next ({status: 400, message: "Missing name"})
//     moviesModel.create(req.body).then(result => res.status(201).send(result)).catch(err => next(err));
// });

//Jordans example 2
router.post("addMovie", async (req, res, next) => {
    if(!req.body.name) return next({status: 400, message: "Missing name"})
    try {
        const result = await moviesModel.create(req.body);
        res.status(201).send(result);
    } catch(err) {
        return next(err);
    }
});

router.patch("/updateMovie/:id", (res, req, next) => {
    console.log("ID", req.params.id);
    console.log("QUERY:", req.query);
    res.send();
});

router.delete("/removeMovie/:id", (req, res, next) => {
    const {id} = req.params;
    console.log("ID", id);
    moviesModel.findByIdAndDelete(id).then(result => res.send(result).catch(err => next(err)));
});

module.exports = router;