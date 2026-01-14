const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. تسجيل دكتور جديد (Register)
exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // تشفير الباسورد (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({ 
            email, 
            password: hashedPassword, 
            name 
        });
        
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        res.status(400).json({ error: "Email already exists or invalid data" });
    }
};

// 2. تسجيل الدخول (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ error: "User not found" });

        // مقارنة الباسورد المدخل مع الـ Hashed Password المخزن
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });
        res.json({ token, name: user.name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};