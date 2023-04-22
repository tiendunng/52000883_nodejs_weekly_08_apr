var service = require('../services/order.service')

exports.getAllOrder = async (req, res, next) => {
    try {
        let orders = await service.getAllOrder()
        res.status(201).json(orders)
    }
    catch (err) {
        res.status(500).send('Something went wrong: ' + err.message);
    }
}

exports.addNewOrder = async (req, res, next) => {
    try {
        //req.body has params as
        // [
        //     {total_price: 200000, 
        //         list_products: {
        //             product_id:                  '643a531dfec0addddacba0e8',
        //             amout: 100,
        //             price: 20000,
        //         }
        //     }
        // ] 
        const {total_price, list_products} = req.body
        let id = await service.addNewOrder(total_price, list_products)
        res.status(201).json({
            message: 'Order added successfully',
            id,
        })
    }
    catch (err) {
        res.status(500).send('Something went wrong: ' + err.message);
    }
}

exports.detailOrder = async (req, res, next) => {
    try {
        let id = req.params.id
        let order = await service.detailOrder(id)
        return res.status(201).json(order)
    }
    catch (err) {
        res.status(500).send('Something went wrong: ' + err.message);
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        //req.body has params as
        // [
        //     {total_price: 200000, 
        //         list_products: {
        //             product_id:                  '643a531dfec0addddacba0e8',
        //             amout: 100,
        //             price: 20000,
        //         }
        //     }
        // ] 
        const {total_price, list_products} = req.body
        let rel = await service.updateOrder (req.params.id, {total_price, list_products})
        return res.status(201).json({
            message: `The order with id ${req.params.id} was updated successfully`
        })
    }   
    catch (err) {
        res.status(500).send('Something went wrong' + err.message);
    } 
}

exports.deleteOrder = async (req, res, next) => {
    try {
        let id = req.params.id
        await service.deleteOrder
        res.status(201).json({message: `Order with id  ${id} deleted successfully`})
    }
    catch (err) {
        res.status(500).send('Something went wrong: ' + err.message);
    }
}