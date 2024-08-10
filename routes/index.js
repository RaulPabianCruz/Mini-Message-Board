const { Router } = require('express');
const mssgController = require('../controllers/messageController');
const router = Router();

router.get('/', mssgController.getMessages);

module.exports = router;
