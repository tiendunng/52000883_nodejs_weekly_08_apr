let Product = require('../models/product')

async function addNewProduct ({name, price, description, fileName}) {
    //console.log(name, price, description, fileName)
    try {
        var newProduct = new Product({
          name,
          price,
          description,
          image : fileName,
        })
    
        newProduct = await newProduct.save();
    
        return newProduct.id
    
    } catch (err) {
      throw Error(err.message);
    }
}

async function getProductById (id) {
    try {
        let product = await Product.findById(id).exec()
        //console.log(product)
        return product
    }
    catch (err) {
        throw Error (err.message)
    }
}

async function getAllProducts () {
    try {
        let products = await Product.find()
        //console.log(products)
        return products
    }
    catch (err) {
        throw Error (err.message)
    }
}

async function updateProduct(id, data) {
    try {
        //console.log(id, data)
        await Product.findByIdAndUpdate(id, data) 
    }
    catch (err) {
        throw Error (err.message)
    }
}

async function deleteProduct(id) {
    try {
        return await Product.findByIdAndRemove(id)
    }
    catch (err) {
        throw Error (err.message)
    }
}

module.exports = {
    addNewProduct, getProductById, getAllProducts, updateProduct, deleteProduct
}