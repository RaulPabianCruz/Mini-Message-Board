const { Router } = require('express');
const mssgController = require('../controllers/messageController');
const router = Router();

router.get('/', mssgController.getMessages);
router.get('/:mssgId', mssgController.getMessageById);

module.exports = router;
