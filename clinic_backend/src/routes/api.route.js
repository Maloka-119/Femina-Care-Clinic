const express = require('express');
const router = express.Router();
const { protect, isAdmin, isClinicOwner, isActiveAccount } = require('../middleware/authMiddleware');

const patientController = require('../controllers/Patient.controller');
const visitController = require('../controllers/Visit.controller');
const authController = require('../controllers/auth.controller');
const clinicController = require('../controllers/clinic.controller');
const userController = require('../controllers/user.controller');

// ----- Auth -----
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', protect, authController.me);

// ----- Admin only -----
router.post('/clinics', protect, isAdmin, clinicController.createClinic);
router.get('/clinics', protect, isAdmin, clinicController.listClinics);
router.patch('/clinics/:id/active', protect, isAdmin, clinicController.toggleClinicActive);

router.get('/users', protect, isAdmin, userController.listAll);
router.get('/users/pending', protect, isAdmin, userController.listPending);
router.patch('/users/:id/active', protect, isAdmin, userController.setActive);

// Approve/reject: Admin or active ClinicOwner (scope enforced in controller)
function canApproveOrReject(req, res, next) {
    if (req.user.role === 'Admin') return next();
    if (req.user.role === 'ClinicOwner' && req.user.isActive) return next();
    return res.status(403).json({ message: 'Not authorized to approve or reject' });
}
router.post('/users/:id/approve', protect, canApproveOrReject, userController.approve);
router.post('/users/:id/reject', protect, canApproveOrReject, userController.reject);

// ClinicOwner: list users of their clinic
router.get('/clinics/:clinicId/users', protect, isClinicOwner, isActiveAccount, userController.listByClinic);

// ----- Protected: Patients & Visits (any authenticated user) -----
router.get('/patients', protect, patientController.getAllPatients);
router.post('/patients', protect, patientController.createPatient);
router.get('/patients/:id', protect, patientController.getPatientDetails);
router.post('/visits', protect, visitController.addVisit);
router.get('/visits/patient/:patientId', protect, visitController.getVisitsByPatient);

module.exports = router;