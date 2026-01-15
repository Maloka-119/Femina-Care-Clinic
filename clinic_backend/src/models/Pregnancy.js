const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./Patient');

const Pregnancy = sequelize.define('Pregnancy', {
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deliveryDate: { type: DataTypes.DATE, allowNull: false },
    gestationalWeeks: { type: DataTypes.INTEGER },
    birthWeight: { type: DataTypes.FLOAT },
    birthType: { type: DataTypes.ENUM('Normal', 'C-Section', 'Other'), allowNull: false },
    notes: { type: DataTypes.TEXT }
});

Pregnancy.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Pregnancy, { foreignKey: 'patientId' });

module.exports = Pregnancy;
