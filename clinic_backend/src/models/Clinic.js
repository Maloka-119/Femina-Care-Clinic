const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Clinic = sequelize.define('Clinic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Unique clinic identifier (UUID) - shown to user during registration
    clinicId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true,
        defaultValue: () => uuidv4(),
        comment: 'Public clinic ID for user registration'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // Owner user ID (ClinicOwner role)
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL'
    },
    // Clinic location/address
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Phone contact
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Status
    status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        defaultValue: 'Active',
        allowNull: false
    }
}, {
    tableName: 'Clinics',
    timestamps: true,
    underscored: true,
    indexes: [
        { unique: true, fields: ['clinicId'] },
        { fields: ['ownerId'] }
    ]
});

module.exports = Clinic;
