const
    express = require('express'),
    app = express(),
    routes = require( './routes' );

// * Define ruta para el home
app.use( '/', routes() ); 

app.listen( 4000 );