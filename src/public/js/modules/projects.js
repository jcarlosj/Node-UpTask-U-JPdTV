import Swal from 'sweetalert2';
import axios from 'axios';

const btnDeleteProject = document.getElementById( 'eliminar-proyecto' );

if( btnDeleteProject ) {
    btnDeleteProject.addEventListener( 'click', event => {
        const project_url = event.target.dataset.projectUrl;

        console.log( project_url );

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
                const url = `${ location.origin }/projects/${ project_url }`;

                /** Peticion del lado del cliente */
                axios.delete( url, { params: { project_url } } )
                    .then( response => {
                        console.log( response );

                        Swal.fire(
                            'Eliminado!',
                            response.data,
                            'success'
                        );
            
                        setTimeout( () => {
                            window.location.href = '/';     // Redirecciona
                        }, 3000 );

                    } );
            }
        });
    });
}

export default btnDeleteProject;