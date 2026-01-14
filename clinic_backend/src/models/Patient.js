const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
    phone: { type: DataTypes.STRING },
    maritalStatus: { 
        type: DataTypes.ENUM('Madam', 'Miss'), 
        defaultValue: 'Madam' 
    },
    bloodType: { 
        type: DataTypes.ENUM('A', 'B', 'AB', 'O') 
    },
    rhFactor: { 
        type: DataTypes.ENUM('+', '-') 
    },
    clinicLocation: { 
        type: DataTypes.ENUM('Al Sayeda Zainab', 'Giza'),
        allowNull: false
    },
    husbandName: { type: DataTypes.STRING },
    husbandJob: { type: DataTypes.STRING },
    marriageDate: { type: DataTypes.DATEONLY }, // تاريخ الزواج للحساب
    reasonForVisit: { 
        type: DataTypes.ENUM('Antinatal', 'Postnatal', 'Virgin', 'Other'),
        allowNull: false
    },
    // الأمراض المزمنة - سنستخدم مصفوفة أو نص طويل مع الاختيارات
    chronicDiseases: { 
        type: DataTypes.TEXT, 
        comment: 'Diabetes, Hypertension, Heart Disease, Asthma, etc.' 
    },
    familyHistory: { type: DataTypes.TEXT },
    otherNotes: { type: DataTypes.TEXT },
    
    // حقل وهمي (Virtual) لحساب عدد سنوات الزواج
    yearsOfMarriage: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.marriageDate) {
                const diffMs = Date.now() - new Date(this.marriageDate).getTime();
                const diffDate = new Date(diffMs);
                return Math.abs(diffDate.getUTCFullYear() - 1970);
            }
            return 0;
        }
    }
});

module.exports = Patient;