import projects from './modules/projects';          // Gracias a Babel podemos usar la sintaxis de ES6 para importar en Node
import tasks from './modules/tasks';

import { updateProgressBar } from './functions/updateProgressBar';

// Este evento se activa cuando el DOM se ha cargado y analizado por completo, sin esperar a que las hojas de estilo, las imágenes y los submarcos terminen de cargarse.
document.addEventListener( 'DOMContentLoaded', () => {
    updateProgressBar();
});