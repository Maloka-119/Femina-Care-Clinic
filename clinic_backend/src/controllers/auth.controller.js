const authService = require('../services/auth.service');

exports.me = async (req, res) => {
    try {
        const user = authService.sanitizeUser(req.user);
        return res.json({ user });
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to get user' });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, clinicId } = req.body;
        if (!name || !email || !password || !clinicId) {
            return res.status(400).json({ message: 'Name, email, password and clinic ID are required' });
        }
        const user = await authService.register({ name, email, password, clinicId });
        return res.status(201).json({
            message: 'Registration request submitted. Pending approval.',
            user: { id: user.id, name: user.name, email: user.email, status: user.status }
        });
    } catch (err) {
        if (err.message === 'EMAIL_EXISTS') return res.status(400).json({ message: 'Email already exists' });
        if (err.message === 'CLINIC_NOT_FOUND') return res.status(400).json({ message: 'Invalid or inactive clinic ID' });
        return res.status(500).json({ message: err.message || 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const result = await authService.login({ email, password });
        return res.json({
            token: result.token,
            user: result.user,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role
        });
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND' || err.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        if (err.message === 'ACCOUNT_INACTIVE') {
            return res.status(403).json({ message: 'Account is inactive. Contact administrator.' });
        }
        if (err.message === 'PENDING_APPROVAL') {
            return res.status(403).json({ message: 'Your registration is pending approval.' });
        }
        if (err.message === 'CLINIC_ACCESS_SUSPENDED') {
            return res.status(403).json({ message: 'Clinic access is suspended. Contact your clinic owner.' });
        }
        return res.status(500).json({ message: err.message || 'Login failed' });
    }
};
