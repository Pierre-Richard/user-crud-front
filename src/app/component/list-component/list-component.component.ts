import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/User';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss',
})
export class ListComponentComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((user) => {
      console.log(user);
      this.listUsers = user;
    });

    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
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
          this.listUsers.push(user));
        // reset le formulaire
        this.userForm.reset();
      });
    }
  }

  //gestion de la requete delete
  deleteUser(id: number): void {
    //Appeler la methode deleteUser du userService pour renvoyer au backend la valeur supprimé
    // S'abonner au deleteUser pour afficher l'utilisateur supprimer
    this.userService.deleteUser(id).subscribe((user) => {
      // affichier dans un console.log la valeur supprimée
      console.log('utilisateur supprimé', user);
      // supprimer le utilisateur et renvoyer le tableau avec les nouvelles valeurs
      let userDeleted = this.listUsers.filter((user) => user.id !== id);
      // mettre à jour le tableau avec utilisateur supprimer
      this.listUsers = userDeleted;
    });
  }

  //gestion de la requete update
  //1- Appeler la methode updateUser du userService pour renvoyer au backend la valeur mis à jour
  //2- S'abonner au updateUser pour afficher l'utilisateur mise à jour
  //3-afficher dans un console.log l'utilisateur mis à jour
  //4-Mettre à jour utilisateur selectionné et le renvoyer dans le nouveau tableau
  //5- ...

  public updateUser(id: number, user: User): void {
    this.userService.updateUser(id, user).subscribe((user) => {
      console.log('utilisateur mis à jour: ', user);
      let udpatedUser = this.listUsers.map((u) => {
        return u.id === user.id ? user : u;
      });
      this.listUsers = udpatedUser;
    });
  }
}
