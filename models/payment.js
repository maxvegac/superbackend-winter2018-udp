'use strict';

module.exports = (sequelize, DataTypes) => {
    let payment = sequelize.define('payment', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationDate: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return payment;
};
