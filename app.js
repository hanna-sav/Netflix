const movies = require('./routes/movies');
const home = require('./routes/home');
const appDebugger = require('debug')('app:netflix');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const log = require('./middleware/logger');
const auth = require('./middleware/auth');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api/movies', movies);
app.use('/', home);

// console.log('Application name:'+ config.get('name'));
// console.log('Mail address name:'+ config.get('mail.host'));
// console.log('Mail password:'+ config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    appDebugger('Morgan enabled...');
}

if(app.get('env') === 'production'){
    app.use(helmet());
}

app.use(log);
app.use(auth);

app.listen(5000, () => console.log('Listening port 5000...'));