const Users = require( '../models/Users' );

exports.formCreateAccount = ( request, response ) => {
    response.render( 'create-account', {
        name_page: 'Crear cuenta en UpTask'
    });
}

exports.registerAccount = async ( request, response ) => {
    const { body: { email, password } } = request;

    // Inserta nuevo usuario
    const user = await Users.create({ email, password });

    if( user ) {
        console.log( user.id );
        response.redirect( '/login' );
    }

    // Users.create({ email, password })
    //     .then( user => {
    //         console.log( user.id );
    //         response.redirect( '/login' );
    //     });
}