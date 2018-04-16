'use strict';
const models = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('teacher', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        maxGrade: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                teacher.belongsToMany({
                    model: models.class,
                    through: 'TeacherClass'
                });
            }
        },
        //paranoid: true,
    });
};
