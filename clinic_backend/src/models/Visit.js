const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Visit = sequelize.define('Visit', {
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    visitType: { type: DataTypes.ENUM('Examination', 'Consultation'), allowNull: false },
    clinicName: { type: DataTypes.STRING },
    visitDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    reasonForVisit: { type: DataTypes.ENUM('Antinatal','Postnatal','Virgin','Other','Tumor','Bleeding'), allowNull: false },
    weight: { type: DataTypes.FLOAT },
    bloodPressure: { type: DataTypes.STRING },
    bloodSugar: { type: DataTypes.STRING },
    gestationalWeek: { type: DataTypes.INTEGER },
    fetalWeight: { type: DataTypes.FLOAT },
    fetalSize: { type: DataTypes.STRING },
    requiredTests: { type: DataTypes.TEXT },
    prescribedMedications: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT },
    otherObservations: { type: DataTypes.TEXT }
});

module.exports = Visit;
