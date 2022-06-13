import axios from "axios";

const tasks = document.querySelector( '.listado-pendientes' );

if ( tasks ) {
    tasks.addEventListener( 'click', event => {
        // console.log( event.target.classList );

        // Verifica que el evento tenga la a clase que identifica el icono de cambiar estado de la tarea a completado.
        if( event.target.classList.contains( 'icon-incomplete' ) ) {
            const
                iconInComplete = event.target,
                liElement = iconInComplete.parentElement.parentElement,
                taskId = liElement.dataset.taskId;
            
            const url = `${ location.origin }/task/${ taskId }`;
            // console.log( url );

            axios.patch( url, { taskId } )
                .then( response => {
                    // console.log( response );        // Respuesta del controlador

                    /** Valida el estado y cambia icono a traves de su clase */
                    if( response.status === 200 ) {
                        iconInComplete.classList.remove( 'icon-incomplete' );
                        iconInComplete.classList.add( 'icon-complete' );
                    }
                });
        }

        // Verifica que el evento tenga la a clase que identifica el icono de cambiar estado de la tarea a por completar.
        if( event.target.classList.contains( 'icon-complete' ) ) {
            const
                iconComplete = event.target,
                liElement = iconComplete.parentElement.parentElement,
                taskId = liElement.dataset.taskId;
            
            const url = `${ location.origin }/task/${ taskId }`;
            // console.log( url );

            axios.patch( url, { taskId } )
                .then( response => {
                    // console.log( response );        // Respuesta del controlador

                    /** Valida el estado y cambia icono a traves de su clase */
                    if( response.status === 200 ) {
                        iconComplete.classList.remove( 'icon-complete' );
                        iconComplete.classList.add( 'icon-incomplete' );
                    }
                });
        }
    } );
}

export default tasks;