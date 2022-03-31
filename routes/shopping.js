/**
 * api/v1/shopping
 */

 import { Router } from "express";
 import { check } from "express-validator";
 
 import { validateFields } from "../middlewares";
 import { existProductForCode, noExistProductForCode, categoriesAllowed } from "../helpers/db-validators";
 import { createShoppingCar, listShoppingCar, insertProduct, deleteProduct } from "../controllers/shopping";
 
 import mongo from "./../constants";
 
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