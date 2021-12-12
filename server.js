const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// middlewares
app.use(morgan('dev'));

//setting up ejs
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/table', (req, res) => {
    res.render('table.ejs');
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log('Server is running at port 3000');
});