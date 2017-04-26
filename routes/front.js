// Configuration du module
    let express = require('express');
    let router = express.Router();




/*
Configuration de la route pour principale => get
*/
    router.get('/', (req, res, next) => {
        res.render('index.html');
    });




// Exporter le module
    module.exports = router; 