const { response } = require('express');
const express = require( 'express' );

const router = express.Router();

module.exports = () => {
    router.get( '/', ( request, response ) => {
        response.send( 'Home' );
    }); 
    router.get( '/nosotros', ( request, response ) => {
        response.send( 'Nosotros' );
    });

    return router;
}