'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};
