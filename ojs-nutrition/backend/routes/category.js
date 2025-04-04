const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Tüm kategorileri getir
router.get('/', categoryController.getAllCategories);

// ID'ye göre bir kategori getir
router.get('/:category_id', categoryController.getCategoryById);

// Yeni bir kategori oluştur
router.post('/', categoryController.createCategory);

// Belirli bir kategoriye ait ürünleri getir (Yeni eklenen route)
router.get('/:category_id/products', categoryController.getProductsByCategory);

module.exports = router;