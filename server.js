'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs')


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
app.get('/admin', (req, res) => {
    res.render('./admin/admin');
});
app.get('/admin/product', (req, res) => {
    res.render('./admin/admin-product');
});

app.post('/success', urlencodedParser, (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;

    const body = {
            name,
            phone,
            email,
    }
        fs.appendFile("views/write-body.txt", "\n" + "name:" + name + "\n" + "phone:" + phone + "\n" + "email:" + email + "\n",err => {
            if(err) throw err;
            console.log('is written')
        });
    fs.readFile('views/write-body.txt', 'utf8' , (err, data) => {
        if (data.includes(req.body.email))
         res.status(409).json(
            'Такой email уже существует'
        )
        console.error(err)
        {
            res.render('success', {body: body});
    }

    })

});



app.get('/products/:id', (req, res) => {

    console.log("fork!")
    res.render(`./products/product-${req.params.id}`, {product: req.params.id})

});













app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)