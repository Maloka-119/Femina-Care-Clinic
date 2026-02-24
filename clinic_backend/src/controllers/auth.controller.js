const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Clinic } = require('../models');

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

/** POST /auth/change-password - change password (old + new), session intact */
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: 'oldPassword and newPassword are required' });
        }
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(400).json({ message: 'Current password is incorrect' });
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();
        return res.json({ message: 'Password updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};