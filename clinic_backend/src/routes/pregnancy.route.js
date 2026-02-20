const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const pregnancyController = require('../controllers/pregnancy.controller');

router.post('/', protect, pregnancyController.addPregnancy);
router.get('/:patientId', protect, pregnancyController.getPregnanciesByPatient);
router.put('/:id', protect, pregnancyController.updatePregnancy);
router.delete('/:id', protect, pregnancyController.deletePregnancy);

module.exports = router;
