import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from 'src/app/template/shared/data-access/producto.service';
import { Producto } from 'src/app/template/shared/interfaces/producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, throwError } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule
  ],
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.scss']
})
export class MisProductosComponent {

  private productoService = inject(ProductoService)
  private fb = inject(FormBuilder)
  private mensajesService = inject(MessageService)

  value1: number = 0
  public productos!: Producto[]
  public visible: boolean = false
  public productoForm!: FormGroup


  constructor() {
    this.inicializarForm()
    this.getProductos()
  }


  getProductos() {
    this.productoService.getId(localStorage.getItem("idUser") as string).subscribe(productos => {
      if (productos.ok) {
        this.productos = productos.productos
      }
    })
  }

  inicializarForm() {
    this.productoForm = this.fb.group({
      nombre: ["", Validators.required],
      pujaInicial: [0, Validators.required],
      descripcion: ["", Validators.required]
    })
  }

  crearProducto() {
    let producto: Producto = {
      nombre: this.productoForm.value.nombre,
      usuario: localStorage.getItem("idUser"),
      cerrado: false,
      puja: 0,
      descripcion: this.productoForm.value.descripcion,
      pujaInicial: this.productoForm.value.pujaInicial
    }

    this.productoService.create(producto).pipe(
      catchError(
        (error) => {
          console.log(error);
          this.mensajesService.add({ severity: 'error', summary: 'Error', detail: error.error.errors.errors[0].msg });
          return throwError(() => error);
        })
    ).subscribe(()=> {
      this.mensajesService.add({ severity: 'success', summary: 'Producto creado con exito!', detail: "" });
      this.getProductos()
      this.visible = false;
      this.productoForm.reset()
    })
  }
}
