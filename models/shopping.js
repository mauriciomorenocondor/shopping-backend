class Shopping {
    
    shoppingCar = {
        code       : '',
        totalPrice : '',
        products   : [
            {
                productId : '',
                quantity  : '',
            }
        ]
    }
    

    constructor( data ) {
        this.shoppingCar  = data.shoppingCar;

    }
}

export default Shopping;



// const mongodb = require("@condor-labs/mongodb")();

// const ShoppingCarSchema = mongodb.mongoose.Schema({
//     code: {
//         type: String,
//         required: [true, 'The code of products is required'],
//         unique: true,
//     },
//     totalPrice: {
//         type : String,
//         required: [true, 'The name of products is required']
//     },
//     products: {
//         type : [
//             {
//                 productId: {
//                     type: mongodb.mongoose.Schema.Types.ObjectId,
//                 },
//                 quantity: {
//                     type: Number,
//                     required: [true, 'The quantity of products is required'],
//                 }   
//             }
//         ],
//     },
// });
// ShoppingCarSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...data  } = this.toObject();
//     data.uid = _id;
//     return data;
// }

// const modelShopping = mongodb.mongoose.model('Shopping', ShoppingCarSchema);
// module.exports = modelShopping;