const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  syncShopifyProducts,
} = require('../controllers/productController');

router.post('/', auth(['admin']), addProduct);
router.get('/', getProducts);
router.put('/:id', auth(['admin']), updateProduct);
router.delete('/:id', auth(['admin']), deleteProduct);

router.post('/sync-shopify', auth(['admin']), syncShopifyProducts);

module.exports = router;
