const sequelize = require('../utils/database-connect');
const Sequilize = require('sequelize');

const bookingApp = sequelize.define('bookingApp', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequilize.STRING,
    email: Sequilize.STRING,
    phone: Sequilize.STRING
});

module.exports = bookingApp;