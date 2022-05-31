exports.home = ( request, response ) => {
    response.render( 'index' );
}

exports.us = ( request, response ) => {
    response.render( 'about-us' );
};