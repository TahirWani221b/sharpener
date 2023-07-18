const Sequilize = require('sequelize');
const sequelize = new Sequilize('expense-tracker', 'root', '1256', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;