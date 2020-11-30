const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    { id: 1, name: 'Titanik', genre: 'romance' },
    { id: 2, name: 'Mr.Bean', genre: 'family' },
    { id: 3, name: 'Code Da Vinci', genre: 'fantasy' },
    { id: 4, name: 'Harry Potter', genre: 'fantasy' },
    { id: 5, name: '365 dni', genre: 'romance' },
    { id: 6, name: 'Kargin serial', genre: 'family' }
];

app.get('/', (req, res) => {
    res.send('Welcome to Netlix!');
});
app.get('/api/movies', (req, res) => {
    res.send(movies);
});
// app.get('/api/movies/genre', (req, res) => {
//     res.send(movies);
// });
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.filter(c => c.id === parseInt(req.params.id));
    if (!movie.length) return res.status(404).send('Sorry we dont have this movie :(');
    res.json(movie);
});

app.get('/api/movies/genre/:genre', (req, res) => {
    console.log(req.params)
    const movie = movies.filter(m => m.genre === req.params.genre);
    if (!movie.length) return res.status(404).send('Sorry we dont have this genre :(');
    res.json(movie);

});

function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genre: Joi.string().min(3).required()
    });
    return schema.validate(movie);
}

app.post('/api/movies', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }
    movies.push(movie);
    res.send(movie);
})
app.put('/api/movies/:id', (req, res) => {
    //Look up the course
    //If doesn't exist, return 404
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Sorry we dont have this movie :(');



    //Validate course
    //If invalid, return 400,correct version

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //Update course
    //Return updated course
    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(movie);

})
app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Sorry we dont have this movie :(');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});

app.listen(5000, () => console.log(`Listening port 5000...`));