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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
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
    InputTextareaModule,
    FileUploadModule,
    ChipModule
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
  file: string = ""

  constructor() {
    this.inicializarForm()
    this.getProductos()
  }

  onSelect(event: any) {
    const file = event.files[0];
    this.convertFileToBase64(file).then((base64: string) => {
      this.file = base64
      // Puedes usar el string base64 como necesites aquí
    }).catch(error => {
      console.error('Error converting file to base64:', error);
    });
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
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
      inicial: [null, Validators.required],
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
      pujaInicial: this.productoForm.value.inicial,
      pujante: null,
      img: this.file
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

  cerrar(producto: Producto) {
    producto.cerrado = true;
    this.productoService.put(producto).subscribe(()=> this.mensajesService.add({ severity: 'success', summary: '', detail: "La puja ha sido cerrada con exitosa" }))
  }
}
