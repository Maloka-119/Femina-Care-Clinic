const { Clinic, User, ClinicBranch } = require('../models');
const bcrypt = require('bcrypt');

/** POST /clinic/clinics - create clinic with owner */
exports.createClinic = async (req, res) => {
    try {
        const { name, type, ownerName, ownerEmail, ownerPassword } = req.body;
        if (!name || !type || !ownerEmail || !ownerPassword) {
            return res.status(400).json({ message: 'name, type, ownerEmail and ownerPassword are required' });
        }
        const existing = await User.findOne({ where: { email: ownerEmail } });
        if (existing) return res.status(400).json({ message: 'Owner email already exists' });

        const clinic = await Clinic.create({ name, type, isActive: true });
        const hashed = await bcrypt.hash(ownerPassword, 10);
        await User.create({
            name: ownerName || 'Clinic Owner',
            email: ownerEmail,
            password: hashed,
            role: 'OWNER',
            clinicId: clinic.id,
            isActive: false
        });
        return res.status(201).json({ message: 'Clinic created. Owner pending activation.', clinic: { id: clinic.id, name: clinic.name, type: clinic.type } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** GET /clinic/clinics - list all clinics */
exports.listClinics = async (req, res) => {
    try {
        const clinics = await Clinic.findAll({
            order: [['id', 'ASC']]
        });
        return res.json(clinics);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** PATCH /clinic/clinics/:id/toggle - activate/deactivate clinic */
exports.toggleClinic = async (req, res) => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id);
        if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
        clinic.isActive = !clinic.isActive;
        await clinic.save();
        return res.json({ message: clinic.isActive ? 'Clinic activated' : 'Clinic deactivated', clinic });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
