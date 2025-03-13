const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  imageUrl: { type: String, required: false },  
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', productSchema);
