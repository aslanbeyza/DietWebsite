const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.get('/', orderItemController.getAllOrderItems);
router.get('/:orderItem_id', orderItemController.getOrderItemById);
router.post('/', orderItemController.createOrderItem);

module.exports = router;