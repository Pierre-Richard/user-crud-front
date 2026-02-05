import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edti-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edti-user.component.html',
  styleUrl: './edti-user.component.scss',
})
export class EdtiUserComponent implements OnInit {
  public editForm!: FormGroup;
  constructor(
    private userService: UserService,
    // La class ActivatedRoute va me permettre de lire Id qui provient de l'url
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  public userId: any;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    });
    // Je lis id qui me provient de l'url
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'];
      this.userService.getUser(this.userId).subscribe((user) => {
        // via au patchValue je peux afficher mes données dans mon formulaire
        this.editForm.patchValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        });
      });
    });
  }

  //Je récupère les valeurs du formulaire (firstname/lastname/email)

  saveUser() {
    //verifier si le formulaire est valide
    if (this.editForm.valid) {
      //Je récupère l’id (celui de la route)

      //J’appelle userService.updateUser(id, this.editForm.value) qui me sert à e,voyer mes données au backend
      this.userService
        .updateUser(this.userId, this.editForm.value)
        .subscribe((user) => {
          console.log('response from backend', user);
          //Si succès => je navigue vers /users (ou je rafraîchis la liste)
          this.router.navigate(['/users']);
          // Je récupère les valeurs du formulaire (firstname/lastname/email)
        });
    }
  }
}
