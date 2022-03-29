import express from "express";
import cors from "cors";
import constants from "./../constants";
import { dbConnection } from "../database/config";

class Server {

    constructor() {
        this.app = express()
        this.port = constants.Port;

        this.paths = {
            products: '/api/v1/products',
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
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Running on port ${ this.port }`);
        });        
    }

}

module.exports = Server;
