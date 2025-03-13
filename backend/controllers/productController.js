const axios = require('axios');
const Product = require('../models/product');

const addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add product', details: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { isDeleted: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
};

const syncShopifyProducts = async (req, res) => {
  try {
      console.log('Fetching products from Shopify...');
      const response = await axios.get(
          `https://${process.env.SHOPIFY_STORE}/admin/api/2024-04/products.json`,
          {
              headers: {
                  'X-Shopify-Access-Token': process.env.SHOPIFY_API_PASSWORD,
              },
          }
      );

      const products = response.data.products;
      if (!products || products.length === 0) {
          return res.status(404).json({ error: 'No products found in Shopify store' });
      }

      console.log(`Fetched ${products.length} products. Saving to MongoDB...`);

      const bulkOperations = products.map(product => {
          const { title: name, variants, images } = product;
          const { price, inventory_quantity: stock } = variants[0];
          const imageUrl = images.length > 0 ? images[0].src : null;

          let discount = 0;
          if (stock < 5) discount = 30;
          else if (stock < 10) discount = 20;
          else if (stock < 20) discount = 10;

          const discountedPrice = Math.round(price - (price * discount / 100));

          return {
              updateOne: {
                  filter: { name },
                  update: { 
                      $set: { price, stock, discountedPrice, discount, imageUrl }  
                  },
                  upsert: true,
              },
          };
      });

      await Product.bulkWrite(bulkOperations);
      res.status(200).json({ message: 'Products synced with images and discounts' });

  } catch (err) {
      console.error('Error syncing Shopify products:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to sync products', details: err.response?.data || err.message });
  }
};


module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  syncShopifyProducts,
};
