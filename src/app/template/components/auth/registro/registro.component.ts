import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  registroForm = this.fb.nonNullable.group({
    name: [''],
    lastName: [''],
    email: [''],
    user: [''],
    password: [''],
  });

  onClickPasswordEye() {
    this.visible = !this.visible;
  }
}
