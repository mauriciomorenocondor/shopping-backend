import { response, request } from "express";

import Product  from "../models/product";
const logger = require('@condor-labs/logger');
const redisHelper = require('../database/config-redis');

const listShoppingCar = async(req = request, res = response) => {

    try {
        await redisHelper.get('products', async (products) => {
            if (products) {
                res.status(200).json({ products : JSON.parse(products) })
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).send(error.message);
    }

}

const createShoppingCar = async(req, res = response ) => {

    const { code, totalPrice, products } = req.body;

    const data = {
        code,
        totalPrice,
        products,
    }
    
    await redisHelper.set('products', data)
    //await redisHelper.set( 'products', data)

    res.status(201).json(data);

}

const insertProduct = async(req, res = response ) => {

    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        await redisHelper.get('products', async (dataRes) => {
            if (dataRes && quantity > 0) {
                const data = JSON.parse(dataRes);
                // Add the total price
                data.totalPrice = data.totalPrice + (product.price * quantity);
                // Ckeck if the product already exist
                const index = data.products.findIndex( (el) => el.productId === productId );
                if (index >= 0) {
                    // The product exist and adds quantity of the product
                    data.products[index].quantity = data.products[index].quantity + quantity;
                } else {
                    // The product does not exist and insert the new product
                    data.products.push( { productId, quantity } );
                }

                await redisHelper.set('products', data);
                res.status(200).json({ 
                    msg: 'Inserted product',
                    data 
                })
            } else {
                const data = JSON.parse(dataRes);
                res.json({data})
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).send(error.message);
    }

}

const deleteProduct = async(req, res = response ) => {

    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);

        await redisHelper.get('products', async (dataRes) => {
            if (dataRes) {
                const data = JSON.parse(dataRes);
                // Ckeck if the product already exist
                const index = data.products.findIndex( (el) => el.productId === productId );
                if (index >= 0) {
                    data.totalPrice = data.totalPrice - (product.price * data.products[index].quantity);
                    data.products.splice(index);
                }

                await redisHelper.set('products', data);
                res.status(200).json({ 
                    msg: 'Deleted product',
                    data 
                })
            } else {
                const data = JSON.parse(dataRes);
                res.json({data})
            }
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).send(error.message);
    }

}





module.exports = {
    createShoppingCar,
    listShoppingCar,
    insertProduct,
    deleteProduct,
}