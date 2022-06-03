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

exports.addNewProject = ( request, response ) => {
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
    Projects.create({ name: nombre })
        .then( () => console.log( 'Project inserted correctly!' ) )
        .catch( err => console.error( err ) );

    response.redirect( '/' );
}