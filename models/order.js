var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  total_price: Number,
  list_products: [
    {
        product_id: String,
        amout: Number,
        price: Number,
    }
  ]
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;