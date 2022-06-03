const Projects = require( '../models/Projects' );

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

    const { body: { nombre } } = request;
    console.log( nombre );
    let errors = [];

    if( ! nombre )
        errors.push({ 'nombre': 'Nombre del proyecto obligatorio.' });

    if( errors.length > 0 )
        response.render( 'forms/new-project', {
            name_page: 'Nuevo proyecto',
            errors
        } );

    // * Query Sequelize: Insertar nombre proyecto
    const data = await Projects.create({ name: nombre });

    if( data )
        console.log( 'Project inserted successfully!' );
    else
        console.log( 'Project registration failed!' );

    response.redirect( '/' );
}