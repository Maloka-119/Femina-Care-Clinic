const express = require('express');
const router = express.Router();

// Import Controllers
const patientController = require('../controllers/Patient.controller');
const visitController = require('../controllers/Visit.controller');
const authController = require('../controllers/auth.controller');

// --- Patient Routes ---
// Get all patients (Dashboard)
router.get('/patients', patientController.getAllPatients);

// Register a new patient
router.post('/patients', patientController.createPatient);

// Get specific patient details + all visits
router.get('/patients/:id', patientController.getPatientDetails);


// مسار التسجيل: POST /api/auth/register
router.post('/register', authController.register);

// مسار تسجيل الدخول: POST /api/auth/login
router.post('/login', authController.login);
// --- Visit Routes ---
// Add a new visit to a patient
router.post('/visits', visitController.addVisit);

// Get visits for a specific patient
router.get('/visits/patient/:patientId', visitController.getVisitsByPatient);

module.exports = router;