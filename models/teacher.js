'use strict';

module.exports = (sequelize, DataTypes) => {
    let teacher = sequelize.define('teacher', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rut: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        //paranoid: true,
    });
    teacher.associate = (models) => {
        teacher.belongsToMany(models.class, {
            through: 'TeacherClass',
            as: 'classes',
            unique: true,
        });
    };
    return teacher;
};
