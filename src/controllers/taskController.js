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

exports.changeTaskStatus = ( request, response ) => {
    const taskId = request.params.id;

    response.send( `Change status of task ${ taskId }` );
}