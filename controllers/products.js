const { response, request } = require("express");

const Product = require("../models/product");

const createProduct = async(req, res = response ) => {

    const { code, name, ...body } = req.body;

    // Save data
    const data = {
        code, name, ...body
    }

    const product = new Product( data );

    // Guardar DB
    await product.save();

    res.status(201).json(product);

}

const editProduct = async(req, res = response ) => {

    const { code, _id, ...body } = req.body;

    // Save data
    const data = {
        ...body
    }
    
    // Seacrh id of product
    const resp = await Product.find({ code : code });
    const uid = resp[0]._id;

    // Guardar DB
    const product = await Product.findByIdAndUpdate( uid, data, { new: true });

    res.json(product);

}



module.exports = {
    createProduct,
    editProduct,
}