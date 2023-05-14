const express = require('express');
const http = require('http');

let app = express();

app.use((req, res, next) => {
    console.log('i am in middleware!');
    next();
});
app.use((req, res, next) => {
    console.log('i am 2nd middleware!');
    res.send('<h1>Hello from express!!</h1>')
});

app.listen(5000);