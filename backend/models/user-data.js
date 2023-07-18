const sequelize = require('../utils/database-connect');
const Sequilize = require('sequelize');

const expenseApp = sequelize.define('expense-app', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequilize.STRING,
    email: Sequilize.STRING,
    password: Sequilize.STRING,
});

module.exports = expenseApp;