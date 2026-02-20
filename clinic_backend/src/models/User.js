const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Admin مش مربوط بعيادة
        references: { model: 'Clinics', key: 'id' },
        onDelete: 'CASCADE'
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    clinicBranchId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'ClinicBranches', key: 'id' },
        onDelete: 'SET NULL'
    },

    role: {
        type: DataTypes.ENUM('ADMIN', 'OWNER', 'EMPLOYEE', 'PATIENT'),
        allowNull: false
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'Users',
    timestamps: true
});

module.exports = User;