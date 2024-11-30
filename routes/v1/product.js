var express = require('express');
const ProductController = require('../../controller/product');
var router = express.Router();

const productController = new ProductController()

/* GET users listing. */
router.get('/getAll', productController.getAllProduct);

module.exports = router;
