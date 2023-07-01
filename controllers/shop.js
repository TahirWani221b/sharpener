const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(result => {
    res.render('shop/product-list', {
      prods: result,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  let prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(result => {
      res.render('shop/product-detail', {
        prods: result,
        pageTitle: result.title,
        path: '/products'
      });
    }).catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(result => {
    res.render('shop/product-list', {
      prods: result,
      pageTitle: 'All Products',
      path: '/'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let newQuantity = 1;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.cartDeleteItem = (req, res, next) => {
  let productId = req.query.productId;
  let editMode = req.query.delete;

  if (editMode != 'true' || !productId) {
    res.redirect('/cart');
  } else {
    let fetchedCart;
    req.user.getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId } });
      })
      .then(products => {
        let product = products[0];
        return product.cartItem.destroy();
      })
      .then(product => {
        res.redirect('/cart');
      })
      .catch(err => {
        console.log(err);
      })
  }
};
