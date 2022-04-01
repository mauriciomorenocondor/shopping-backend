const Product = require("../models/product");
const constants = require("../constants");

const resolvers = {

    Query : {
        products: async( parent, args ) => {
            const { code, limit, offset } = args;
            const query = {};
            (code) ? query.code = code  : {};

            // If the limit or offset does not exist, the default value is left.
            const flimit  = (limit)  ? limit  : constants.Pagination.limit;
            const foffset = (offset) ? offset : constants.Pagination.offset;

            // const sorts = sort.split(',');
            // sorts.map( (element, index) => {
            //    console.log(element);
            // })

            const [ total, products ] = await Promise.all([
                Product.countDocuments(),
                Product.find(query)
                    //.sort( { price: 'desc'} )
                    .skip( Number( foffset ) )
                    .limit(Number( flimit ))
            ]);
            
            return products;
        },
        
    },

};

module.exports = {
    resolvers
};