const { Patient, HusbandInfo, DeliveryHistory } = require('../models');

/** POST /clinic/patients - create patient (clinicId in body or from user) */
exports.createPatient = async (req, res) => {
    try {
        const { name, age, gender, contactInfo, clinicId } = req.body;
        const cId = clinicId || req.user?.clinicId;
        if (!name || !cId) return res.status(400).json({ message: 'name and clinicId are required' });
        const patient = await Patient.create({ name, age: age || null, gender: gender || null, contactInfo: contactInfo || null, clinicId: cId });
        if (req.body.husband) {
            await HusbandInfo.create({ ...req.body.husband, patientId: patient.id });
        }
        if (req.body.deliveries && req.body.deliveries.length > 0) {
            for (const d of req.body.deliveries) {
                await DeliveryHistory.create({ ...d, patientId: patient.id });
            }
        }
        return res.status(201).json(patient);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** GET /clinic/patients/:clinicId - list patients for a clinic */
exports.listByClinic = async (req, res) => {
    try {
        const { clinicId } = req.params;
        const patients = await Patient.findAll({
            where: { clinicId },
            include: [HusbandInfo, DeliveryHistory],
            order: [['id', 'DESC']]
        });
        return res.json(patients);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** GET /clinic/patients/detail/:id - get one patient */
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id, { include: [HusbandInfo, DeliveryHistory] });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        return res.json(patient);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** PUT /clinic/patients/:id - update patient */
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        const { name, age, gender, contactInfo } = req.body;
        if (name !== undefined) patient.name = name;
        if (age !== undefined) patient.age = age;
        if (gender !== undefined) patient.gender = gender;
        if (contactInfo !== undefined) patient.contactInfo = contactInfo;
        await patient.save();
        return res.json(patient);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/** DELETE /clinic/patients/:id */
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const n = await Patient.destroy({ where: { id } });
        if (n === 0) return res.status(404).json({ message: 'Patient not found' });
        return res.json({ message: 'Patient deleted' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
