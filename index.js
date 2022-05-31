const
    express = require('express'),
    app = express(),
    path = require( 'path' ),
    routes = require( './routes' ),
    db = require( './config/sequelize' );

// * Implementa conexion de MySQL usando Sequelize
db.authenticate()
    .then( () => console.log( 'Sequelize connected to MySQL' ) )
    .catch( ( error ) => console.error( error ) );

app.use( express.json() );                                  //  Habilita lectura datos tipo JSON
app.use( express.urlencoded({ extended: true } ) );

app.use( express.static( 'public' ) );                      //  Establece ruta de archivos estaticos
app.set( 'view engine', 'pug' );                            //  Habilita pug
app.set( 'views',
    path.join( __dirname, './views' ),                      //  Establece ruta de las vistas
    path.join( __dirname, './views/forms' )                 //  Establece ruta de vistas de formularios
);      

// * Define ruta para el home
app.use( '/', routes() ); 

app.listen( 4000 );