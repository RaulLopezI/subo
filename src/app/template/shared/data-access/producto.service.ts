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
    console.log(this.productoURL);

    return this.http.get<ProductoResponse>("https://suboback.onrender.com/api/producto")
  }

  getId(id: string) {
    return this.http.get("https://suboback.onrender.com/api/producto",
      {params: {id} }
    )
  }

}
