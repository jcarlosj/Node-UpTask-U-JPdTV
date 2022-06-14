const Users = require( '../models/Users' );

exports.formCreateAccount = ( request, response ) => {
    response.render( 'create-account', {
        name_page: 'Crear cuenta en UpTask'
    });
}

exports.registerAccount = ( request, response ) => {
    const { body: { email, password } } = request;

    // Inserta nuevo usuario
    Users.create({ email, password })
        .then( user => {
            console.log( user.id );
            response.redirect( '/login' );
        });
}