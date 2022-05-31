const
    express = require('express'),
    app = express(),
    path = require( 'path' ),
    routes = require( './routes' );

app.set( 'view engine', 'pug' );                            //  Habilita pug
app.set( 'views', path.join( __dirname, './views' ) );      //  Establece ruta de las vistas

// * Define ruta para el home
app.use( '/', routes() ); 

app.listen( 4000 );