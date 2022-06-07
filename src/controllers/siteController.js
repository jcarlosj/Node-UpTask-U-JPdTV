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