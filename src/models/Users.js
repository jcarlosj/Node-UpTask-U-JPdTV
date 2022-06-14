const { DataTypes } = require( 'sequelize' );
const bcrypt = require( 'bcrypt' );

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
        allowNull: false,    // NOT-NULL
        unique: {
            args: true,
            msg: 'User already registered'
        },
        validate: {
            notEmpty: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Enter a valid email'
            }
        }
    },
    password: {
        type: DataTypes.STRING( 60 ),
        allowNull: false,    // NOT-NULL
        validate: {
            notEmpty: {
                msg: 'Password is required'
            }
        }
    }
}, {

    hooks: {
        // Other model options go here
        beforeCreate: ( record, options ) => {
            const
                { dataValues } = record,
                { password } = dataValues;

            dataValues.password = bcrypt.hashSync( password, bcrypt.genSaltSync( 10 ) );

            // console.log( dataValues );
        }
    }
});

// ? Relación (1-N): Cada Usuario tiene muchas Poryectos (Forma 1), equivalente a la Forma 2
User.hasMany( Projects );
// ? Relación (N-1): Cada Proyecto pertenece a un Usuario (Forma 2), equivalente a la Forma 1
// Projects.belongsTo( User );

module.exports = User;