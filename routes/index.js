const { response } = require('express');
const express = require( 'express' );

const router = express.Router();

const siteController = require( '../controllers/siteController' );

module.exports = () => {
    router.get( '/', siteController.home ); 
    router.get( '/nosotros', siteController.us );

    return router;
}