'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('payment', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};
