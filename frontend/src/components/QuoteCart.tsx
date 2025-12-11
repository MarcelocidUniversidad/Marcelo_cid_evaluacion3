import React from 'react';
import { QuoteItem } from '../types/quote';
import { Button } from './ui/Button';
import { X, ShoppingCart, Send } from 'lucide-react';
interface QuoteCartProps {
  items: QuoteItem[];
  onRemoveItem: (index: number) => void;
  onSubmitQuote: () => void;
  isSubmitting: boolean;
}
export function QuoteCart({
  items,
  onRemoveItem,
  onSubmitQuote,
  isSubmitting
}: QuoteCartProps) {
  const total = items.reduce((sum, item) => {
    const price = item.mueble.base + (item.variante?.precioAdicional || 0);
    return sum + price * item.cantidad;
  }, 0);
  if (items.length === 0) return null;
  return <div className="fixed bottom-4 right-4 z-50 w-full max-w-md animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-white rounded-xl shadow-2xl border border-amber-100 overflow-hidden">
        <div className="bg-amber-900 px-4 py-3 flex items-center justify-between text-amber-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="font-medium">Tu Cotización ({items.length})</span>
          </div>
          <span className="font-bold text-lg">${total.toLocaleString()}</span>
        </div>

        <div className="max-h-64 overflow-y-auto p-4 space-y-3 bg-stone-50">
          {items.map((item, index) => <div key={index} className="flex justify-between items-start bg-white p-3 rounded-lg shadow-sm border border-stone-100">
              <div className="flex-1">
                <p className="font-medium text-stone-900 text-sm">
                  {item.mueble.nombre}
                </p>
                <p className="text-xs text-stone-500">
                  {item.variante?.nombre} • Cant: {item.cantidad}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-amber-800">
                  $
                  {((item.mueble.base + (item.variante?.precioAdicional || 0)) * item.cantidad).toLocaleString()}
                </span>
                <button onClick={() => onRemoveItem(index)} className="text-stone-400 hover:text-red-500 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>)}
        </div>

        <div className="p-4 bg-white border-t border-stone-100">
          <Button className="w-full" onClick={onSubmitQuote} isLoading={isSubmitting}>
            <Send className="w-4 h-4 mr-2" />
            Solicitar Cotización
          </Button>
        </div>
      </div>
    </div>;
}