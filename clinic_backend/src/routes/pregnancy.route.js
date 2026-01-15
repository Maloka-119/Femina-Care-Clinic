const express = require('express');
const router = express.Router();
const pregnancyController = require('../controllers/pregnancy.controller');

router.post('/', pregnancyController.addPregnancy);
router.get('/:patientId', pregnancyController.getPregnanciesByPatient);
router.put('/:id', pregnancyController.updatePregnancy);
router.delete('/:id', pregnancyController.deletePregnancy);

module.exports = router;
