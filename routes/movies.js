const express = require('express');

const router =express.Router();

const movies = [
    { id: 1, name: 'Titanik', genre: 'romance' },
    { id: 2, name: 'Mr.Bean', genre: 'family' },
    { id: 3, name: 'Code Da Vinci', genre: 'fantasy' },
    { id: 4, name: 'Harry Potter', genre: 'fantasy' },
    { id: 5, name: '365 dni', genre: 'romance' },
    { id: 6, name: 'Kargin serial', genre: 'family' },
    { id: 5, name: '50 shades of grey', genre: 'romance' }
];

router.get('/', (req, res) => {
    res.json(movies);
});

router.get('/:id', (req, res) => {
    const movie = movies.filter(c => c.id === parseInt(req.params.id));
    if (!movie.length) return res.status(404).send('Sorry we dont have this movie :(');
    res.json(movie);
});

router.get('/genre/:genre', (req, res) => {
    console.log(req.params);
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

router.post('/', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genre: req.body.genre
    };
    movies.push(movie);
    res.send(movie);
});
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('Sorry we dont have this movie :(');

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});

module.exports = router;
