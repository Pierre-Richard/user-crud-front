import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
import { APIBASEURL } from '../environnements/environnements.';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //1 - J’envoie une requête GET vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get()
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et recevoir la liste

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIBASEURL + '/users');
  }

  //1 - J’envoie une requête GET vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get() + id pour recuperer l'utilisateur
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et recevoir l'utilisateur

  public getUserById(user: User): Observable<User> {
    return this.http.get<User>(APIBASEURL + `${user.id}`);
  }
}
