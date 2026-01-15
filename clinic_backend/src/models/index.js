const sequelize = require('../config/database');

// Import Models
const User = require('./User');
const Patient = require('./Patient');
const Visit = require('./Visit');

// Associations
Patient.hasMany(Visit, { foreignKey: 'patientId', as: 'Visits' });
Visit.belongsTo(Patient, { foreignKey: 'patientId', as: 'Patient' });

// Export everything
module.exports = {
    sequelize,
    User,
    Patient,
    Visit
};
