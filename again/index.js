const express = require('express');

const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', routerAdmin);
app.use(routerShop);

app.use('/', (req, res, next) => {
    res.status(404).send('<h1>404 Page not found!</h1>');
});

app.listen(8080);