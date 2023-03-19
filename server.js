'use strict';

//require express framework
const express = require('express')
const app = express()
const movieData = require('./Movie Data/data.json')
const port = 3000

// creating a constructor
function Movies(title, poster, overview) {
    this.title = title;
    this.poster = poster;
    this.overview = overview;
}


//run the server and make it listen all the time to port 3000

app.get('/favorite', favoritePageHandler);
app.get('/', homePageHandler);

function favoritePageHandler(req, res) {
    res.send("Welcome to Favorite Page");
}

function homePageHandler(req, res) {
    // res.send("Welcome to Home Page!");
    //res.json(movieData);
    let result = [];
    let newMovie = new Movies(movieData.title, movieData.poster_path, movieData.overview);
    result.push(newMovie);
    res.send(result);
}

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        responseText: 'Sorry, something went wrong'
    });
});

app.use(function (req, res, next) {
    res.status(404).send({
        status: 404,
        responseText: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`the server is listening to port ${port}`);
})
