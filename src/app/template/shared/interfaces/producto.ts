export interface Producto {
  nombre: string,
  descripcion: string,
  pujaInicial: number
  puja: number
  cerrado: Boolean,
  usuario: any,
  pujante: any,
  img: string,
  id?: string,
  _id?: string
}

export interface ProductoResponse {
  ok: boolean,
  productos: Producto[]
}
