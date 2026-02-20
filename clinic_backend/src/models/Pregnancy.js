const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Delivery Model
 * Tracks pregnancy and delivery history for patients
 * One patient can have multiple deliveries
 */
const Delivery = sequelize.define('Delivery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Reference to patient
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Patients', key: 'id' },
        onDelete: 'CASCADE'
    },
    // Delivery information
    deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gestationalWeeks: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: { min: 0, max: 42 }
    },
    // Type of delivery
    deliveryType: {
        type: DataTypes.ENUM('Normal', 'C-Section', 'Assisted', 'Other'),
        allowNull: false
    },
    // Baby information
    babyGender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: true
    },
    birthWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Weight in kg'
    },
    birthLength: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Length in cm'
    },
    // Complications during delivery
    complications: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Any complications during delivery'
    },
    // Post-delivery notes
    postDeliveryNotes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // General notes
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Deliveries',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['patientId'] }]
});

module.exports = Delivery;
