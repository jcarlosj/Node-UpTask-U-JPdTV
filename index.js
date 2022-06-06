const
    express = require('express'),
    app = express(),
    path = require( 'path' ),
    routes = require( './src/routes' ),
    db = require( './src/config/sequelize' ),
    { vardump } = require( './src/helpers' );

/** Schemas: Sequelize */
require( './src/models/Projects' );
require( './src/models/Tasks' );

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
app.use( ( request, response, next ) => {
    response.locals.vardump = vardump;                      //  Establece la funcion vardump del helper como una funcionlidad disponible para toda la aplicacion
    next();
});

// * Define ruta para el home
app.use( '/', routes() ); 

app.listen( 4000 );