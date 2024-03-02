import { MessageModule } from 'primeng/message';
import { Component, ViewEncapsulation, effect, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService, LoginStatus } from './login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService],
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
  public visible: boolean = false;
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    user: [''],
    password: [''],
  });

  onClickPasswordEye() {
    this.visible = !this.visible;
  }
  
  get loginStatus(){
    return this.loginService.status()
  }
}
