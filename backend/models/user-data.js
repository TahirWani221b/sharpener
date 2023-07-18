const sequelize = require('../utils/database-connect');
const Sequilize = require('sequelize');

const expenseApp = sequelize.define('users', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequilize.STRING,
    email: {
        type: Sequilize.STRING,
        allowNull: false,
        unique: true,
    },
    password: Sequilize.STRING,
});

module.exports = expenseApp;