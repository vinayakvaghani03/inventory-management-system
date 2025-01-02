const express = require('express');
const { getAllProducts, addProduct, deleteProduct }= require('../controllers/ProductsController');
const router = express.Router();

//fetch all the expenses of user based on user_id
router.get('/', getAllProducts);
//add all the expenses of user based on user_id
router.post('/', addProduct);
//delete all the expenses of user based on user_id
router.delete('/:productId', deleteProduct);

module.exports = router;