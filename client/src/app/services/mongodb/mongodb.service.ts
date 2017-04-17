import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MongodbService {

  constructor ( private http: Http ) {}

  // Définition des adresses de l'API => routes/api.js
  private getCategoriesUrl = 'https://localhost:3000/api/tasks'
  private editTaskUrl = 'https://localhost:3000/api/task'



  // Fonction pour ajouter une tâche dans la BDD MongoDb
  addNewTask (newTask): Promise<any[]> {

    // Définition du header de la requête
    let myHeader = new Headers();
    myHeader.append('Content-Type', 'application/json');

    // Ajout de l'objet newTask dans la BDD MongoDb
    return this.http.post(this.editTaskUrl, newTask, {headers: myHeader}).toPromise().then(this.dataFromMongodb).catch(this.handleError);
  }

  // Fonction pour supprimer une tâche => http.delete
  deleteTask (id): Promise<any[]> {

    // Récupérer les données depuis la BDD MongoDb
    return this.http.delete(this.editTaskUrl + '/' + id).toPromise().then(this.dataFromMongodb).catch(this.handleError);

  }


  // Fonction pour mettre à jour une tâche => http.put
  updateTask (task): Promise<any[]> {

    // Définition du header de la requête
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Récupérer les données depuis la BDD MongoDb
    return this.http.put(this.editTaskUrl + '/' + task._id, task, {headers: headers}).toPromise().then(this.dataFromMongodb).catch(this.handleError);

  }


  // Fonction pour afficher la liste des tâche depuis la BDD MongDb
  getAllTasks (): Promise<any[]> {
    // Récupérer les données depuis la BDD MongoDb
    return this.http.get(this.getCategoriesUrl).toPromise().then(this.dataFromMongodb).catch(this.handleError);
  }



  // Traitement des réponses JSON
  private dataFromMongodb(res: Response) {
    return res.json() || { };
  }

  // Traitement des erreurs
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }

}
