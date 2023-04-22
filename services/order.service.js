var Order = require('../models/order')
var Product = require('../models/product')

async function addNewOrder (total_price, list_products) {
    try {
        //Check product id is exist in product collection
        for (let i = 0; i < list_products.length; i++) {
            let idProduct = list_products[i].product_id
            let checkProduct = await Product.findById(idProduct).exec()
            if (!checkProduct) {
                throw new Error (`Product with id ${idProduct} is not exists`)
            }
        }
        var newOrder = new Order({
            total_price, 
            list_products,
        })
        newOrder = await newOrder.save();
        return newOrder.id
    } catch (err) {
      throw Error(err.message);
    }
}

async function getAllOrder () {
    try {
        let orders = await Order.find().exec()
        return orders 
    } catch (err) {
      throw Error(err.message);
    }
}

async function detailOrder (id) {
    try {
        let order = await Order.findById(id).exec()
        return order
    }
    catch (err) {
        throw Error(err.message)
    }
}

async function deleteOrder (id) {
    try {
        await Order.findByIdAndRemove(id).exec()
    }
    catch (err) {
        throw Error(err.message)
    }
}

async function updateOrder (id, {total_price, list_products}) {
    try {
        return await Order.findByIdAndUpdate(id, {total_price, list_products})        
    }
    catch (err) {
        throw Error(err.message)
    }
}   

module.exports = {
    addNewOrder, getAllOrder, detailOrder, deleteOrder, updateOrder
}
