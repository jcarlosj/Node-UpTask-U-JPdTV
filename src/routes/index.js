const { response } = require('express');
const express = require( 'express' );
const { body } = require( 'express-validator' );

const router = express.Router();

const siteController = require( '../controllers/siteController' );
const projectController = require( '../controllers/projectController' );
const taskController = require( '../controllers/taskController' );
const userController = require( '../controllers/userController' );

module.exports = () => {
    /** Site routes */
    router.get( '/', siteController.home ); 
    router.get( '/about-us', siteController.us );

    /** Project routes */
    router.get( '/project/new', projectController.formNewProject );
    router.post( '/project/new', 
        body( 'project_name' ).not().isEmpty().trim().escape(),
        projectController.addNewProject 
    );
    router.get( '/project/:slug', projectController.getProjectBySlug );
    router.get( '/project/edit/:projectId', projectController.formEditProject );
    router.post( '/project/save/:projectId',
        body( 'project_name' ).not().isEmpty().trim().escape(),
        projectController.updateProject 
    );
    router.delete( '/project/:slug', projectController.deleteProject );

    /** Task routes */
    router.post( '/project/:slug', taskController.addNewTask );
    router.patch( '/task/:id', taskController.changeTaskStatus );
    router.delete( '/task/:id', taskController.deleteTask );

    /** User routes */
    router.get( '/create-account', userController.formCreateAccount )

    return router;
}