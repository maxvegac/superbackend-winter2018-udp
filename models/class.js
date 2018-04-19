'use strict';

module.exports = (sequelize, DataTypes) => {
    let classX = sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
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
    }, {
        // Creo indice único para code y section. Esta es la manera de definir índices únicos para dos columnas
        indexes: [{
            fields: ['code', 'section'],
            unique: true
        }]
    });
    classX.associate = (models) => {
        classX.belongsToMany(models.teacher, {
            through: 'TeacherClass',
            as: 'teachers',
            unique: true,
        });
        classX.belongsToMany(models.student, {
            through: 'StudentClass',
            as: 'students',
            unique: true
        });
    };
    return classX;
};
