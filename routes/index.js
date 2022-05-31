const { response } = require('express');
const express = require( 'express' );

const router = express.Router();

const siteController = require( '../controllers/siteController' );

module.exports = () => {
    router.get( '/', siteController.home ); 
    router.get( '/about-us', siteController.us );
    router.get( '/new-project', siteController.newProject );

    return router;
}