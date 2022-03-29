/**
 * api/v1/products
 */

import { Router } from "express";
import { check } from "express-validator";
import { graphqlHTTP } from "express-graphql";
import  schema from "./../src/schema";

import { validateFields } from "../middlewares";
import { existProductForCode, noExistProductForCode, categoriesAllowed } from "../helpers/db-validators";
import { createProduct, editProduct, listProducts } from "../controllers/products";

import mongo from "./../constants";

const router = Router();

//router.get('/', listProducts )
router.get( '/', graphqlHTTP({
    schema : schema,
}));


router.post('/',[
    check('code').custom( existProductForCode ),
    check('code', 'The code of products is required').not().isEmpty(),
    check('name', 'The name of products is required').not().isEmpty(),
    check('price', 'The price of product is required').not().isEmpty(),
    check('price', 'The price must be numeric').isNumeric(),
    check('category', 'The category of product is required').not().isEmpty(),
    check('category').custom( el => categoriesAllowed( el, mongo.Categories ) ),
    validateFields
], createProduct );

router.patch('/',[
    check('code').custom( noExistProductForCode ),
    check('category').custom( el => categoriesAllowed( el, mongo.Categories ) ),
    validateFields
], editProduct );



module.exports = router;