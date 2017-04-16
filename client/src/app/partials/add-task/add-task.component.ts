import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-add-task',
templateUrl: './add-task.component.html'
})
export class AddTaskComponent implements OnInit {

  private newTask: string;
  private errorAddTask: boolean = false;

  constructor() {}

  @Output() sendNewTaskData = new EventEmitter();

  addNewTask(event: any){
    if(this.newTask == undefined){

      // Afficher le message d'erreur
      this.errorAddTask = true

    } else{
      // Envoyer les données
      this.sendNewTaskData.emit(this.newTask)

      // Vider le formulaire
      document.getElementsByTagName('form')[0].reset()

    }
  }


  ngOnInit() {}

}
