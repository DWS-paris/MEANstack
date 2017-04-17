// Configuration du server
    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');

    var front = require('./routes/front');
    var api = require('./routes/api');

    var port = 8080;
    var app = express();

// Moteur de rendu
    app.set('views', path.join(__dirname, 'client/dist'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

// Dossier static
    app.use(express.static(path.join(__dirname, 'client/dist')));

// Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

// Définition des routes
    app.use('/', front);
    app.use('/api', api);

// Lancer le server
    app.listen(port, function(){
        console.log('Server started on port ' + port);
    });