import { Producto } from "./producto"

export interface Puja {
  usuario: string,
  producto: string
}

export interface PujaResponse {
  ok: boolean,
  pujas: PujaContent[]
}

export interface PujaContent {
  producto: Producto,
  usuario: any,
  id: string
}
