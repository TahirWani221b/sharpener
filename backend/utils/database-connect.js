const Sequilize = require('sequelize');
const sequelize = new Sequilize('booking-appointment', 'root', '1256', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;