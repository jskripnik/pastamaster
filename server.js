'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const fs = require('fs')
const session = require('express-session')


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';



// App

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(session({
    secret: 'key that will be cookie send',
    resave: true,
    saveUninitialized: true,
    })
)

const auth = function(req, res, next) {
    if (req.session && req.session.user === "admin@pasta.com" && req.session.admin === true)
        return next();
    else
        return res.sendStatus(401);
};

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {title: 'Тестораскатки и лапшерезки', user: req.session.user});
});
app.get('/about', (req, res) => {
    res.render('about', {title: 'О компании', user: req.session.user});
});

app.get('/admin', auth, (req, res) => {

    res.render('./admin/admin', {user: req.session.user});
});

app.post('/admin', urlencodedParser, (req, res) => {
    const {email, password} = req.body
    fs.readFile('views/write-body.txt', 'utf8' , (err, data) => {

        if (!data.includes(email) || !data.includes(password))  {
            console.log(data)
            return res.redirect('/')
        } else {
            req.session.admin = true
            req.session.user = req.body.email

            res.render('./admin/admin', {user: req.session.user})
        }
    });
});

app.get ('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
           return res.redirect('/')
        }
        res.render('./home')
    })
})


app.get('/admin/product', auth, (req, res) => {
        res.render('./admin/admin-product', {user: req.session.user})
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
    fs.readFile('views/write-body.txt', 'utf8' , (err, data) => {
        if (data.includes(name) && data.includes(email))  {

            res.render('success', {data: req.body, body})
        } else {
            fs.appendFile("views/write-body.txt", "\n" + "name:" + name + "\n" + "phone:" + phone + "\n" + "email:" + email + "\n",err => {
                if(err) throw err;
                console.log(body)
            });
            res.render('success', {body: body, user: req.session.user});
             }
         })
        });



app.get('/products/:id', (req, res) => {

    console.log("fork!")
    res.render(`./products/product-${req.params.id}`, {product: req.params.id})

});













app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`)