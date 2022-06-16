const
    passport = require( 'passport' ),
    LocalStrategy = require( 'passport-local' ).Strategy;

const Users = require( '../models/Users' );

// ! LocalStrategy: Autenticarse con un nombre de usuario y contraseña.
passport.use(
    new LocalStrategy(
        {   // * Por defecto Passport espera usuario y contraseña, asi que lo personalizamos
            usernameField: 'email',             // ! Para que ahora use de usuario el correo electronico
            passwordField: 'password'
        },
        async ( email, password, done ) => {    // ! Done funciona como el CallBack next() en Express
            try {
                const user = await Users.findOne({
                    where: {
                        email
                    }
                });    

                console.log( user );

                if( ! user?.verifyPassword( password ) ) {
                    console.log( 'Incorrect password' );
                    return done(
                        null,       // ! error
                        false,      // ! user   
                        {           // ! options
                            message: 'Incorrect password'
                        }
                    );
                }

                return done( null, user );
            }
            catch( error ) {
                console.log( 'Email does not exist' );

                return done( error, false, {
                    message: 'Email does not exist'
                });
            }
        }
    )
);

// ! Serializar el usuario
passport.serializeUser( ( user, callBack ) => {
    callBack( null, user );
});

// ! Deserializar el usuario
passport.deserializeUser( ( user, callBack ) => {
    callBack( null, user );
});

module.exports = passport;
