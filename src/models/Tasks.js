const { DataTypes } = require( 'sequelize' );

const db = require( '../config/sequelize' );

const Projects = require( './Projects' );

const Task = db.define( 'Tasks', {
    // Estructura de la entidad o modelo en la base de datos
    id: {
        type: DataTypes.INTEGER( 1 ),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING( 100 ),
        allowNull: true,
    },
    state: DataTypes.BOOLEAN
});
// ? Relación (1-N): Cada Proyecto tiene muchas tareas (Forma 1), equivalente a la Forma 2 (Debe ir en en modelo de Proyectos)
// Projects.hasMany( Task );
// ? Relación (N-1): Cada tarea pertenece a un proyecto (Forma 2), equivalente a la Forma 1
Task.belongsTo( Projects );     

// `sequelize.define` also returns the model
console.log( Task === db.models.Task ); // true

module.exports = Task;