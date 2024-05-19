import { MessageModule } from 'primeng/message';
import { Component, ViewEncapsulation, effect, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService, LoginStatus } from './login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService, AuthService, MessageService],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public loginService = inject(LoginService);
  public authService = inject(AuthService);
  public mensajesService = inject(MessageService)

  public visible: boolean = false;
  private fb = inject(FormBuilder);
  public router = inject(Router);

  constructor() { }

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onClickPasswordEye() {
    this.visible = !this.visible;
  }

  get loginStatus() {
    return this.loginService.status()
  }

  onSubmit() {
    console.log("fk");

    this.authService.login(this.loginForm.value).pipe(
      catchError(
        (error) => {
          console.log(error);
          alert(error.error.msg)
          this.mensajesService.add({ severity: 'error', summary: 'Error', detail: "KOjfolf" });
          return throwError(() => error);
        })
    ).subscribe(() => {
      this.router.navigate(['listado'])
    })
  }
}
