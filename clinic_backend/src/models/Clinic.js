const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Clinic = sequelize.define('Clinic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM('GYNECOLOGY', 'GENERAL'),
        allowNull: false
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: 'Clinics',
    timestamps: true
});

module.exports = Clinic;