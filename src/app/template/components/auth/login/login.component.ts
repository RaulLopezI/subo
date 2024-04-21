import { MessageModule } from 'primeng/message';
import { Component, ViewEncapsulation, effect, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LoginService, LoginStatus } from './login.service';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [LoginService,AuthService],
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
  public router = inject(Router);

  constructor(){}

  loginForm = this.fb.nonNullable.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
  });

  onClickPasswordEye() {
    this.visible = !this.visible;
  }
  
  get loginStatus(){
    return this.loginService.status()
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(()=>{
      this.router.navigate(['listado'])
    })
  }
}
