'use strict';

module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rut: {
                type: DataTypes.STRING,
                allowNull: false,
                isEmail: true,
                unique: true
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
        }
        //paranoid: true,
    );
    student.associate = (models) => {
        student.belongsToMany(models.class, {
            through: 'StudentClass',
            as: 'classes',
            unique: true
        });
        student.belongsToMany(models.payment, {
            through: 'StudentPayment',
            as: 'payments'
        })
    };

    return student;
};
