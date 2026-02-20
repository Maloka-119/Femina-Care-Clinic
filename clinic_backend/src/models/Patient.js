const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Clinic reference - CRITICAL for multi-tenancy
    clinicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Clinics', key: 'id' },
        onDelete: 'CASCADE'
    },
    // Doctor who registered the patient
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'RESTRICT'
    },
    // Patient basic info
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // Marital status - determines which fields are required
    maritalStatus: {
        type: DataTypes.ENUM('Single', 'Married'),
        allowNull: false
    },
    // Blood type and RH factor
    bloodType: {
        type: DataTypes.ENUM('A', 'B', 'AB', 'O'),
        allowNull: true
    },
    rhFactor: {
        type: DataTypes.ENUM('+', '-'),
        allowNull: true
    },
    // Reason for visit - conditional based on marital status
    reasonForVisit: {
        type: DataTypes.STRING, // Will be enum values based on marital status
        allowNull: false,
        comment: 'Single: Tumor, Bleeding, Hormonal issues, Other gynecological | Married: Infertility, Tumor, Bleeding, Pregnancy follow-up, Other'
    },
    // Chronic diseases
    chronicDiseases: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Comma-separated: Diabetes, Hypertension, Heart Disease, Asthma, etc.'
    },
    // Family medical history
    familyHistory: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // General notes
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    // Registration date
    registeredAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Patients',
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ['clinicId'] },
        { fields: ['doctorId'] },
        { fields: ['clinicId', 'doctorId'] }
    ]
});

module.exports = Patient;