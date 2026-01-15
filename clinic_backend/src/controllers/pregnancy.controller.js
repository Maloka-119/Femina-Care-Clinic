const Pregnancy = require('../models/Pregnancy');
const Patient = require('../models/Patient');

// Add new pregnancy / birth
exports.addPregnancy = async (req, res) => {
    try {
        const { patientId, deliveryDate, gestationalWeeks, birthWeight, birthType, notes } = req.body;

        const patient = await Patient.findByPk(patientId);
        if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

        const pregnancy = await Pregnancy.create({
            patientId,
            deliveryDate,
            gestationalWeeks,
            birthWeight,
            birthType,
            notes
        });

        res.status(201).json({ success: true, data: pregnancy });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all pregnancies for a patient
exports.getPregnanciesByPatient = async (req, res) => {
    try {
        const pregnancies = await Pregnancy.findAll({
            where: { patientId: req.params.patientId },
            order: [['deliveryDate', 'DESC']]
        });
        res.status(200).json({ success: true, data: pregnancies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update pregnancy
exports.updatePregnancy = async (req, res) => {
    try {
        const pregnancy = await Pregnancy.findByPk(req.params.id);
        if (!pregnancy) return res.status(404).json({ success: false, message: "Pregnancy not found" });

        await pregnancy.update(req.body);
        res.status(200).json({ success: true, data: pregnancy });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete pregnancy
exports.deletePregnancy = async (req, res) => {
    try {
        const pregnancy = await Pregnancy.findByPk(req.params.id);
        if (!pregnancy) return res.status(404).json({ success: false, message: "Pregnancy not found" });

        await pregnancy.destroy();
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
