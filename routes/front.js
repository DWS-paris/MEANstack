let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.html');
});

router.get('/courses/:link', (req, res, next) => {
    res.render('index.html');
});

module.exports = router;