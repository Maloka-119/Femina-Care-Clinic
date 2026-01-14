const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Visit = sequelize.define('Visit', {
// 1. Basic Visit Data
visitType: { type: DataTypes.ENUM('Examination', 'Consultation'),
allowNull: false
},
clinicName: { type: DataTypes.STRING },
visitDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

// 2. Detection Issue (Tumor and Bleeding Options Added)
reasonForVisit: { type: DataTypes.ENUM(
'Antinatal',
'Postnatal',
'Virgin',
'Other',
'Tumor', // Tumor Presence
'Bleeding' // Bleeding Presence
),
allowNull: false
},

// 3. Biometrics
weight: { type: DataTypes.FLOAT }, // Maternal Weight

bloodPressure: { type: DataTypes.STRING }, // Blood Pressure

bloodSugar: { type: DataTypes.STRING }, // Blood Sugar Measurement

// 4. In the case of pregnancy (Antinatal)

gestationalWeek: {
type: DataTypes.INTEGER,

comment: 'Week of pregnancy'

},

fetalWeight: {
type: DataTypes.FLOAT,

comment: 'Fetal weight'

},

fetalSize: {
type: DataTypes.STRING,

comment: 'Fetal size'

},

// 5. Medical Details and Results

requiredTests: {
type: DataTypes.TEXT,

comment: 'Required tests'

},

prescribedMedications: {
type: DataTypes.TEXT,

comment: 'Required medications'

},
notes: {
type: DataTypes.TEXT,
comment: 'Disclosure Notes'
},
otherObservations: {
type: DataTypes.TEXT,
comment: 'Other Notes'
}
});

module.exports = Visit;