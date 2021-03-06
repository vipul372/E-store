const Category = require("../models/category");

exports.getCategoryById= (req, res, next, id)=>{
    Category.findById(id).exec((err, cate)=>{
        if(err)
            return res.status(400).json({error : "Category not dound in database"});
        req.category = cate;
        next();
    })
}

exports.createCategory = (req, res)=>{
    const category = Category(req.body);
    category.save((err,category)=>{
        if(err)
            return res.status(400).json({error : "Not able to create category in Database"});
        res.json({category});
    })
}

exports.getCategory= (req, res)=>{
    return res.json(req.category);
}

exports.getAllCategory= (req, res)=>{
    Category.find().exec((err, categories)=>{
        if(err)
            return res.status(400).json({error: "No Category found!"});

        res.json(categories);
    })
}

exports.updateCategory = (req, res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err,updatedCategory)=>{
        if(err)
            return res.status(400).json({error : "Not able to update category in Database!"});
        res.json({updatedCategory});
    });
}

exports.removeCategory = (req, res)=>{
    let category = req.category;
    category.remove((err, category)=>{
        if(err)
            return res.status(400).json({error : "Not able to delete this category!"});
        res.json({message: "Deleted successfully!"});
    });
}