$(document).ready(function(){

    /*
    Variables globales
    */
        var ajaxError = $('.ajaxError');
        var erroAddTask = $('.errorAddTask');
        var myForm = $('form');
        var taskTitle = $('[name="title"]');


    /*
    Gestion du formulaire
    */
        myForm.submit(function(evt){
            evt.preventDefault();

            // Vérifier la présence de valeur dans le formualire
            if( taskTitle.val() ){
                
                // Ajouter un document dans la collection MongoDB => post()
                $.ajax({
                    url: 'http://localhost:8080/api/task',
                    data: myForm.serialize(),
                    dataType: 'JSON',
                    type: 'POST',


                    success: function(data){
                        // Ajouter la nouvelle tâche dans le DOM
                        addTask(data.title, data._id, false)
                    },

                    error: function(err){ },

                    complete: function(){ 
                        // Vider le formulaire
                        myForm[0].reset();
                    }
                })

            } else{
                // Afficher le message d'erreur
                erroAddTask.fadeIn();
            }

        });


        taskTitle.focus(function(){
            // Masquer le message d'erreur
            $('main span').fadeOut();
        });



    
    
    /*
    Fonction pour récupérer la liste des tâche depuis la BDD MongoDb
    */
        function getTasks(){

            // Afficher les documents de la collection MongoDB => find()
            $.ajax({
                url: 'http://localhost:8080/api/tasks',
                dataType: 'JSON',
                type: 'GET',

                success: function(data){
                    // Boucle sur la collection MongoDb
                    for( i = 0; i < data.length; i++ ){
                        
                        // Ajout des tâches dans le DOM
                        addTask(data[i].title, data[i]._id, data[i].isDone);
                    }
                },

                error: function(err){ },

                complete: function(){
                    
                }
            })

        }


    
    /*
    Fonction pour ajouter une tâche dans le DOM
    */
        function addTask(title, id, isDone){

            // Ajouter des un article dans la dernière section du main
            $('section:last').append(''+
                '<article id="task' + id + '" class="taskListItem taskIsDone' + isDone + '">' +
                    '<h2>' + title + '</h2>' +
                    '<i class="fa fa-check-circle" aria-hidden="true" data-content="' + id + '" data-isDone="' + isDone + '"></i>' +
                    '<i class="fa fa-trash" aria-hidden="true" data-content="' + id + '"></i>' +
                '</article>'
            );

            // Activation des fonction de mise à jour et de suppression
            updateTask(id);
            deleteTask(id);
        };

    
    /*
    Fonction pour modifier une tâche
    */
        function updateTask(id){
            
            // Capter le click sur la balise
            $('#task' + id + ' .fa-check-circle').click( function(){

                // Définition des variables
                var taskId = $(this).attr('data-content');
                var taskIsDone = $(this).attr('data-isDone');
                var dataTaskIsDone = false;
                var taskTitle = $(this).parent().text();
                var taskArticle = $(this).parent();

                // Vérification de la valeur de data-isDone
                if(taskIsDone === "false"){
                    // Définition des valeurs = la tâche est faite
                    dataTaskIsDone = true;
                    $(this).attr('data-isDone', 'true');
                    taskArticle.addClass('taskIsDonetrue');

                } else{
                    // Définition des valeurs = la tâche est à faire
                    dataTaskIsDone = false;
                    taskIsDone = "false";
                    $(this).attr('data-isDone', 'false')
                    taskArticle.removeClass('taskIsDonetrue');
                }

                // Mettre à jour les données dans la collection MongoDB => update()
                $.ajax({
                    url: 'http://localhost:8080/api/task/' + taskId,
                    dataType: 'JSON',
                    data: {_id: taskId, title: taskTitle, isDone: dataTaskIsDone},
                    type: 'PUT',

                    success: function(data){ console.log(data) },

                    error: function(err){ },

                    complete: function(){ }
                })

            });

        }

    /*
    Fonction pour supprimer une tâche
    */
        function deleteTask(id){
            
            $('#task' + id + ' .fa-trash').click( function(){

                var taskId = $(this).attr('data-content');

                // Supprimer les données dans la collection MongoDB => remove()
                $.ajax({
                    url: 'http://localhost:8080/api/task/' + taskId,
                    dataType: 'JSON',
                    data: {id: taskId},
                    type: 'DELETE',

                    success: function(data){ },

                    error: function(err){ },

                    complete: function(){ $('#task' + id).css('display', 'none'); }
                })


            });
        }


    getTasks();

})