const express = require("express");
const cors = require("cors");
const constants = require("./../conf/config");
const { dbConnection } = require("../database/config");
const { redisConnection } = require("../database/config-redis");
const { healthMonitor } = require("@condor-labs/health-middleware");

class Server {

    constructor() {
        this.app = express()
        this.port = constants.Port;

        this.paths = {
            products: '/api/v1/products',
            shopping: '/api/v1/shopping',
        }

        // Connect to database
        this.connectDB();

        // MiddleWares
        this.middleWares();

        // Routes of app
        this.routes();
    }

    async connectDB(){
        await dbConnection();
        await redisConnection();
    }

    middleWares() {

        // CORS
        this.app.use( cors() );

        // Public directory
        this.app.use( express.static('public') );

        // Reading and parsing the Body
        this.app.use( express.json() );
    }

    routes() {

        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.shopping, require('../routes/shopping'));
    }

    listen() {
        healthMonitor(this.app);
        this.app.listen( this.port, () => {
            console.log('====================================');
            console.log(`Running on port ${ this.port }`);
        });
    }

}

module.exports = {
    Server
};
