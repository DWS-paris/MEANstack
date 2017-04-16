let express = require('express');
let router = express.Router();
let mongojs = require('mongojs');

let db = mongojs('mongodb://mrRobot:180879mdpjul@ds139969.mlab.com:39969/tasks-list', ['tasks']);

// Afficher la liste des tâches => http.get
router.get('/tasks', (req, res, next) => {
    db.tasks.find( (err, tasks) => {

        if(err){
            res.send(err);
        }
        res.json(tasks);

    });
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
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Supprimer une tâche
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
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
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, (err, task) => {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});

module.exports = router;