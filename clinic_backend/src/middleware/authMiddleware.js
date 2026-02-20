const jwt = require('jsonwebtoken');
const { User, Clinic } = require('../models');
const { getJwtSecret } = require('../services/auth.service');

function getToken(req) {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
    return null;
}

async function protect(req, res, next) {
    try {
        const token = getToken(req);
        if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

        const decoded = jwt.verify(token, getJwtSecret());
        const user = await User.findByPk(decoded.id, {
            include: [{ association: 'Clinic', required: false }]
        });
        if (!user) return res.status(401).json({ message: 'Not authorized, user not found' });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'Admin') return next();
    return res.status(403).json({ message: 'Not authorized as admin' });
}

function isClinicOwner(req, res, next) {
    if (req.user && req.user.role === 'ClinicOwner') return next();
    return res.status(403).json({ message: 'Not authorized as clinic owner' });
}

function isActiveAccount(req, res, next) {
    if (req.user && req.user.isActive) return next();
    return res.status(403).json({ message: 'Account is inactive' });
}

module.exports = {
    protect,
    isAdmin,
    isClinicOwner,
    isActiveAccount,
    getToken
};
