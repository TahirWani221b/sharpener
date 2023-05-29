const express = require('express');

const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerAdmin);
app.use(routerShop);

app.listen(8080);