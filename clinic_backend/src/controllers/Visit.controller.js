const Patient = require('../models/Patient');
const Visit = require('../models/Visit');

// Add a new medical visit/examination
exports.addVisit = async (req, res) => {
    try {
        const { patientId, visitType, clinicName, reasonForVisit } = req.body;

        // Validate required fields
        if (!patientId || !visitType || !clinicName || !reasonForVisit) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: patientId, visitType, clinicName, or reasonForVisit."
            });
        }

        // Check if patient exists
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Cannot add visit. Patient not found."
            });
        }

        // Create the visit (only pass patientId with small p)
        const visit = await Visit.create({
            ...req.body,
            patientId // correct field name
        });

        res.status(201).json({
            success: true,
            message: "Visit recorded successfully",
            data: visit
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Failed to record visit",
            error: error.message
        });
    }
};

// Get all visits for a specific patient
exports.getVisitsByPatient = async (req, res) => {
    try {
        const visits = await Visit.findAll({
            where: { patientId: req.params.patientId }, // small p
            order: [['visitDate', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: visits
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching visits",
            error: error.message
        });
    }
};
