const { Sequelize } = require( 'sequelize' );

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize( 'uptask', 'user_uptask', 'pass_uptask', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;