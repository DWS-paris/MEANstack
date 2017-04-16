import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MongodbService } from '../../services/mongodb/mongodb.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  // Ajout du service dans le décorateur
  providers: [ MongodbService ],

  // Définition des animations
  animations: [
    trigger('itemAnim', [
      transition(':enter', [ style({opacity: '0'}), animate('.3s ease-in') ]),
      transition(':leave', [ style({opacity: '1'})])
    ])
  ]
})

export class HomeComponent implements OnInit {

  constructor(

    // Définition d'une variable pour utiliser le service
    private mongodbService: MongodbService

  ) {}

  // Définition des variables
  private title: string;
  private tasksCollection: any[];

  // Variables nécessaires pour l'animation des tâches
  private staggeringTask: any[] = [];
  private next: number = 0;

  private singleTask: any;
  private errorAddTask: boolean = false;
  private animation: boolean = false;


  // Fonction pour ajouter une tâche
  private addNewTask(taskTitle: any){

    // Défintion de l'objet newTask
    let newTask = { title: taskTitle, isDone: false }
    
    // Appel de la fonction du service addNewTask()
    this.mongodbService.addNewTask(newTask).then( (mongoNewTask) =>{

      // callBack => Actualiser la liste des tâches
      this.tasksCollection.push(mongoNewTask)

      // callBack => Lancer l'animation des tâches
      this.doNext();
      
    });

  }



  // Fonction pour supprimer une tâche
  deleteTask(id){

    // Appel de la fonction du service deleteTask()
    this.mongodbService.deleteTask(id).then(data => {

      // callBack => Actualiser la liste des tâches
      this.updateTasks();

    });
  }

  


  // Fonction pour mettre à jour une tâche
  updateTask(task){

    // Définition d'une variable pour mettre à jour les données de la tâche
    let _task = { _id:task._id, title: task.title, isDone: !task.isDone };

    // Appel de la fonction du service updateTask()
    this.mongodbService.updateTask(_task).then(data => {
      
      // callBack => Actualiser la liste des tâches
      this.updateTasks();

    });
  }



  // Fonction pour afficher les tâches
  private showTasks(){

    // Appel de la fonction du service getAllTasks()
    this.mongodbService.getAllTasks().then(data => {
      
      // callBack => Afficher les données dans la vue
      this.tasksCollection = data;

      // callBack => Lancer l'animation des tâches
      this.doNext();

    });

  }

  // Fonction pour mettre à jour la liste de tâches
  private updateTasks(){

    // Appel de la fonction du service getAllTasks()
    this.mongodbService.getAllTasks().then(data => {

      // callBack => Mettre à jour les données dans la vue
      this.staggeringTask = data;

    });

  }



  // Création d'une fonction pour animer la liste de tâches
  private doNext(){
    if(this.next < this.tasksCollection.length) {
      this.staggeringTask.push(this.tasksCollection[this.next++]);
    }
  }



  // callBack => Le composant est chargé
  ngOnInit() {

    // Afficher la liste de tâches
    this.showTasks();
    
    

  }


}