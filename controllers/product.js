const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const Product = require("../models/Product");

exports.getProducts = (req, res)=>{
    Product.find({}, (err, products)=>{
        if(err) return res.status(500).json({success: false, err});
        res.status(200).json({success: true, products})
    });
}

exports.getProduct = (req, res)=>{
    Product.findById(req.params.id, (err, product)=>{
        if(err) return res.status(500).json({success: false, err});
        res.status(200).json({success: true, product});
    });
}

exports.createProduct = (req, res)=>{
    if(req.user.isAdmin === false) return res.status(401).json({success: false, message: "You cannot perform this action"});
    const input = {
        sku: req.body.sku,
        name: req.body.name,
        imagePath: req.body.imagePath,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock
    }

    const newProduct = new Product(input);

    newProduct.save(err=>{
        if(err) return res.status(200).json({success: false, err});
        res.status(201).json({success: true, product: newProduct});
    });
}

exports.updateProduct = (req, res)=>{
    if(req.user.isAdmin === false) return res.status(401).json({success: false, message: "You cannot perform this action"});

    //removes fields that were not changed
    var body = req.body;
    for(prop in body){
        if(!body[prop]) delete body[prop];
    }

    Product.findByIdAndUpdate(req.params.id, {$set: body}, {new: true}, (err, product)=>{
        if(err) return res.status(500).json({success: false, err});
        res.status(200).json({success: true, product});
    });
}

exports.deleteProduct = (req, res)=>{
    if(req.user.isAdmin === false) return res.status(401).json({success: false, message: "You cannot perform this action"});
    
    Product.remove({_id: req.params.productId}, (err, product)=>{
        if(err) return res.status(500).json({success: false, err});
        res.status(200).json({success: true, productId: req.params.productId});
    })
}