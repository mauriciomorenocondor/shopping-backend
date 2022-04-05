const Product = require("../models/product");
const constants = require("../conf/config");

const resolvers = {

    Query : {
        products: async( parent, args ) => {
            const { code, name, limit, offset, sort } = args;
            const query = {};
            (code) ? query.code = code  : {};
            (name) ? query.name = new RegExp(`${name}`, "i") : {};

            // If the limit or offset does not exist, the default value is left.
            const flimit  = (limit)  ? limit  : constants.Pagination.limit;
            const foffset = (offset) ? offset : constants.Pagination.offset;

            const [ total, products ] = await Promise.all([
                Product.countDocuments(),
                Product.find(query)
                    .sort( sortResult(sort) )
                    .skip( Number( foffset ) )
                    .limit(Number( flimit ))
            ]);
            
            return products;
        },
        
    },

};

const sortResult = (args) => {
    let obj = {}
    switch (args) {
        case 'code':
            obj = { "code" : "asc"}
            break;

        case 'name':
            obj = { "name" : "asc"}
            break;
    
        case 'price':
            obj = { "price" : "asc"}
            break;
    
        case 'category':
            obj = { "category" : "asc"}
            break;
    
        default:
            obj = null
            break;
    }
    return obj;
}

module.exports = {
    resolvers,
    sortResult
};