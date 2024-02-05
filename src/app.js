const express = require("express");

const app = express();


app.use(express.json()); 

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const { hashedPassword } = require("./middlewares/auth.js");

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.post("/api/movies", movieControllers.postMovie);
app.post("/api/users", hashedPassword, userControllers.postUser);
app.get("/api/users",userControllers.getUsers);
app.get("/api/users/:id",userControllers.getUserById);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.put("/api/users/:id", hashedPassword, userControllers.updateUser);
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", userControllers.deleteUserById);


module.exports = app;
