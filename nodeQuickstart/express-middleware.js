const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/add-product', (req, res, next) => {
    res.send('<form aciton="/product" method="POST"><input type="text" name="name" ><input type="submit" value="submit">');
    next();
});
app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.listen(5000);