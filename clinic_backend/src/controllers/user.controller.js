const userService = require('../services/user.service');

exports.listPending = async (req, res) => {
    try {
        const users = await userService.listPendingUsers();
        return res.json({ data: users });
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to list pending users' });
    }
};

exports.listByClinic = async (req, res) => {
    try {
        const clinicId = Number(req.params.clinicId);
        if (req.user.role === 'ClinicOwner' && req.user.clinicId !== clinicId) {
            return res.status(403).json({ message: 'You can only view users of your clinic' });
        }
        const users = await userService.listUsersByClinic(clinicId);
        return res.json({ data: users });
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to list users' });
    }
};

exports.listAll = async (req, res) => {
    try {
        const users = await userService.listAllUsersForAdmin();
        return res.json({ data: users });
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to list users' });
    }
};

exports.approve = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.approveUser(userId, req.user);
        return res.json({ message: 'User approved', data: user });
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND') return res.status(404).json({ message: 'User not found' });
        if (err.message === 'ALREADY_PROCESSED') return res.status(400).json({ message: 'Request already processed' });
        if (err.message === 'FORBIDDEN_CLINIC') return res.status(403).json({ message: 'You can only approve users of your clinic' });
        return res.status(500).json({ message: err.message || 'Failed to approve' });
    }
};

exports.reject = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const user = await userService.rejectUser(userId, req.user);
        return res.json({ message: 'User rejected', data: user });
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND') return res.status(404).json({ message: 'User not found' });
        if (err.message === 'ALREADY_PROCESSED') return res.status(400).json({ message: 'Request already processed' });
        if (err.message === 'FORBIDDEN_CLINIC') return res.status(403).json({ message: 'You can only reject users of your clinic' });
        return res.status(500).json({ message: err.message || 'Failed to reject' });
    }
};

exports.setActive = async (req, res) => {
    try {
        const userId = Number(req.params.id);
        const { isActive } = req.body;
        const user = await userService.setUserActive(userId, isActive);
        return res.json({ message: 'User activation updated', data: user });
    } catch (err) {
        if (err.message === 'USER_NOT_FOUND') return res.status(404).json({ message: 'User not found' });
        return res.status(500).json({ message: err.message || 'Failed to update' });
    }
};
