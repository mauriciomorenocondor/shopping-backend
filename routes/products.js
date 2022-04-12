/**
 * api/v1/products
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares");
const { existProductForCode, noExistProductForCode, categoriesAllowed } = require("../helpers/db-validators");
const { createProduct, editProduct } = require("../controllers/products");

const mongo = require("./../conf/config");

const router = Router();

//router.get('/', listProducts )

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
    check('_id', 'The productId is not a valid mongo Id').isMongoId(),
    check('_id', 'The productId is required').notEmpty(),
    check('price', 'The price must be numeric').isNumeric(),
    check('category').custom( el => categoriesAllowed( el, mongo.Categories ) ),
    validateFields
], editProduct );



module.exports = router;