var service = require('../services/product.service');

exports.getAllProduct = async (req, res, next) => {
    try {
        let products = await service.getAllProducts()
        res.status(201).json(products)
    }
    catch (err) {
        res.status(500).send('Something went wrong');
    }
}


exports.getProductById = async (req, res, next) => {
    try {
        const id = req.params.id
        let product = await service.getProductById(id)
        res.status(201).json(product)
    }
    catch (err) {
        res.status(500).send('Something went wrong');
    }
}

exports.addNewProduct = async (req, res, next) => {
    try {
        const {name, price, description} = req.body
        //console.log(req.file)
        let fileName = ''
        if (req.file) {
            fileName = req.file.originalname
        }
        else if (req.body.image) {
            fileName = req.body.image
        }
        let id = await service.addNewProduct ({name, price, description, fileName})
        res.status(201).json({
            message: 'Product added successfully',
            id,
        })
    }
    catch (err) {
        res.status(500).send('Something went wrong' + err.message);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const {name, price, description} = req.body
        //console.log(req.file)
        if (!req.file) {
            //User does not upload file, keep old file
            let id = service.updateProduct(req.params.id, {name, price, description})
            return res.status(201).json({
                message: `The product with id ${req.params.id} has been updated successfully`
            })
        }
        //User uploads new file
        let fileName = ''
        if (req.file) {
            fileName = req.file.originalname
        }
        else if (req.body.image) {
            fileName = req.body.image
        }
        await service.updateProduct (req.params.id, {name, price, description, image: fileName})
        return res.status(201).json({
            message: `The product with id ${req.params.id} has been updated successfully`
        })
    }
    catch (err) {
        res.status(500).send('Something went wrong');
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        let product = await service.deleteProduct(id)
        if (!product)
            return res.status(404).json({message: 'Product not found'})
        return res.status(201).json({message: 'Product deleted successfully', product})
    }
    catch (err) {
        res.status(500).send('Something went wrong');
    }
}