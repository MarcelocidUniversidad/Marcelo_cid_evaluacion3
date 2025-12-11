import { API_CONFIG } from '../config';
import { Furniture } from '../types/furniture';
import { CreateQuoteRequest, Quote } from '../types/quote';

const headers = {
  'Content-Type': 'application/json'
};

const mapBackendMuebleToFrontend = (data: any): Furniture => {
  return {
    id: String(data.id),
    nombre: data.nombre,
    tipo: data.tipo,
    material: data.material,
    size: data.tamanio === 'PEQUENO' ? 'Pequeño' : 
          data.tamanio === 'MEDIANO' ? 'Mediano' : 
          data.tamanio === 'GRANDE' ? 'Grande' : 'Mediano',
    style: 'Moderno',
    precio: data.precioBase,
    base: data.precioBase,
    stock: data.stock,
    estado: data.estado,
    descripcion: `Mueble de tipo ${data.tipo} hecho de ${data.material}`,
    variantes: []
  };
};

const mapFrontendMuebleToBackend = (data: Omit<Furniture, 'id'>) => {
  return {
    nombre: data.nombre,
    tipo: data.tipo,
    material: data.material,
    tamanio: data.size === 'Pequeño' ? 'PEQUENO' : 
             data.size === 'Mediano' ? 'MEDIANO' : 
             data.size === 'Grande' ? 'GRANDE' : 'MEDIANO',
    precioBase: data.base,
    stock: data.stock,
    estado: data.estado
  };
};

const mapBackendCotizacionToFrontend = (data: any): Quote => {
  return {
    id: String(data.id),
    cliente: "Cliente", // Backend doesn't store client name yet
    fecha: data.fecha,
    total: data.total,
    estado: data.estado,
    items: data.detalles ? data.detalles.map((d: any) => ({
      id: String(d.id),
      muebleNombre: d.mueble ? d.mueble.nombre : 'Unknown',
      varianteNombre: d.variante ? d.variante.nombre : '',
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal
    })) : []
  };
};

export const api = {
  muebles: {
    getAll: async (): Promise<Furniture[]> => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MUEBLES}`);
      if (!res.ok) throw new Error('Error al obtener muebles');
      const data = await res.json();
      return data.map(mapBackendMuebleToFrontend);
    },
    getActive: async (): Promise<Furniture[]> => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MUEBLES}/activos`);
      if (!res.ok) throw new Error('Error al obtener muebles activos');
      const data = await res.json();
      return data.map(mapBackendMuebleToFrontend);
    },
    create: async (data: Omit<Furniture, 'id'>): Promise<Furniture> => {
      const backendData = mapFrontendMuebleToBackend(data);
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MUEBLES}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(backendData)
      });
      if (!res.ok) throw new Error('Error al crear mueble');
      const newData = await res.json();
      return mapBackendMuebleToFrontend(newData);
    },
    update: async (id: string, data: Partial<Furniture>): Promise<Furniture> => {
      // Partial update is tricky if we map specific fields. 
      // Assuming full object or specific fields. For now, try to map what we can.
      // If data.size is present, map it.
      const backendData: any = {};
      if (data.nombre) backendData.nombre = data.nombre;
      if (data.tipo) backendData.tipo = data.tipo;
      if (data.material) backendData.material = data.material;
      if (data.size) backendData.tamanio = data.size === 'Pequeño' ? 'PEQUENO' : data.size === 'Mediano' ? 'MEDIANO' : 'GRANDE';
      if (data.base) backendData.precioBase = data.base;
      if (data.stock) backendData.stock = data.stock;
      if (data.estado) backendData.estado = data.estado;

      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MUEBLES}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(backendData)
      });
      if (!res.ok) throw new Error('Error al actualizar mueble');
      const newData = await res.json();
      return mapBackendMuebleToFrontend(newData);
    },
    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MUEBLES}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Error al eliminar mueble');
    }
  },
  cotizaciones: {
    getAll: async (): Promise<Quote[]> => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTIZACIONES}`);
      if (!res.ok) throw new Error('Error al obtener cotizaciones');
      const data = await res.json();
      return data.map(mapBackendCotizacionToFrontend);
    },
    create: async (data: CreateQuoteRequest): Promise<Quote> => {
      const backendPayload = {
        detalles: data.items.map(item => ({
          mueble: { id: parseInt(item.muebleId) },
          variante: item.varianteId ? { id: parseInt(item.varianteId) } : null,
          cantidad: item.cantidad
        }))
      };
      
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTIZACIONES}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(backendPayload)
      });
      if (!res.ok) throw new Error('Error al crear cotización');
      const newData = await res.json();
      return mapBackendCotizacionToFrontend(newData);
    },
    confirm: async (id: string): Promise<Quote> => {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTIZACIONES}/${id}/confirmar`, {
        method: 'POST'
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Error al confirmar venta');
      }
      const newData = await res.json();
      return mapBackendCotizacionToFrontend(newData);
    }
  }
};