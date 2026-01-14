const Patient= require('../models/Patient');
const Visit= require('../models/Visit');

// Add a new medical visit/examination
exports.addVisit = async (req, res) => {
    try {
        const { patientId } = req.body;

        // Check if patient exists first
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Cannot add visit. Patient not found."
            });
        }

        const visit = await Visit.create({
            ...req.body,
            PatientId: patientId
        });

        res.status(201).json({
            success: true,
            message: "Visit recorded successfully",
            data: visit
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to record visit",
            error: error.message
        });
    }
};

// Get all visits for a specific patient (Optional helper)
exports.getVisitsByPatient = async (req, res) => {
    try {
        const visits = await Visit.findAll({
            where: { PatientId: req.params.patientId },
            order: [['visitDate', 'DESC']]
        });
        res.status(200).json({
            success: true,
            data: visits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching visits",
            error: error.message
        });
    }
};