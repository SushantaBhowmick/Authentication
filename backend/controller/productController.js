const Product = require("../Models/ProductModel");

exports.createProduct = async(req,res,next)=>{
    // const {name,price,category,description}= req.body;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}

exports.getAllProducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}