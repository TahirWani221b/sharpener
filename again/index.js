const express = require('express');
const path = require('path');
const routerAdmin = require('./routes/admin');
const routerShop = require('./routes/shop');
const rootDir = require('./util/path');

const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(rootDir, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', routerAdmin);
app.use(routerShop);

const notFoundFilePath = path.join(rootDir, 'views', '404.html');
app.use('/', (req, res, next) => {
    res.status(404).sendFile(notFoundFilePath);
});

app.listen(8080);