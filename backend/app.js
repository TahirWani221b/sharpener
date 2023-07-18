const sequelize = require('./utils/database-connect');
const express = require('express');
const app = express();
const routes = require('./routes/app-routes');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

sequelize
    .sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('expense tracker listens at 4000');
        })
    })
    .catch(err => {
        console.log(err);
    })
