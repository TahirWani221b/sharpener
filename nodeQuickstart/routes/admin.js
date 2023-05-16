const express = require('express');
const app = express();

const router = express.Router();

router.get('/add-products', (req, res, next) => {
    res.send('<form action = "/products" method="POST"><input type="text" name="title"><input type="submit" value="submit">');
})

router.post('/products', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;