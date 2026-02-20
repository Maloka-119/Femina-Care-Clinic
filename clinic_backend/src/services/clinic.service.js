const crypto = require('crypto');
const { User, Clinic } = require('../models');
const bcrypt = require('bcryptjs');
const { sanitizeUser } = require('./auth.service');

async function createClinic({ name, ownerEmail, ownerName, ownerPassword }) {
    const existingUser = await User.findOne({ where: { email: ownerEmail } });
    if (existingUser) throw new Error('EMAIL_EXISTS');

    const clinicId = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(ownerPassword, 10);

    const clinic = await Clinic.create({
        clinicId,
        name,
        isActive: true
    });

    const owner = await User.create({
        email: ownerEmail,
        password: hashedPassword,
        name: ownerName,
        role: 'ClinicOwner',
        isActive: false,
        status: 'APPROVED',
        clinicId: clinic.id
    });

    await clinic.update({ ownerId: owner.id });
    return {
        clinic: { id: clinic.id, clinicId: clinic.clinicId, name: clinic.name, isActive: clinic.isActive },
        owner: sanitizeUser(owner)
    };
}

async function listClinics() {
    const clinics = await Clinic.findAll({
        include: [{ association: 'Owner', attributes: ['id', 'name', 'email', 'isActive', 'role'] }],
        order: [['id', 'ASC']]
    });
    return clinics;
}

async function toggleClinicActive(clinicId, isActive) {
    const clinic = await Clinic.findByPk(clinicId);
    if (!clinic) throw new Error('CLINIC_NOT_FOUND');
    await clinic.update({ isActive: !!isActive });
    return clinic;
}

module.exports = {
    createClinic,
    listClinics,
    toggleClinicActive
};
