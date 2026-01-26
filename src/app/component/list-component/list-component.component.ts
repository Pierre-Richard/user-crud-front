import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/User';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.scss',
})
export class ListComponentComponent {
  //- 1 injecter via constructeur le userService dans le composant ok
  //-2 Declarer une variable listUsers qui lui, recuperera la liste des users ok
  //-3 à la creation du composant, lui donner cette variable pour avoir la liste des users ok
  //4 - Je m’abonne au résultat et je remplis ma variable avec la liste
  //5- j'affiche le résultat dans le HTML.

  public listUsers: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((user) => {
      console.log(user);
      this.listUsers = user;
    });
  }
}
