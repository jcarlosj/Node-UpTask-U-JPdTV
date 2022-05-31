const { DataTypes } = require( 'sequelize' );

const db = require( '../config/sequelize' );

const Project = db.define( 'Projects', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        // Other model options go here
    });
    
// `sequelize.define` also returns the model
console.log( Project === db.models.Project ); // true

module.exports = Project;