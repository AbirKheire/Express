
const express = require("express");

const app = express();


app.use(express.json()); 

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser.js");
const { hashPassword, verifyPassword, verifyToken } = require("./middlewares/auth.js");

// public routes 

app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users",userControllers.getUsers);
app.get("/api/users/:id",userControllers.getUserById);
app.post("/api/users", hashPassword, userControllers.postUser);
app.post("/api/login", userControllers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// private/protected routes 
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.delete("/api/users/:id", userControllers.deleteUserById);
app.post("/api/movies", verifyToken, movieControllers.postMovie);
app.put("/api/movies/:id", verifyToken, movieControllers.updateMovie);
app.put("/api/users/:id", verifyToken, hashPassword, userControllers.updateUser);
app.delete("/api/movies/:id", verifyToken, movieControllers.deleteMovie);







module.exports = app;
