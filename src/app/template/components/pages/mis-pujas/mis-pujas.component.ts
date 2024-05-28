import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from 'src/app/template/shared/interfaces/producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PujasService } from 'src/app/template/shared/data-access/pujas.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ProductoService } from 'src/app/template/shared/data-access/producto.service';
import { ChipModule } from 'primeng/chip';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-mis-productos',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ChipModule
  ],
  templateUrl: './mis-pujas.component.html',
  styleUrls: ['./mis-pujas.component.scss']
})
export class MisPujasComponent {
  private mensajesService = inject(MessageService)
  pujasService = inject(PujasService)
  productosService = inject(ProductoService)
  public pujas!: Producto[]
  public visible: boolean = false
  puja!: number
  constructor() {
    this.getPujas()
  }

  getPujas() {
    this.pujasService.getId(localStorage.getItem("idUser") as string).subscribe(pujas => {
      if (pujas.ok) {
        this.pujas = pujas.pujas.map((pujaq: any)=> pujaq.producto)
        console.log(this.pujas);
      }
    })
  }

  pujar(producto: Producto) {
    producto.id = producto._id
    let pujaActual = producto.puja > producto.pujaInicial? producto.puja : producto.pujaInicial

    if (pujaActual > this.puja) {
      this.mensajesService.add({ severity: 'error', summary: 'Error', detail: "La puja tiene que ser superior a la que ya hay" });
    } else {
      producto.puja = this.puja
      producto.pujante = localStorage.getItem("idUser")
      this.productosService.put(producto).subscribe(()=> this.mensajesService.add({ severity: 'success', summary: '', detail: "La puja ha sido exitosa" }))
      this.pujasService.create({usuario: localStorage.getItem("idUser") as string, producto: producto.id as string}).subscribe()
    }
  }

  get idUser() {
    return localStorage.getItem("idUser")
  }
}
