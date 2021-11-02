var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderId : Number,
    restaurants : String, 
    itemName : String, 
    quantity : Number, 
    productPrice : Number,
    totalProducts : Number, 
    orderDateTime : String
});

var Order = mongoose.model('order', orderSchema, 'sample_orders');

module.exports = Order;