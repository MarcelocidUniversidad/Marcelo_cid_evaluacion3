export type FurnitureType = 'Silla' | 'Sillón' | 'Mesa' | 'Estante' | 'Cajón';
export type FurnitureSize = 'Pequeño' | 'Mediano' | 'Grande';
export type FurnitureStyle = 'Moderno' | 'Clásico' | 'Rústico' | 'Industrial';
export type FurnitureStatus = 'ACTIVO' | 'INACTIVO';
export interface Variante {
  id?: string;
  nombre: string;
  precioAdicional: number;
}
export interface Furniture {
  id: string;
  nombre: string; // Changed from name to match backend likely convention or mapped
  tipo: FurnitureType;
  material: string;
  size: FurnitureSize; // mapped to 'tamano' in backend? Keeping frontend consistent for now
  style: FurnitureStyle;
  precio: number; // Final calculated price
  base: number; // Base price
  stock: number;
  estado: FurnitureStatus;
  descripcion: string; // Changed from description
  variantes?: Variante[];
}
export const FURNITURE_TYPES: FurnitureType[] = ['Silla', 'Sillón', 'Mesa', 'Estante', 'Cajón'];
export const FURNITURE_SIZES: FurnitureSize[] = ['Pequeño', 'Mediano', 'Grande'];
export const FURNITURE_STYLES: FurnitureStyle[] = ['Moderno', 'Clásico', 'Rústico', 'Industrial'];
export const FURNITURE_STATUSES: FurnitureStatus[] = ['ACTIVO', 'INACTIVO'];