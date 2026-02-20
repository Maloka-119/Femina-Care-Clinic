const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Visit Model
 * Tracks each visit/consultation for a patient
 */
const Visit = sequelize.define('Visit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // References
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Patients', key: 'id' },
        onDelete: 'CASCADE'
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'RESTRICT'
    },
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Clinics', key: 'id' },
        onDelete: 'CASCADE'
    },
    // Visit details
    visitDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    visitType: {
        type: DataTypes.ENUM('Examination', 'Consultation', 'Follow-up'),
        allowNull: false
    },
    reasonForVisit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Vital signs
    weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Weight in kg'
    },
    bloodPressure: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Format: systolic/diastolic'
    },
    bloodSugar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Temperature in Celsius'
    },
    // Pregnancy related (if applicable)
    gestationalWeek: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fetalWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: 'Estimated fetal weight in grams'
    },
    fetalHeartRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Fetal heart rate in bpm'
    },
    // Clinical findings
    clinicalFindings: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Treatment plan
    requiredTests: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Tests to be done'
    },
    prescribedMedications: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Medications prescribed'
    },
    // Follow-up
    followUpDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    followUpNotes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // General notes
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Visits',
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ['patientId'] },
        { fields: ['doctorId'] },
        { fields: ['clinicId'] },
        { fields: ['patientId', 'clinicId'] }
    ]
});

module.exports = Visit;
