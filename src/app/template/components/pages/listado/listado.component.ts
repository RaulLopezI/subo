import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductoService } from 'src/app/template/shared/data-access/producto.service';
import { Producto } from 'src/app/template/shared/interfaces/producto';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

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
    InputNumberModule
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  productos!: Producto[]
  productosService = inject(ProductoService)

  constructor() {
    this.getProductos()
  }

  getProductos() {
    this.productosService.get().subscribe(productos=> {
      if (productos.ok) {
        this.productos = productos.productos.filter(p=> p.usuario._id !== localStorage.getItem("idUser"))
      }
    })
  }
}
