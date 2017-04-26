# Todos - MEANstack

Projet réalisé dans le cadre de la mise en place d'un projet de formation à la technologie MEANstack, le principe est de mettre en place un gestionaire de tâches. Cette application utilise les téchnologies suivantes :
- [MongoDb](https://www.mongodb.com/)
- [ExpressJs](http://expressjs.com/fr/)
- [Angular](https://angular.io/)
- [AngularCli](https://cli.angular.io/)
- [NodeJS](https://nodejs.org/en/)
- [NodeMon](https://nodemon.io/)

<br>

> Cette application utilise des versions récentes (avril 2017) des différents frameworks, vous devez les installer ou les mettre à jour pour utiliser ce projet.

<br /><br />

## Installation/Configuration

Cloner ce repo puis créer un dossier `data` pour héberger la base de données MongoDb.
```
git clone git@github.com:DWS-paris/MEANstack.git myTaskList

cd myTaskList

mkdir data
```
<br />

Ouvrir une nouvelle fenêtre du terminal pour définir l'adresse de la base de données et lancer le server de base de données
```
mongod dbpath /path/to/myTaskList/data

mongod
```
<br />

Ouvrir une nouvelle fenêtre du terminal pour lancer le shell MongoDb et créer une collection `tasks`
```
mongo

db.createCollection("tasks")
```
<br />

> Le serveur de base de données doit toujours rester actif, le shell ne sert qu'à créer la collection à utiliser dans l'application.
<br />

Ouvrir une nouvelle fenêtre du terminal pour lancer le serveur NodeJs de l'application : la commande `nodemo` permet relancer le serveur en cas de changement.
```
cd path/to/myTaskList

nodemon server.js
```
<br />

Ouvrir une nouvelle fenêtre du terminal pour compiler l'application Angular la commande `--watch` permet de relancer la compilation en cas de changement.
```
cd path/to/myTaskList/client

ng build --watch
```
<br /><br />


## License

MIT © Julien Noyer [DigitalWorkshop](http://www.digitalworkshop.fr)
