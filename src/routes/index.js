const { response } = require('express');
const express = require( 'express' );
const { body } = require( 'express-validator' );

const router = express.Router();

const siteController = require( '../controllers/siteController' );
const taskController = require( '../controllers/taskController' );

module.exports = () => {
    /** Site routes */
    router.get( '/', siteController.home ); 
    router.get( '/about-us', siteController.us );

    /** Project routes */
    router.get( '/project/new', siteController.formNewProject );
    router.post( '/project/new', 
        body( 'project_name' ).not().isEmpty().trim().escape(),
        siteController.addNewProject 
    );
    router.get( '/projects/:slug', siteController.bySlug );
    router.get( '/project/edit/:projectId', siteController.formEditProject );
    router.post( '/project/save/:projectId',
        body( 'project_name' ).not().isEmpty().trim().escape(),
        siteController.updateProject 
    );
    router.delete( '/projects/:slug', siteController.deleteProject );

    /** Task routes */
    router.post( '/projects/:slug', taskController.addNewTask );

    return router;
}