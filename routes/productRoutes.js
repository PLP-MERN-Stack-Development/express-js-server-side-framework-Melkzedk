const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
} = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const auth = require('../middleware/auth');

// Routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/stats', getProductStats);
router.get('/:id', getProductById);
router.post('/', auth, validateProduct, createProduct);
router.put('/:id', auth, validateProduct, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
