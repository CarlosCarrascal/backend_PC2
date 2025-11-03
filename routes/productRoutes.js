const express = require('express');
const router = express.Router();
const { validateProduct } = require('../middleware/validation');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Rutas de productos
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateProduct, createProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
