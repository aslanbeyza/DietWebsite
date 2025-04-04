const express = require('express');
const router = express.Router();
;
const productController = require('../controllers/productController');

router.get('/', productController.getAllProduct);
router.get('/:product_id', productController.getProductById);
router.post('/', productController.createProduct);
router.get('/:productName', productController.getProductByName); // Yeni arama rotası

module.exports = router;