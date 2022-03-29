const mongodb = require("@condor-labs/mongodb")();

const ProductSchema = mongodb.mongoose.Schema({
    code: {
        type: String,
        required: [true, 'The code of products is required'],
        unique: true,
    },
    name: {
        type : String,
        required: [true, 'The name of products is required']
    },
    price: {
        type : Number,
        required: [true, 'The price of product is required'],
        default: 0,
    },
    category: {
        type: String,
        required: [true, 'The category of product is required'],
    },
});
ProductSchema.methods.toJSON = function() {
    const { __v, password, _id, ...data  } = this.toObject();
    data.uid = _id;
    return data;
}

const modelProduct = mongodb.mongoose.model('Product', ProductSchema);
module.exports = modelProduct;