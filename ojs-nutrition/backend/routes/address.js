const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.get('/', addressController.getAllAddresses);
router.post('/', addressController.createAddress);
router.get('/:id', addressController.getAddressById);
router.put('/:id', addressController.updateAddress);
router.delete('/:address_id', addressController.deleteAddress);
router.get('/user/:user_id', addressController.getAddressesByUserId);


router.get('/user/:id/default', addressController.getDefaultAddressByUserId);

module.exports = router;