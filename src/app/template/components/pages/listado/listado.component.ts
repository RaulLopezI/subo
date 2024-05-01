import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProductoService } from 'src/app/template/shared/data-access/producto.service';
import { Producto } from 'src/app/template/shared/interfaces/producto';
import { ButtonModule } from 'primeng/button';

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
    ButtonModule
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent {
  products: Product[] = [
    { name: 'Producto 1', price: 100, image: 'url_a_la_imagen_1.jpg' },
    { name: 'Producto 2', price: 150, image: 'url_a_la_imagen_2.jpg' },
    { name: 'Producto 3', price: 200, image: 'url_a_la_imagen_3.jpg' }
  ];

  productos!: Producto[]
  productosService = inject(ProductoService)

  constructor() {
    this.getProductos()
  }

  getProductos() {
    this.productosService.get().subscribe(productos=> {
      if (productos.ok) {
        this.productos = productos.productos
      }
    })
  }
}
