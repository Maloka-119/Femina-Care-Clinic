const express = require('express');
const router = express.Router();

// Controllers
const patientController = require('../controllers/Patient.controller');
const visitController = require('../controllers/Visit.controller');
const authController = require('../controllers/auth.controller');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Patient Routes
router.get('/patients', patientController.getAllPatients);
router.post('/patients', patientController.createPatient);
router.get('/patients/:id', patientController.getPatientDetails);

// Visit Routes
router.post('/visits', visitController.addVisit);
router.get('/visits/patient/:patientId', visitController.getVisitsByPatient);

module.exports = router;
