'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rut: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        startYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ranking: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        schoolRanking: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                student.belongsToMany({
                    model: models.class,
                    through: 'StudentsClass'
                });
                student.belongsToMany({
                    model: models.payment,
                    through: 'StudentsPayments'
                });
            }
        },
        //paranoid: true,
    });
};
