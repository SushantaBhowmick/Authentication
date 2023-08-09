const express = require('express');
const { createProduct, getAllProducts } = require('../controller/productController');
const { isAuthencated } = require('../Middlewares/AuthMiddleware');
const router = express.Router();

router.route('/create').post( createProduct);
router.route('/products').get(isAuthencated, getAllProducts);

module.exports= router