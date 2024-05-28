import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';
import { Producto, ProductoResponse } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  baseUrl = enviroment.api
  productoURL = this.baseUrl + enviroment.producto
constructor() { }

  get(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>("http://localhost:3000/api/producto")
  }

  getId(id: string): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>("http://localhost:3000/api/producto/" + id)
  }

  create(producto: Producto) {
    return this.http.post("http://localhost:3000/api/producto", producto)
  }

  put(producto: Producto) {
    return this.http.put("http://localhost:3000/api/producto/" + producto.id, producto)
  }

}
