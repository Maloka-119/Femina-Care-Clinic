const clinicService = require('../services/clinic.service');

exports.createClinic = async (req, res) => {
    try {
        const { name, ownerEmail, ownerName, ownerPassword } = req.body;
        if (!name || !ownerEmail || !ownerName || !ownerPassword) {
            return res.status(400).json({ message: 'Name, owner email, owner name and password are required' });
        }
        const result = await clinicService.createClinic({ name, ownerEmail, ownerName, ownerPassword });
        return res.status(201).json({
            message: 'Clinic created. Owner must be activated by Admin to use the system.',
            clinic: result.clinic,
            owner: result.owner
        });
    } catch (err) {
        if (err.message === 'EMAIL_EXISTS') return res.status(400).json({ message: 'Owner email already exists' });
        return res.status(500).json({ message: err.message || 'Failed to create clinic' });
    }
};

exports.listClinics = async (req, res) => {
    try {
        const clinics = await clinicService.listClinics();
        return res.json({ data: clinics });
    } catch (err) {
        return res.status(500).json({ message: err.message || 'Failed to list clinics' });
    }
};

exports.toggleClinicActive = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        const clinic = await clinicService.toggleClinicActive(Number(id), isActive);
        return res.json({ message: 'Clinic updated', data: clinic });
    } catch (err) {
        if (err.message === 'CLINIC_NOT_FOUND') return res.status(404).json({ message: 'Clinic not found' });
        return res.status(500).json({ message: err.message || 'Failed to update clinic' });
    }
};
