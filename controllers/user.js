const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user)
            return res.status(400).json({error: "No user was found in DB"});
        req.profile = user;
        next();
    });
}

exports.getUser = (req, res)=>{
    
    //no need to populate these field in the front end so hiding them
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}


exports.updateUser = (req, res)=>{
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify:false },
        (err, user)=>{
            if(err)
                return res.status(400).json({error: "User update failed!"});
            user.salt = undefined;
            user.encry_password = undefined;    
            res.json(user);
        }
    );
}

exports.userPurchaseList = (req, res)=>{
    Order.find({user: req.profile._id})
    .populate("user", "_id firstname")
    .exec((err, order)=>{
        if(err)
            return res.status(400).json({error: "No order found!"});
        return res.json(order);
    });
}

//this middleware will push puchase history into "purchase" field of User Model
exports.pushOrderInPurchaseList = (req, res, next)=>{
    let purchases = [];
    req.body.order.products.forEach(product =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            catogory: product.catogory,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    //store this in DB
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases)=>{
            if(err)
                return res.status(400).json({error: "Unable to save purchase list"});
            next();
        }
    )
    
}