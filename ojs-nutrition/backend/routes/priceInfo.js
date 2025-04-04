const express = require('express');
const router = express.Router();
const priceInfoController = require('../controllers/priceInfoController');

router.get('/', priceInfoController.getPriceInfo);
router.get('/:priceInfo_id', priceInfoController.getPriceInfoById);
router.post('/', priceInfoController.createPriceInfo);

module.exports = router;