/**
 * api/v1/shopping
 */

 const { Router } = require("express");
 const { check } = require("express-validator");
 
 const { validateFields } = require("../middlewares");
 const { createShoppingCar, listShoppingCar, insertProduct, deleteProduct } = require("../controllers/shopping");
 
 const router = Router();
 
 router.get('/', listShoppingCar );
  
 router.post('/',[
     check('code', 'The code of products is required').not().isEmpty(),
     check('totalPrice', 'The total price is required').not().isEmpty(),
     check('totalPrice', 'The price must be numeric').isNumeric(),
     check('products', 'The producst is required').isArray(),
     validateFields
 ], createShoppingCar );
  
 router.patch('/',[
     check('productId', 'The product Id is required').notEmpty(),
     check('quantity',  'The quantity of products is required').notEmpty(),
     check('quantity',  'The quantity must be numeric').isNumeric(),
     validateFields
 ], insertProduct );
 
 router.delete('/',[
     check('productId', 'The product Id is required').notEmpty(),
     validateFields
 ], deleteProduct );
  
 module.exports = router;