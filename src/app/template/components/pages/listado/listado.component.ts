import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductoService } from 'src/app/template/shared/data-access/producto.service';
import { Producto } from 'src/app/template/shared/interfaces/producto';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { PujasService } from 'src/app/template/shared/data-access/pujas.service';
import { InputTextModule } from 'primeng/inputtext';

interface Product {
  name: string;
  price: number;
  image: string;
}
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  productos!: Producto[]
  productosService = inject(ProductoService)
  puja!: number

  mensajesService = inject(MessageService)
  pujaService = inject(PujasService)
  constructor() {
    this.getProductos()
  }

  getProductos() {
    this.productosService.get().subscribe(productos=> {
      if (productos.ok) {
        this.productos = productos.productos.filter(p=> p.usuario._id !== localStorage.getItem("idUser") && p.cerrado === false)
      }
    })
  }

  pujar(producto: Producto) {
    let pujaActual = producto.puja > producto.pujaInicial? producto.puja : producto.pujaInicial

    if (pujaActual > this.puja) {
      this.mensajesService.add({ severity: 'error', summary: 'Error', detail: "La puja tiene que ser superior a la que ya hay" });
    } else {
      producto.puja = this.puja
      producto.pujante = localStorage.getItem("idUser")
      this.productosService.put(producto).subscribe(()=> this.mensajesService.add({ severity: 'success', summary: '', detail: "La puja ha sido exitosa" }))
      this.pujaService.create({usuario: localStorage.getItem("idUser") as string, producto: producto.id as string}).subscribe()
    }
  }
}
