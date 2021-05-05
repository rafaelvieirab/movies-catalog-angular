import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string = '';
  msgErrorUsername: string = '';
  password: string = '';
  msgErrorPassword: string = '';

  formGroup: FormGroup;
  // @ts-ignore
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.formGroup = this.formBuilder.group(
      {
        username: [this.username, Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.required,
        ])],
        password: [this.password, Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(20),
          Validators.required,
        ])],
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.subscription = this.userService.login(this.username, this.password).subscribe();
  }

  getErrorMessageUsername(): string {
    const usernameControl = this.formGroup.controls.usernameControl;

    if (usernameControl.valid || !usernameControl.touched || !usernameControl.dirty) {
      return '';
    }

    else if (usernameControl.hasError('required')) {
      return 'Campo Obrigatório! Digite seu nome de usuário.';
    }

    else if (usernameControl.hasError('minlength')) {
      return 'O nome de usuário deve ter pelo menos 4 caracteres.';
    }
    return `Nome de Usuário não pode ser ${this.username}.`;
  }

  getErrorMessagePassword(): string {
    const usernameControl = this.formGroup.controls.usernameControl;

    if (usernameControl.valid || !usernameControl.touched || !usernameControl.dirty) {
      return '';
    }
    else if (usernameControl.hasError('required')) {
      return 'Campo Obrigatório! Digite sua senha.';
    }
    else if (usernameControl.hasError('minlength')) {
      return 'A senha deve ter pelo menos 4 caracteres.';
    }
    return 'Senha Inválida.';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
