const express = require('express');
const router = express.Router();
const addressRoutes = require('./address');
const authRoutes = require('./auth');
const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const orderItemRoutes = require('./orderItem');
const paymentRoutes = require('./payment');
const priceInfoRoutes = require('./priceInfo');
const productRoutes = require('./product');
const reviewRoutes = require('./review');
const userRoutes = require('./user');



router.use('/address', addressRoutes);
router.use('/auth', authRoutes);  /* testi okey */
router.use('/category', categoryRoutes);  /* testi okey */
router.use('/order', orderRoutes);   /*okey  */
router.use('/orderItem', orderItemRoutes);  /*okey  */
router.use('/payment', paymentRoutes);
router.use('/priceInfo', priceInfoRoutes);/* testi okey */
router.use('/product', productRoutes);/* testi okey */
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);/* testi okey */

module.exports = router;