import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  username: string = '';
  msgErrorUsername: string = '';
  email: string = '';
  msgErrorEmail: string = '';
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
        // email: [this.email, Validators.compose([
        //   Validators.email(),
        //   Validators.required,
        // ])],
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
    this.subscription = this.userService.signup(this.username, this.email, this.password).subscribe();
  }

  getErrorMessageUsername(): string {
    const usernameControl = this.formGroup.controls.username;
    // const usernameControl = this.formGroup.controls.usernameControl;

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

  getErrorMessageEmail(): string {
    const emailControl = this.formGroup.controls.emailControl;

    if (emailControl.valid || !emailControl.touched || !emailControl.dirty) {
      return '';
    }

    else if (emailControl.hasError('email')) {
      return 'Digite um email válido!';
    }

    else if (emailControl.hasError('required')) {
      return 'Campo Obrigatório! Digite seu email.';
    }

    return `O email não pode ser ${this.email}.`;
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

