const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        showLogo: Math.round(Math.random()) === 1 ? true : false
    })
});

module.exports = router;
