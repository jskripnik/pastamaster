'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs   = require('fs');



// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


// App

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {title: 'Тестораскатки и лапшерезки'});
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'О компании'});
});

app.post('/success', urlencodedParser, (req, res) => {

    const body = {
        Name1: req.body.exampleInputName1,
        Telephone1: req.body.exampleInputTelephone1,
        Email1: req.body.exampleInputEmail1
    }
    console.log(body)
    res.render('success', {data: req.body});
});




app.get('/products/:id', (req, res) => {

    console.log("fork!")
    res.render(`./products/product-${req.params.id}`, {product: req.params.id})

});













app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)