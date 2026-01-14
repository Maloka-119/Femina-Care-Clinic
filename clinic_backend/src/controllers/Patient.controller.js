const Patient= require('../models/Patient');
const Visit= require('../models/Visit');

// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to register patient",
            error: error.message
        });
    }
};

// Get all patients for the Dashboard
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching patients",
            error: error.message
        });
    }
};

// Get detailed patient profile with all their visits
exports.getPatientDetails = async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id, {
            include: [{
                model: Visit,
                as: 'Visits'
            }]
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            data: patient
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching patient details",
            error: error.message
        });
    }
};