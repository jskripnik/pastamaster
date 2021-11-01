'use strict';

const express = require('express');
const exphbs = require('express-handlebars');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


// App

const app = express();
app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {title: 'Тестораскатки и лапшерезки'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'О компании'});
});
app.get('/products/:id', (req, res) => {

    res.render(`./products/product-${req.params.id}`, {product: req.params.id})

});













app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)