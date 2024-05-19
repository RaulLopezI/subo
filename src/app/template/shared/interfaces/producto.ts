export interface Producto {
  nombre: string,
  descripcion: string,
  pujaInicial: number
  puja: number
  cerrado: Boolean,
  usuario: any,
}

export interface ProductoResponse {
  ok: boolean,
  productos: Producto[]
}
