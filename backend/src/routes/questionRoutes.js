const express = require('express');
const router = express.Router();
const questionControllers = require('../controllers/questionControllers');

router.post('/create', questionControllers.addQuestion);
router.post('/submit', questionControllers.submitResponse);
router.get('/:id', questionControllers.getAnswerById);

module.exports = router;
