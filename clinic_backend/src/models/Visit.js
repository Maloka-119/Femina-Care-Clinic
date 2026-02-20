const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Visit = sequelize.define('Visit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Patients', key: 'id' },
        onDelete: 'CASCADE'
    },
    clinicBranchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'ClinicBranches', key: 'id' },
        onDelete: 'CASCADE'
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Visits',
    timestamps: true
});

module.exports = Visit;
