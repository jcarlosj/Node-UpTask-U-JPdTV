import Swal from 'sweetalert2';
import axios from 'axios';

const btnDeleteProject = document.getElementById( 'eliminar-proyecto' );

if( btnDeleteProject ) {
    btnDeleteProject.addEventListener( 'click', () => {
        console.log( 'Elimina proyecto' );

        Swal.fire({
            title: '¿Deseas eliminar este proyecto?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!',
            cancelButtonText: 'Cancelar'
        })
        .then( ( result ) => {
            if ( result.isConfirmed ) {
                Swal.fire(
                    'Eliminado!',
                    'Tú proyecto se ha eliminado.',
                    'success'
                );
    
                setTimeout( () => {
                    window.location.href = '/';     // Redirecciona
                }, 3000 );
            }
        });
    });
}