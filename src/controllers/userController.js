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

        // console.log( user.id );
        response.redirect( '/login' );

    }
    catch ( err ) {
        let errors = {
            email: [],
            password: [],
        };

        // console.error( err );

        // * Itera los errores producidos por las validaciones y restricciones del Modelo en Sequelize
        for( const error of err.errors ) {
            // * Compila todos los errores relacionados al email
            if( error.path === 'email' )
                errors.email.push({ 
                    path: error.path,
                    validatorKey: error.validatorKey,
                    message: error.message
                });
            // * Compila todos los errores relacionados al password
            if( error.path === 'password' )
                errors.password.push({ 
                    path: error.path,
                    validatorKey: error.validatorKey,
                    message: error.message
                });
        }

        // console.log( errors );

        response.render( 'create-account', {
            name_page: 'Crear cuenta en UpTask',
            errors
        });
    }

}