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

exports.newProject = ( request, response ) => {
    response.render( 'forms/new-project', {
        name_page: 'Nuevo proyecto'
    } );
}