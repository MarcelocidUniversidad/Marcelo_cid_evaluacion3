import React from 'react';
import { Furniture } from '../types/furniture';
import { Button } from './ui/Button';
import { Edit2, Trash2, PackageOpen } from 'lucide-react';
import { StockBadge } from './StockBadge';
interface FurnitureTableProps {
  items: Furniture[];
  onEdit: (item: Furniture) => void;
  onDelete: (id: string) => void;
}
export function FurnitureTable({
  items,
  onEdit,
  onDelete
}: FurnitureTableProps) {
  if (items.length === 0) {
    return <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100 border-dashed">
        <PackageOpen className="h-12 w-12 text-stone-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-stone-900">
          No hay muebles registrados
        </h3>
        <p className="text-stone-500">Comienza agregando nuevo inventario.</p>
      </div>;
  }
  return <div className="overflow-hidden rounded-xl border border-stone-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 text-stone-700 font-serif border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Producto</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 font-semibold">Precio Base</th>
              <th className="px-6 py-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map(item => <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-stone-900">
                    {item.nombre}
                  </div>
                  <div className="text-xs text-stone-500">
                    {item.tipo} • {item.material}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StockBadge stock={item.stock} />
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.estado === 'ACTIVO' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-stone-100 text-stone-600 border-stone-200'}`}>
                    {item.estado}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-amber-800">
                  ${item.base.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="text-stone-600 hover:text-amber-700 hover:bg-amber-50" title="Editar">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                  if (window.confirm('¿Estás seguro de desactivar este mueble?')) {
                    onDelete(item.id);
                  }
                }} className="text-stone-600 hover:text-red-700 hover:bg-red-50" title="Desactivar">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}