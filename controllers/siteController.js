const Projects = require( '../models/Projects' );
const slug = require( 'slug' );

exports.home = ( request, response ) => {
    response.render( 'index', { 
        name_page: 'Proyectos' 
    } );
}

exports.us = ( request, response ) => {
    response.render( 'about-us', {
        name_page: 'Nosotros'
    } );
};

exports.formNewProject = ( request, response ) => {
    response.render( 'forms/new-project', {
        name_page: 'Nuevo proyecto'
    } );
}

exports.addNewProject = async ( request, response ) => {
    console.log( request.body );

    const { body: { project_name } } = request;
    console.log( project_name );
    let errors = [];

    if( ! project_name )
        errors.push({ 'nombre': 'Nombre del proyecto obligatorio.' });

    if( errors.length > 0 ) {
        response.render( 'forms/new-project', {
            name_page: 'Nuevo proyecto',
            errors
        } );

        return;
    }

    const url = slug( project_name ).toLowerCase();
    const data = await Projects.create({ name: project_name, url });        // * Query Sequelize: Insertar nombre proyecto

    if( data )
        console.log( 'Project inserted successfully!' );
    else
        console.log( 'Project registration failed!' );

    response.redirect( '/' );
}