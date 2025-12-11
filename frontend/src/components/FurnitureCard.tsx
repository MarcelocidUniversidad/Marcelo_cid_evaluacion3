import React, { useState } from 'react';
import { Furniture, Variante } from '../types/furniture';
import { Tag, Maximize2, Palette } from 'lucide-react';
import { Button } from './ui/Button';
import { StockBadge } from './StockBadge';
import { Select } from './ui/Select';
interface FurnitureCardProps {
  item: Furniture;
  onAddToQuote: (item: Furniture, variante: Variante | undefined, cantidad: number) => void;
}
export function FurnitureCard({
  item,
  onAddToQuote
}: FurnitureCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  // Mock variants if none exist (for demo purposes if backend doesn't return them yet)
  const variants = item.variantes || [{
    id: 'normal',
    nombre: 'Normal',
    precioAdicional: 0
  }, {
    id: 'premium',
    nombre: 'Barniz Premium',
    precioAdicional: 25.0
  }, {
    id: 'lujo',
    nombre: 'Acabado de Lujo',
    precioAdicional: 50.0
  }];
  const selectedVariant = variants.find(v => v.id === selectedVariantId) || variants[0];
  const finalPrice = item.base + (selectedVariant?.precioAdicional || 0);
  const getIcon = () => {
    return <div className="w-full h-48 bg-amber-100 flex items-center justify-center text-amber-300 mb-4 rounded-md overflow-hidden relative group-hover:bg-amber-200 transition-colors">
        <div className="h-16 w-16 opacity-50" />
      </div>;
  };
  return <div className={`group bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full ${item.stock === 0 ? 'opacity-75 grayscale' : ''}`}>
      <div className="p-4 flex-1 flex flex-col">
        <div className="relative">
          {getIcon()}
          <div className="absolute top-2 right-2">
            <StockBadge stock={item.stock} />
          </div>
        </div>

        <div className="flex justify-between items-start mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            {item.tipo}
          </span>
          <span className="font-serif text-lg font-bold text-amber-900">
            ${finalPrice.toLocaleString()}
          </span>
        </div>

        <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
          {item.nombre}
        </h3>

        <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-1">
          {item.descripcion}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 mb-4 bg-stone-50 p-3 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-amber-600" />
            <span>{item.material}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-amber-600" />
            <span>{item.size}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Tag className="h-3.5 w-3.5 text-amber-600" />
            <span>Estilo {item.style}</span>
          </div>
        </div>

        {item.stock > 0 && <div className="mb-4">
            <label className="text-xs font-medium text-stone-700 block mb-1">
              Variante:
            </label>
            <select className="w-full text-sm border-stone-300 rounded-md focus:ring-amber-500 focus:border-amber-500" value={selectedVariantId} onChange={e => setSelectedVariantId(e.target.value)}>
              {variants.map(v => <option key={v.id} value={v.id}>
                  {v.nombre}{' '}
                  {v.precioAdicional > 0 ? `(+$${v.precioAdicional})` : ''}
                </option>)}
            </select>
          </div>}
      </div>

      <div className="p-4 pt-0 mt-auto">
        <Button variant="outline" className="w-full border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-900" onClick={() => onAddToQuote(item, selectedVariant, 1)} disabled={item.stock === 0}>
          {item.stock === 0 ? 'Sin Stock' : 'Agregar a Cotización'}
        </Button>
      </div>
    </div>;
}