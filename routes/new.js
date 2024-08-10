const { Router } = require('express');
const mssgController = require('../controllers/messageController')
const router = Router();

router.get('/', (req, res) => {
    res.render('form', {});
});

router.post('/', mssgController.postNewMssg);

module.exports = router;