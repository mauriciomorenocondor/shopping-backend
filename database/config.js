const constants = require("./../constants");
const mongodb = require("@condor-labs/mongodb")(constants.Settings);

const dbConnection = async() => {

    try {
        await mongodb.getClient();
        console.log(`Connected DataBase: ${mongodb._isConnected()}`);	
        //console.log('Base de datos online');

    } catch (err) {
        console.log(err);
        throw new Error('Error starting DataBase');
    }

}

module.exports = {
    dbConnection
}
