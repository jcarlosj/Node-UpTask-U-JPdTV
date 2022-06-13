import axios from "axios";
import Swal from 'sweetalert2';

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

        // Verifica que el evento tenga la clase que identifica el icono de cambiar estado de la tarea a por completar.
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

        // Verifica que el evento tenga la clase que identifica el icono de eliminar tarea
        if( event.target.classList.contains( 'icon-trash' ) ) {
            const
                iconTrash = event.target,
                liElement = iconTrash.parentElement.parentElement,
                taskId = liElement.dataset.taskId;

            console.log( liElement );
            console.log( taskId );

            Swal.fire({
                title: '¿Deseas eliminar esta tarea?',
                text: "Esta acción no se puede revertir.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminala!',
                cancelButtonText: 'Cancelar'
            })
            .then( ( result ) => {
                if ( result.isConfirmed ) {
                    console.log( `Eliminará la tarea ${ taskId }` );

                    const url = `${ location.origin }/task/${ taskId }`;

                    /** Peticion del lado del cliente */
                    axios.delete( url, { taskId } )
                        .then( response => {
                            console.log( response );

                            if( response.status === 200 ) {
                                /** Eliminamos el nodo del DOM que posee la tarea listada que se desea eliminar */
                                liElement.parentElement.removeChild( liElement );
                            }
    
                            Swal.fire(
                                'Eliminada!',
                                response.data,
                                'success'
                            );
    
                        })
                        .catch( err => {
                            console.log( err );
    
                            Swal.fire({
                                title: 'Error',
                                text: err.response.data,
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            })
                        });
                }
            });

        }

    } );
}

export default tasks;