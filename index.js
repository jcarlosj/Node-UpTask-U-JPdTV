const express = require('express');

const app = express();

// * Define ruta para el home
app.use( '/', ( request, response ) => {
    response.send( 'UpTask' );
}); 

app.listen( 4000 );