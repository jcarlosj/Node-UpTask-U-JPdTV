const Projects = require( '../models/Projects' );
const Tasks = require( '../models/Tasks' );

exports.addNewTask = async ( request, response, next ) => {
    const { body: { task_name }, params: { slug } } = request;

    const current_project = await Projects.findOne({
        where: {
            url: slug
        }
    });

    const result = await Tasks.create({ 
        name: task_name, 
        state: 0,
        ProjectId: current_project.id
    });

    if( ! result ) return next();

    response.redirect( `/project/${ slug }` );
}

exports.changeTaskStatus = async ( request, response ) => {
    console.log( 'Entro!' );
    const id = request.params.id;

    const task = await Tasks.findOne({
        where: {
            id
        } 
    });

    let currentState = 0;

    // Verifica si el estado es incompleto
    if( task.state == currentState )   // Estado incompleto es 0, completo es 1
        currentState = 1;

    task.state = currentState;

    const result = await task.save();      // Guarda cambios en la BD

    if( ! result ) return next();

    response.status( 200 ).send( `Task ${ id } status updated` );
}