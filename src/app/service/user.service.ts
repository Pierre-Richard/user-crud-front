import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../interface/User';
import { APIBASEURL } from '../environnements/environnements.';
import { RequestState } from '../interface/RequestState';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // BehaviorSubject
  private state = new BehaviorSubject<RequestState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
  });

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  // Exposé en Observable pour le composant
  public state$ = this.state.asObservable();

  private stateIsLoadingTrue() {
    return this.state.next({
      isLoading: true,
      errorMessage: null,
      successMessage: this.state.value.successMessage,
    });
  }

  //1 - J’envoie une requête GET vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get()
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et recevoir la liste

  public getAllUsers(): Observable<User[]> {
    this.stateIsLoadingTrue();
    return this.http.get<User[]>(APIBASEURL).pipe(
      tap({
        // data c'est le tableau de users retourné par l'API
        next: () =>
          this.state.next({
            isLoading: false,
            errorMessage: null,
            successMessage: this.state.value.successMessage, // garde la valeur actuelle,
          }),
        error: () =>
          this.state.next({
            isLoading: false,
            errorMessage: "Une erreur s'est passé",
            successMessage: null,
          }),
      }),
    );
  }

  //1 - J’envoie une requête Post vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.post() + user pour créer un l'utilisateur
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et pour un l'utilisateur

  public createUser(user: User): Observable<User> {
    this.stateIsLoadingTrue();
    return this.http.post<User>(APIBASEURL, user).pipe(
      tap({
        next: () => {
          this.state.next({
            isLoading: false,
            errorMessage: null,
            successMessage: '',
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('Utilisateur créé', 'Fermer', {
            duration: 3000,
            panelClass: ['success'],
          });
        },

        error: () => {
          this.state.next({
            isLoading: false,
            errorMessage: '',
            successMessage: null,
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('Utilisateur n a pas été créé', 'Fermer', {
            duration: 3000,
            panelClass: ['error'],
          });
        },
      }),
    );
  }

  //1 - J’envoie une requête Delete vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.delete() + id du user que je veux supprimer
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et supprimer un utilisateur

  public deleteUser(id: number): Observable<any> {
    this.stateIsLoadingTrue();
    return this.http.delete<User>(APIBASEURL + `/${id}`).pipe(
      tap({
        next: () => {
          this.state.next({
            isLoading: false,
            errorMessage: null,
            successMessage: '',
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('Utilisateur a été supprimé', 'Fermer', {
            duration: 3000,
            panelClass: ['success'],
          });
        },
        error: () => {
          this.state.next({
            isLoading: false,
            errorMessage: '',
            successMessage: null,
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('erreur lors de la suppression', 'Fermer', {
            duration: 3000,
            panelClass: ['error'],
          });
        },
      }),
    );
  }

  //1 - J’envoie une requête put vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.put() + id du user et le objet(user) que je veux mettre à jour
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner e t mettre à jour un utilisateur

  public updateUser(id: number, user: User): Observable<User> {
    this.stateIsLoadingTrue();
    return this.http.put<User>(APIBASEURL + `/${id}`, user).pipe(
      tap({
        next: () => {
          this.state.next({
            isLoading: false,
            errorMessage: null,
            successMessage: '',
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('Utilisateur a été mise à jour', 'Fermer', {
            duration: 3000,
            panelClass: ['success'],
          });
        },
        error: () => {
          this.state.next({
            isLoading: false,
            errorMessage: '',
            successMessage: null,
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('erreur lors de la mise à jour', 'Fermer', {
            duration: 3000,
            panelClass: ['error'],
          });
        },
      }),
    );
  }

  //1 - J’envoie une requête get vers mon backend via HttpClient
  //2 - Je construis l’URL complète vers l’endpoint /api/v1/users
  //3 - Je passe cette URL à la méthode http.get() + id du user  que je veux recuperer
  //4 - Je récupère la réponse du backend sous forme d’un flux asynchrone
  //5 - Je renvoie ce flux au composant pour qu’il puisse s’abonner et l'utilisateur

  public getUser(id: number): Observable<User> {
    this.stateIsLoadingTrue();
    return this.http.get<User>(APIBASEURL + `/${id}`).pipe(
      tap({
        next: () => {
          this.state.next({
            isLoading: false,
            errorMessage: null,
            successMessage: '',
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('Utilisateur a été recuperé', 'Fermer', {
            duration: 3000,
            panelClass: ['success'],
          });
        },
        error: () => {
          this.state.next({
            isLoading: false,
            errorMessage: '',
            successMessage: null,
          });
          // 2 - Appeler snackBar séparément
          this.snackBar.open('erreur lors de la recuperation', 'Fermer', {
            duration: 3000,
            panelClass: ['error'],
          });
        },
      }),
    );
  }
}
