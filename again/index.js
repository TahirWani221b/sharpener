const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/form', (req, res, next) => {
    res.send('<form action="/products" method="POST"><input type="text" name="text" ><button type="submit" >Add product</button></form>');
})

app.post('/products', (req, res, next) => {
    console.log(req.body.text);
    res.redirect('/');
})

app.get('/', (req, res, next) => {
    res.send('Hello from express');
})
app.listen(8080);