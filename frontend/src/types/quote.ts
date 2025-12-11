import { Furniture, Variante } from './furniture';
export interface QuoteItem {
  mueble: Furniture;
  variante?: Variante;
  cantidad: number;
}

// Structure for sending to backend
export interface CreateQuoteRequest {
  cliente: string;
  items: {
    muebleId: string;
    varianteId?: string;
    cantidad: number;
  }[];
}

// Structure received from backend
export interface Quote {
  id: string;
  cliente: string;
  fecha: string;
  total: number;
  items: {
    id: string;
    muebleNombre: string;
    varianteNombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
  }[];
  estado: 'PENDIENTE' | 'CONFIRMADA';
}