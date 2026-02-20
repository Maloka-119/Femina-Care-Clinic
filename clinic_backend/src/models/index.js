const sequelize = require('../config/database');

const User = require('./User');
const Clinic = require('./Clinic');
const Patient = require('./Patient');
const HusbandInfo = require('./HusbandInfo');
const Visit = require('./Visit');
const Delivery = require('./Pregnancy');

/**
 * MODEL ASSOCIATIONS
 * Defining relationships between models
 */

// ========== CLINIC ASSOCIATIONS ==========
// Clinic -> Owner (ClinicOwner user)
Clinic.belongsTo(User, {
    foreignKey: 'ownerId',
    as: 'owner',
    constraints: false
});

// User -> Owned Clinics (for ClinicOwner)
User.hasMany(Clinic, {
    foreignKey: 'ownerId',
    as: 'ownedClinics'
});

// ========== USER - CLINIC ASSOCIATIONS ==========
// User (Doctor) -> Clinic
User.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    as: 'clinic',
    constraints: false
});

// Clinic -> Users (Staff/Doctors)
Clinic.hasMany(User, {
    foreignKey: 'clinicId',
    as: 'staff'
});

// ========== PATIENT ASSOCIATIONS ==========
// Patient -> Clinic
Patient.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    as: 'clinic'
});

// Clinic -> Patients
Clinic.hasMany(Patient, {
    foreignKey: 'clinicId',
    as: 'patients'
});

// Patient -> Doctor (who registered patient)
Patient.belongsTo(User, {
    foreignKey: 'doctorId',
    as: 'doctor'
});

// User (Doctor) -> Patients (managed by this doctor)
User.hasMany(Patient, {
    foreignKey: 'doctorId',
    as: 'patientsManaged'
});

// ========== HUSBAND INFO ASSOCIATIONS ==========
// HusbandInfo -> Patient (One-to-One)
HusbandInfo.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient'
});

// Patient -> HusbandInfo (One-to-One)
Patient.hasOne(HusbandInfo, {
    foreignKey: 'patientId',
    as: 'husbandInfo'
});

// ========== VISIT ASSOCIATIONS ==========
// Visit -> Patient
Visit.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient'
});

// Patient -> Visits
Patient.hasMany(Visit, {
    foreignKey: 'patientId',
    as: 'visits'
});

// Visit -> Doctor
Visit.belongsTo(User, {
    foreignKey: 'doctorId',
    as: 'doctor'
});

// User (Doctor) -> Visits (conducted by this doctor)
User.hasMany(Visit, {
    foreignKey: 'doctorId',
    as: 'visitsRecorded'
});

// Visit -> Clinic
Visit.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    as: 'clinic'
});

// ========== DELIVERY ASSOCIATIONS ==========
// Delivery -> Patient
Delivery.belongsTo(Patient, {
    foreignKey: 'patientId',
    as: 'patient'
});

// Patient -> Deliveries
Patient.hasMany(Delivery, {
    foreignKey: 'patientId',
    as: 'deliveries'
});

module.exports = {
    sequelize,
    User,
    Clinic,
    Patient,
    HusbandInfo,
    Visit,
    Delivery
};
