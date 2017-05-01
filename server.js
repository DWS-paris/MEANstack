// Configuration du server
    let express = require('express');
    let path = require('path');
    let bodyParser = require('body-parser');

    let front = require('./routes/front');
    let api = require('./routes/api');

    let port = 8080;
    let app = express();


// Dossier statique de la partie front
    app.set('views', path.join(__dirname, 'www'));
    app.use(express.static(path.join(__dirname, 'www')));

// Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

// Définition des routes
    app.use('/', front);
    app.use('/api', api);

// Lancer le server
    app.listen(port, () => {
        console.log('Server started on port ' + port);
    });