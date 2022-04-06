/**
 * api/v1/products
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { graphqlHTTP } = require("express-graphql");
const  schema = require("./../src/schema");

const { validateFields } = require("../middlewares");
const { existProductForCode, noExistProductForCode, categoriesAllowed } = require("../helpers/db-validators");
const { createProduct, editProduct } = require("../controllers/products");

const mongo = require("./../conf/config");

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