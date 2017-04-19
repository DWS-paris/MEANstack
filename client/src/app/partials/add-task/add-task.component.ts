import { Component, Output, EventEmitter } from '@angular/core';
import { AppTranslate } from '../../app.translate';

@Component({
selector: 'app-add-task',
templateUrl: './add-task.component.html'
})
export class AddTaskComponent {

  // Définition des variables
    private addTask = AppTranslate.ADD_TASK;
    private newTask: string;
    private errorAddTask: boolean = false;



  // Output
    // Création des événement pour envoyer des données vers le composant home.component
    @Output() sendNewTaskData = new EventEmitter();




  // Création d'une fonction pour ajouter une tâche
    addNewTask(event: any){
      if(this.newTask == undefined){
        // Afficher le message d'erreur
        this.errorAddTask = true

      } else{
        // Renvoi de l'événement vers le composant home.component
        this.sendNewTaskData.emit(this.newTask)

        // Vider le formulaire
        document.getElementsByTagName('form')[0].reset()

      }
    }

}
