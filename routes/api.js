// Configuration du module
    let express = require('express');
    let router = express.Router();

// Configuration de la base MongoDb
    let mongodb = require('mongodb');
    let ObjectId = mongodb.ObjectID;
    let MongoClient = mongodb.MongoClient;
    let mongodbUrl = 'mongodb://localhost:27017/tasks';




/*
Configuration de la route pour afficher la liste des tâches => get
*/
    router.get('/tasks', (req, res, next) => {

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(mongodbUrl, (err, db) =>{

            // Tester la connexion
            if(err){ res.send(err) } 
            else {

                // Récupération des documents de la collection 'list' => find
                db.collection('list').find().toArray((err, tasks) => {

                    // Tester la commande MongoDb
                    if(err){ res.send(err) }

                    else{ 
                        // Envoyer les données au format json
                        res.json(tasks)
                    }
                })
            }

            // Fermer la connexion à la base MongoDb
            db.close();
        })
    });





/*
Configuration de la route pour ajouter une tâche => post
*/
    router.post('/task', (req, res, next) => {

        // Récupération des données depuis la requête
        let task = req.body;

        // Vérifier la présence de valeur dans la requête
        if(!task.title || !(task.isDone + '')){
            res.status(400);
            res.json({ "error": "Bad Data" });

        } else {

            // Ouvrir une connexion sur la base MongoDb
            MongoClient.connect(mongodbUrl, (err, db) =>{

                // Tester la connexion
                if(err){ res.send(err); db.close(); } 
                else{

                    // Ajouter un document dans la collection 'list' => insert
                    db.collection('list').insert([task], (err, data) => {

                        // Vérification de a commande MongoDb
                        if(err){ console.log('error') } 
                        else{

                            // Fermer la connexion à la base MongoDb
                            db.close()

                            // Ouvrir une connexion sur la base MongoDb
                            MongoClient.connect(mongodbUrl, (err, db) =>{

                                // Tester la connexion
                                if(err){ res.send(err) } 
                                else{

                                    // Récupération des documents de la collection 'list' => find
                                    db.collection('list').find().toArray((err, tasks) => {

                                        // Tester la connexion
                                        if(err){ res.send(err) } 
                                        else{ 

                                            // Envoyer les données au format json
                                            res.json(tasks)
                                        }
                                    })
                                }

                                // Fermer la connexion à la base MongoDb
                                db.close();
                            })
                        }
                    })
                }
            })
        }
    });







/*
Configuration de la route pour supprimer une tâche => delete
*/
    router.delete('/task/:id', function(req, res, next){

        // Ouvrir une connexion sur la base MongoDb
        MongoClient.connect(mongodbUrl, (err, db) =>{

            // Tester la connexion
            if(err){ res.send(err) } 
            else{

                // Supprimer un document dans la collection 'list' => remove
                db.collection('list').remove({ _id: new ObjectId(req.params.id) }, (err, data) => {

                    // Tester la commande MongoDb
                    if(err){ console.log('error'); db.close(); } 
                    else{

                        // Fermer la connexion à la base MongoDb
                        db.close();
                        
                        // Ouvrir une connexion sur la base MongoDb => connect
                        MongoClient.connect(mongodbUrl, (err, db) =>{

                            // Tester la connexion
                            if(err){ res.send(err) } 
                            else{

                                // Récupération des documents de la collection 'list' => find
                                db.collection('list').find().toArray((err, tasks) => {

                                    // Tester la commande MongoDb
                                    if(err){ res.send(err) } 
                                    else{ 

                                        // Envoyer les données au format json
                                        res.json(tasks)
                                    }
                                })
                            }

                            // Fermer la connexion à la base MongoDb => close
                            db.close();
                        })
                    }
                })
            }            
        })
    });







/*
Configuration de la route pour mettre à jour une tâche => put
*/
    router.put('/task/:id', (req, res, next) => {
        // Récupération des données depuis la requête
        let task = req.body;

        // Définition d'un objet pour analyser les données de la requête
        let updTask = {};
        
        // Assignation des valeurs de la requête dans l'objet
        if(task.isDone){ updTask.isDone = task.isDone; }
        if(task.title){ updTask.title = task.title; }

        // Vérifier la présence de valeur dans la requête
        if(!updTask){
            res.status(400);
            res.json({
                "error":"Bad Data"
            });

        } else {

            // Ouvrir une connexion sur la base MongoDb => connect
            MongoClient.connect(mongodbUrl, (err, db) =>{

                // Tester la connexion
                if(err){ res.send(err) } 
                else{

                    // Mettre à jour un document dans la collection 'list' => update
                    db.collection('list').update({ _id: new ObjectId(req.params.id) },updTask, {}, (err, data) => {


                        // Tester la commande MongoDb
                        if(err){ res.send(err) } 
                        else{
                            
                            // Fermer la connexion à la base MongoDb => close
                            db.close();
                            
                            // Ouvrir une connexion sur la base MongoDb => connect
                            MongoClient.connect(mongodbUrl, (err, db) =>{

                                // Tester la connexion
                                if(err){ res.send(err) } 
                                else{

                                    // Récupération des documents de la collection 'list' => find
                                    db.collection('list').find().toArray((err, tasks) => {

                                        // Tester la commande MongoDb
                                        if(err){ res.send(err) } 
                                        else{ 

                                            // Envoyer les données au format json
                                            res.json(tasks)
                                        }
                                    })

                                    // Fermer la connexion à la base MongoDb => close
                                    db.close();
                                }                                
                            })
                        }

                    })
                }
            })
        }
    });


// Exporter le module
    module.exports = router;