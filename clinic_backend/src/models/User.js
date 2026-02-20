const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Roles: 'Admin', 'ClinicOwner', 'Doctor'
    role: {
        type: DataTypes.ENUM('Admin', 'ClinicOwner', 'Doctor'),
        defaultValue: 'Doctor',
        allowNull: false
    },
    // Only Admin and ClinicOwner can activate/deactivate users
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Pending'),
        defaultValue: 'Pending',
        allowNull: false,
        comment: 'User must be Active to login'
    },
    // Clinic association
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Clinics', key: 'id' },
        comment: 'Required for Doctor and ClinicOwner roles'
    },
    // Phone number for doctor
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Specialty for doctors
    specialty: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'e.g., Gynecology, Obstetrics'
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Users',
    timestamps: true,
    underscored: true
});

module.exports = User;