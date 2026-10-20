
const express = require('express');
const router = express.Router();

const {
    showVisits,
    showRegisterVisit,
    registerVisit
} = require('../controllers/visitControllers');

router.get('/', showVisits);
router.get('/register', showRegisterVisit);
router.post('/register', registerVisit);

module.exports = router;
