import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interface/User';
import { UserService } from '../../service/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-list-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss',
})
export class ListComponentComponent implements OnInit {
  public isLoading: boolean = false;
  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  //- 1 injecter via constructeur le userService dans le composant ok
  //-2 Declarer une variable listUsers qui lui, recuperera la liste des users ok
  //-3 à la creation du composant, lui donner cette variable pour avoir la liste des users ok
  //4 - Je m’abonne au résultat et je remplis ma variable avec la liste
  //5- j'affiche le résultat dans le HTML.

  //gestion de la requete post
  // 1 - Injecter via le constructeur le FormBuilder dans le composant
  // 2 - Déclarer une propriété userForm (FormGroup) qui représentera mon formulaire
  // 3 - Dans ngOnInit, construire le formulaire avec les champs : firstname, lastname, email
  // 4 - Créer la méthode onRegister()
  //    - Récupérer les valeurs du formulaire
  //    - Appeler this.userService.createUser(...)
  //    - S’abonner au résultat
  //    - (optionnel) vider le formulaire ou afficher un message

  public listUsers: User[] = [];
  public userForm!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((user) => {
      console.log(user);
      this.listUsers = user;
    });

    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    });
  }

  onRegister(): void {
    //verifier si le formulaire est valide
    if (this.userForm.valid) {
      //Retourner les valeurs de mon formulaire à mon backend
      this.userService.createUser(this.userForm.value).subscribe((user) => {
        // afficher l'utilisateur créé
        (console.log('utilisateur créé', user),
          //l’ajouter à listUsers
          //this.listUsers.push(user)
          //Rafraîchir la liste après création
          this.userService.getAllUsers().subscribe((users) => {
            this.listUsers = users;
          }));

        // reset le formulaire
        this.userForm.reset();
      });
    }
  }

  //gestion de la requete delete
  deleteUser(id: number): void {
    //Appeler la methode deleteUser du userService pour renvoyer au backend la valeur supprimé
    // S'abonner au deleteUser pour afficher l'utilisateur supprimer
    // subscribe() = “quand le backend a fini, fais ceci
    this.userService.deleteUser(id).subscribe(() => {
      // affichier dans un console.log la valeur supprimée
      console.log('suppression OK', id);
      // supprimer le utilisateur et renvoyer le tableau avec les nouvelles valeurs
      this.userService.getAllUsers().subscribe((users) => {
        // mettre à jour le tableau avec utilisateur supprimer
        this.listUsers = users;
      });
    });
  }

  //gestion de la requete update
  //1- Appeler la methode updateUser du userService pour renvoyer au backend la valeur mis à jour
  //2- S'abonner au updateUser pour afficher l'utilisateur mise à jour
  //3-afficher dans un console.log l'utilisateur mis à jour
  //4-Mettre à jour utilisateur selectionné et le renvoyer dans le nouveau tableau
  //5- ...

  public updateUser(id: number, user: User): void {
    // Les données passée la methode updateUser provienne du client
    // user definis en parametre du soubscribe c'est le retour de l'api
    this.userService.updateUser(id, user).subscribe((user) => {
      console.log('utilisateur mis à jour: ', user);
      // Pour que la mise à jour est lieu j'utilise la fonction map() qui me retourne
      // un nouveau tableau avec l'utilise mis à jour
      // la (la conditon) = si le user sur lequel je clique est également au user qui vient l'api
      // alors mets à jour mon utilisateur sinon la valeur reste inchangé
      //  // Je construis un nouveau tableau où SEULEMENT l'utilisateur modifié est remplacé
      //let udpatedUser = this.listUsers.map((u) => {
      //return u.id === user.id ? user : u;
      //});
      // Le user mis à jour je l'assigne à mon tableau listUsers
      //// Mise à jour de la liste affichée
      //this.listUsers = udpatedUser
      //
      this.userService.getAllUsers().subscribe((users) => {
        this.listUsers = users;
      });
    });

    //1. Je crée une route `/users/:id/edit` qui pointe vers mon composant d’édition.
    //2. Quand je clique sur "Modifier" dans la liste, je redirige vers cette route avec l’id du user.
    //3. Dans la page d’édition, je récupère l’id dans l’URL.
    //4. Avec cet id, j’appelle le backend (getUserById) pour récupérer l’utilisateur.
    //5. Je pré-remplis le formulaire avec les données de cet utilisateur.
    //6. Quand je valide le formulaire, j’envoie les nouvelles données au backend (updateUser).
    //7. Si la mise à jour est OK, je reviens à la liste des utilisateurs.
  }

  /**
   * Cette fonction me dirige vers utilisateur que je veux modifier
   *
   * @param id
   */
  public navigateToUserId(id: number) {
    this.router.navigate([`users/${id}/edit`]);
  }
}
