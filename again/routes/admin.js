const express = require('express');
const router = express.Router();

router.get('/form', (req, res, next) => {
    res.send('<form action="/products" method="POST"><input type="text" name="text" ><button type="submit" >Add product</button></form>');
});

router.post('/products', (req, res, next) => {
    console.log(req.body.text);
    res.redirect('/');
});

module.exports = router;