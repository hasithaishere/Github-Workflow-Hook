const express = require('express');
const githubController =  require('../controllers/github');

const router = express.Router();

router.post('/webhook', githubController.handleWebhook);

module.exports = router;