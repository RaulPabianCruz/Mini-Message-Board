const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('New route');
});

module.exports = router;