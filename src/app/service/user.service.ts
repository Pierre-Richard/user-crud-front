import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
import { APIBASEURL } from '../environnements/environnements.';
import { RequestState } from '../interface/RequestState';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public createState!: RequestState;
  constructor(private http: HttpClient) {}

  //1 - J’envoie une requête GET vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get()
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et recevoir la liste

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIBASEURL);
  }

  //1 - J’envoie une requête Post vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.post() + user pour créer un l'utilisateur
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et pour un l'utilisateur

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(APIBASEURL, user);
  }

  //1 - J’envoie une requête Delete vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.delete() + id du user que je veux supprimer
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et supprimer un utilisateur

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(APIBASEURL + `/${id}`);
  }

  //1 - J’envoie une requête put vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.put() + id du user et le objet(user) que je veux mettre à jour
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner e t mettre à jour un utilisateur

  public updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(APIBASEURL + `/${id}`, user);
  }

  //1 - J’envoie une requête get vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get() + id du user  que je veux recuperer
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et l'utilisateur

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(APIBASEURL + `/${id}`);
  }
}
