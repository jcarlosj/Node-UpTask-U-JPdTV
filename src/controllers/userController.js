const Users = require( '../models/Users' );

exports.formCreateAccount = ( request, response ) => {
    response.render( 'create-account', {
        name_page: 'Crear cuenta en UpTask'
    });
}

exports.registerAccount = async ( request, response ) => {
    const { body: { email, password } } = request;

    try {
        // Inserta nuevo usuario
        const user = await Users.create({ email, password });

        console.log( user.id );
        response.redirect( '/login' );

    }
    catch ( err ) {
        console.error( err );

        response.render( 'create-account', {
            name_page: 'Crear cuenta en UpTask',
            errors: err.errors
        });
    }

}