const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    product: []
  });
};

exports.updateEditProduct = (req, res, next) => {
  let productId = req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(productId).then(product => {
    product.title = title;
    product.inageUrl = imageUrl;
    product.price = price;
    product.description = description;
    return product.save();
  })
    .then(result => {
      console.log('---PRODUCT UPDATED!---');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const productId = req.params.productId;
  if (editMode != 'true') {
    return res.redirect('/');
  } else {
    Product.findByPk(productId).then(result => {
      if (!result) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: result
      });
    }).catch(err => {
      console.log(err);
    });
  }
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  }).then(result => {
    // console.log(result);
    res.redirect('/admin/products');
  }).catch(err => {
    console.log(err);
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(result => {
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.deleteProduct = (req, res, next) => {
  let mode = req.query.delete;
  if (mode !== "true") {
    return res.redirect('/');
  }
  let productId = req.params.productId;

  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('---PROUDCT DELETED!!---');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
