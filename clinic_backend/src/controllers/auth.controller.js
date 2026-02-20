const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Clinic } = require('../models');

exports.registerOwner = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashed,
            role: 'OWNER',
            isActive: false
        });

        res.status(201).json({ message: 'Waiting for admin approval' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = await User.findOne({ where: { email }, include: [Clinic] });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.isActive) return res.status(403).json({ message: 'Account inactive' });

        if (user.Clinic && !user.Clinic.isActive)
            return res.status(403).json({ message: 'Clinic inactive' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Wrong password' });

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                clinicId: user.clinicId,
                clinicBranchId: user.clinicBranchId || null
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { password: _, ...safeUser } = user.toJSON();
        res.json({ token, user: safeUser });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};