const express = require('express');
const router = express.Router();
const accountCreator = require('../app/account-creator');

router.post('/account.updated', function(req, res, next) {
    console.log(JSON.stringify(req.body, null, 2));
    res.send();
});

module.exports = router;
