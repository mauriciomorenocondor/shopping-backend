const { Product }= require("../models");

/**
 * Products
 */
 const existProductForCode = async( code ) => {
     // Verify the code of the product exists
     const existProduct = await Product.findOne( { "code" : code });

     if ( existProduct ) {
        throw new Error(`The code ${ code } already exist`);
    }
}

const noExistProductForCode = async( code ) => {
     // Verify the code of the product exists
     const existProduct = await Product.findOne( { "code" : code });

     if ( !existProduct ) {
        throw new Error(`The product ${ code } does not exist`);
    }
}

/**
 * Validate collections allowed
 */
const categoriesAllowed = ( collection = '', collections = []) => {
    if (collection !== '') {
        const include = collections.includes( collection );
        if ( !include ) {
            throw new Error(`The category ${ collection } is not allowed, ${ collections }`);
        }        
    }

    return true;
}

module.exports = {
    existProductForCode,
    noExistProductForCode,
    categoriesAllowed,
}