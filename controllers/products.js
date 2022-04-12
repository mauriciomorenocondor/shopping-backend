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

    const { productId, code, _id, ...body } = req.body;
    // Save data
    const data = {
        code,
        ...body
    }
    
    // Seacrh code of product, if verify is code is change and not exist
    if (code) {
        const resp = await Product.find({ _id : _id });
        if (!resp) {
            res.status(400).json({ 
                errors : [{
                    msg : `The product is not exist`
                }]
            });
            return;
        }

        if( resp[0].code !== code){
            // The code is change, verify is not exist the new code
            const prod = await Product.find({ code : code });
            if (prod.length > 0) {
                res.status(400).json({
                    errors : [{
                        msg : `The new code ${ code } already exist`
                    }]
                });
                return;
            }
        }
    }
    
    // Guardar DB
    const product = await Product.findByIdAndUpdate( _id, data, { new: true });

    res.json(product);

}



module.exports = {
    createProduct,
    editProduct,
}