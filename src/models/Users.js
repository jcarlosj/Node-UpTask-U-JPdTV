const { DataTypes } = require( 'sequelize' );

const db = require( '../config/sequelize' );

const Projects = require( './Projects' );

const User = db.define( 'Users', {
    // Estructura de la entidad o modelo en la base de datos
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING( 60 ),
        allowNull: false    // NOT-NULL
    },
    password: {
        type: DataTypes.STRING( 60 ),
        allowNull: false    // NOT-NULL
    }
});

// ? Relación (1-N): Cada Usuario tiene muchas Poryectos (Forma 1), equivalente a la Forma 2
User.hasMany( Projects );
// ? Relación (N-1): Cada Proyecto pertenece a un Usuario (Forma 2), equivalente a la Forma 1
// Projects.belongsTo( User );

module.exports = User;