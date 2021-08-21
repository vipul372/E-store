const {Order, ProductsInCart} = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order)=>{
        if (err)
            return res.status(400).json({error: "No order was found in DB"});
        req.order = order;
        next();
    });
}

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if(err)
            return res.status(400).json({error: err});
        res.json(order);

    });
}

exports.getAllOrders = (req, res) =>{
    Order.find()
    .populate("user","_id email")
    .exec((err, orders)=>{
        if(err)
            return res.status(400).json({error:"No orders found in DB"});

        res.json(orders);
    });
}
exports.getOrderStatus = (req, res)=>{
    res.json(Order.schema.path("status").enumValue);
}

exports.updateStatus = (req, res) =>{
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err, order)=>{
            if(err)
                return res.status(400).json({error: "Cannot update order in DB"});
            res.json(order);
        }

    );
}