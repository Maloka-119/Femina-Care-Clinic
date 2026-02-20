const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/register-owner', controller.registerOwner);
router.post('/login', controller.login);

module.exports = router;