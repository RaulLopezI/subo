export interface Producto {
  nombre: string,
  usuario: any
 }

 export interface ProductoResponse {
    ok: boolean,
    productos: Producto[]
 }
