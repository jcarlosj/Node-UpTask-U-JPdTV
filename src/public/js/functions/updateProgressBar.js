import Swal from 'sweetalert2';

export const updateProgressBar = () => {
    // * Seleccionamos todas las Tareas
    const tasks = document.querySelectorAll( 'li.tarea' );

    if( tasks.length ) {
        const
            completedTasks = document.querySelectorAll( 'span.icon-complete' ),
            advanceBar = Math.round( ( completedTasks.length / tasks.length ) * 100 ),
            porcentage = document.querySelector( '#porcentaje' );

        porcentage.style.width = advanceBar + '%';

        if( advanceBar == 100 ) {
            Swal.fire(
                'Proyecto finalizado!',
                'Todas las tareas han sido completadas',
                'success'
            );
        }
    }
}