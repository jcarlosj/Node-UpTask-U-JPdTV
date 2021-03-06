const { DataTypes } = require( 'sequelize' );
const slug = require( 'slug' );
const shortid = require( 'shortid' );

const db = require( '../config/sequelize' );

const Project = db.define( 'Projects', {
        // Estructura de la entidad o modelo en la base de datos
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
        hooks: {
            beforeCreate: ( record, options ) => {
                const
                    { dataValues } = record,
                    { name } = dataValues;

                const url = slug( name ).toLowerCase();         // * Genera slug (url)
                
                dataValues[ 'url' ] = `${ url }-${ shortid.generate() }`;
            }
            // NOTA: Se podria usar beforeUpdate() para actualizar la URL, sin embargo no es una practica recomendada en SEM, SEO
        }
    });
    
// `sequelize.define` also returns the model
console.log( Project === db.models.Project ); // true

module.exports = Project;