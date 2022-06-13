import axios from "axios";

const tasks = document.querySelector( '.listado-pendientes' );

if ( tasks ) {
    tasks.addEventListener( 'click', event => {
        // console.log( event.target.classList );

        // Verifica que el evento tenga la a clase que identifica el icono de cambiar estado de la tarea.
        if( event.target.classList.contains( 'icon-incomplete' ) ) {
            const
                iconComplete = event.target,
                liElement = iconComplete.parentElement.parentElement,
                taskId = liElement.dataset.taskId;
            
            const url = `${ location.origin }/task/${ taskId }`;
            // console.log( url );

            axios.patch( url, { id: taskId } )
                .then( response => {
                    console.log( response );        // Respuesta del controlador
                });
        }
    } );
}

export default tasks;