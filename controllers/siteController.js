const Projects = require( '../models/Projects' );

exports.home = async ( request, response ) => {
    const projects = await Projects.findAll();

    response.render( 'index', { 
        name_page: 'Proyectos',
        projects
    } );
}

exports.us = ( request, response ) => {
    response.render( 'about-us', {
        name_page: 'Nosotros'
    } );
};

exports.formNewProject = async ( request, response ) => {
    const projects = await Projects.findAll();

    response.render( 'projects/page-project', {
        name_page: 'Nuevo proyecto',
        projects
    } );
}

exports.addNewProject = async ( request, response ) => {
    console.log( request.body );

    const { body: { project_name } } = request;
    const projects = await Projects.findAll();
    let errors = [];

    if( ! project_name )
        errors.push({ 'nombre': 'Nombre del proyecto obligatorio.' });

    if( errors.length > 0 ) {
        response.render( 'projects/page-project', {
            name_page: 'Nuevo proyecto',
            errors,
            projects
        } );

        return;
    }

    const data = await Projects.create({ name: project_name });        // * Query Sequelize: Insertar nombre proyecto

    if( data )
        console.log( 'Project inserted successfully!' );
    else
        console.log( 'Project registration failed!' );

    response.redirect( '/' );
}

exports.bySlug = async ( request, response, next ) => {
    const promiseProjects = Projects.findAll();

    const promiseProject = Projects.findOne({
        where: {
            url: request.params.slug
        }
    });

    const
        [ objProjects, objProject ] = await Promise.all([ promiseProjects, promiseProject ]),
        { dataValues: project } = objProject,
        projects = objProjects.map( project => {
            return project.dataValues
        });

    console.log( '>>>', projects );

    if( ! project )
        return next();

    response.render( 'tasks', {
        name_page: 'Tareas del proyecto',
        project,
        projects
    });
}

exports.formEditProject = async ( request, response ) => {
    const promiseProjects = Projects.findAll();

    const promiseProject = Projects.findOne({
        where: {
            id: request.params.projectId
        }
    });

    const
        [ objProjects, objProject ] = await Promise.all([ promiseProjects, promiseProject ]),
        { dataValues: project } = objProject,
        projects = objProjects.map( project => {
            return project.dataValues
        });

console.log( '>>>', projects );

    response.render( 'projects/page-project', {
        name_page: 'Editar proyecto',
        project, 
        projects
    } );
}

exports.updateProject = async ( request, response ) => {
    console.log( request.body );

    const { body: { project_name } } = request;
    const projects = await Projects.findAll();
    let errors = [];

    if( ! project_name )
        errors.push({ 'nombre': 'Nombre del proyecto obligatorio.' });

    if( errors.length > 0 ) {
        response.render( 'projects/page-project', {
            name_page: 'Nuevo proyecto',
            errors,
            projects
        } );

        return;
    }

    // * Query Sequelize: Actualizar nombre proyecto
    const data = await Projects.update(
        { name: project_name },
        { 
            where: {
                id: request.params.projectId
            }
        }
    );        

    if( data )
        console.log( 'Project updated successfully!' );
    else
        console.log( 'Failed to update project!' );

    response.redirect( '/' );
}