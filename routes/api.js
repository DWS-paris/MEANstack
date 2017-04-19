let express = require('express');
let router = express.Router();

let mongodb = require('mongodb');
let ObjectId = mongodb.ObjectID;
let MongoClient = mongodb.MongoClient;
let mongodbUrl = 'mongodb://localhost:27017/tasks';


router.get('/tasks', (req, res, next) => {

    MongoClient.connect(mongodbUrl, (err, db) =>{

        if(err){
            console.log('error connect', err)
        
        } else{
            db.collection('list').find().toArray((err, tasks) => {

                if(err){ 
                    res.send(err)

                } else{ 
                    res.json(tasks)
                }
            })
        }

        db.close();
    })

});


// Ajouter une tâche => http.post
router.post('/task', (req, res, next) => {
    let task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {

        MongoClient.connect(mongodbUrl, (err, db) =>{

            if(err){
                console.log('error connect', err)
            
            } else{
                db.collection('list').insert([task], (err, data) => {

                    if(err){
                        console.log('error')

                    } else{
                        res.redirect('tasks')
                    }

                })
            }

            db.close();
        })
    }
});

// Supprimer une tâche
router.delete('/task/:id', function(req, res, next){

    console.log(req.params.id)

    MongoClient.connect(mongodbUrl, (err, db) =>{

        if(err){
            console.log('error connect', err)
        
        } else{
            db.collection('list').remove({ _id: new ObjectId(req.params.id) }, (err, data) => {

                if(err){
                    console.log('error')

                } else{
                    console.log("ok")
                }

            })
        }

        db.close();
    })

});

// Mettre à jour une tâche
router.put('/task/:id', (req, res, next) => {
    let task = req.body;
    let updTask = {};
    
    if(task.isDone){
        updTask.isDone = task.isDone;
    }
    
    if(task.title){
        updTask.title = task.title;
    }
    
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });

    } else {

        MongoClient.connect(mongodbUrl, (err, db) =>{

            if(err){
                console.log('error connect', err)
            
            } else{
                db.collection('list').update({ _id: new ObjectId(req.params.id) },updTask, {}, (err, data) => {

                    if(err){
                        console.log('error')

                    } else{
                        console.log("ok")
                    }

                })
            }

            db.close();
        })
    }
});

module.exports = router;