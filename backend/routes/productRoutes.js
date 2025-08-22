const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Get products with filters (users & merchants)
router.get('/', authMiddleware, productController.listProducts);

// Create product (merchants only)
router.post('/', authMiddleware, roleMiddleware('merchant'), productController.createProduct);

// Edit product (merchants only)
router.put('/:productId', authMiddleware, roleMiddleware('merchant'), productController.editProduct);

// Delete product (merchants only)
router.delete('/:productId', authMiddleware, roleMiddleware('merchant'), productController.deleteProduct);

module.exports = router;
