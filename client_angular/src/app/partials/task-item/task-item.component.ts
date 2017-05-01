import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {

  // Input/Output
    // Récupréation de la tâche depui le composant home.component
    @Input() task: any;

    // Création des événement pour envoyer des données vers le composant home.component
    @Output() sendDeleteTask = new EventEmitter();
    @Output() sendUpdateTask = new EventEmitter();



  // Fonction pour supprimer une tâche
      deleteTask(event: any){
        // Renvoi de l'événement vers le composant home.component
        this.sendDeleteTask.emit(event)
      }


  // Création d'une fonction pour mettre à jour une tâche
    updateTask(event: any){
      // Renvoi de l'événement vers le composant home.component
      this.sendUpdateTask.emit(event)
    }

}
