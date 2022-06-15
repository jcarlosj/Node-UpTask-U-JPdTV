const
    express = require('express'),
    app = express(),
    path = require( 'path' ),
    routes = require( './src/routes' ),
    db = require( './src/config/sequelize' ),
    session = require( 'express-session' ),
    passport = require( './src/config/passport' ),
    { vardump } = require( './src/helpers' );

/** Schemas: Sequelize */
require( './src/models/Projects' );
require( './src/models/Tasks' );
// require( './src/models/Users' );

// * Implementa conexion de MySQL usando Sequelize
db.sync()
    .then( () => console.log( 'Sequelize connected to MySQL' ) )
    .catch( ( error ) => console.error( error ) );

app.use( express.json() );                                  //  Habilita lectura datos tipo JSON
app.use( express.urlencoded({ extended: true } ) );

app.use( express.static( path.join( __dirname, './src/public' ) ) );        //  Establece ruta de archivos estaticos
app.set( 'view engine', 'pug' );                            //  Habilita pug
app.set( 'views',
    path.join( __dirname, './src/views' )                   //  Establece ruta de las vistas
);

// Middleware de sesión: Configurada
app.use( session({
    secret: 'kisDtlRk94lKw12',  // ! Es la cadena que se utiliza para firmar la cookie de ID de sesión.
    resave: false,              // ! Obliga a que la sesión se guarde de nuevo en el almacén de sesiones, incluso si la sesión nunca se modificó durante la solicitud. El valor predeterminado es verdadero, pero el uso del valor predeterminado ha quedado obsoleto, ya que el valor predeterminado cambiará en el futuro.
    saveUninitialized: false    // ! Obliga a que una sesión "no inicializada" se guarde en la tienda. Una sesión no se inicializa cuando es nueva pero no modificada.
}));

app.use( passport.initialize() );                           //  Inicializa instancia de Passport
app.use( passport.session() );                              //  Habilita el uso de session para Passport

app.use( ( request, response, next ) => {
    response.locals.vardump = vardump;                      //  Establece la funcion vardump del helper como una funcionlidad disponible para toda la aplicacion
    next();
});

// * Define ruta para el home
app.use( '/', routes() ); 

app.listen( 4000 );