import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/template/shared/data-access/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public visible: boolean = false;

  private fb = inject(FormBuilder);
  public authService = inject(AuthService)
  public router = inject(Router)

  constructor() {

  }

  registroForm = this.fb.nonNullable.group({
    nombre: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]],
  });

  onClickPasswordEye() {
    this.visible = !this.visible;
  }

  onSubmit() {
    this.authService.registro(this.registroForm.value).subscribe(() => {
      this.router.navigate(['listado'])
    })
  }

}
