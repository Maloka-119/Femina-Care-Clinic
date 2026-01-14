const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    // تم التغيير إلى Email ليكون فريداً وإلزامياً
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
        validate: {
            isEmail: true // للتأكد من صحة صيغة الإيميل قبل الحفظ
        }
    },
    // هذا الحقل سيخزن كلمة المرور بعد تشفيرها (Hashed Password)
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    // اسم الدكتور فقط
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;