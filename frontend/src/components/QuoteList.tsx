import React from 'react';
import { Quote } from '../types/quote';
import { Button } from './ui/Button';
import { CheckCircle, Clock } from 'lucide-react';
interface QuoteListProps {
  quotes: Quote[];
  onConfirmSale: (id: string) => void;
}
export function QuoteList({
  quotes,
  onConfirmSale
}: QuoteListProps) {
  return <div className="space-y-4">
      <h3 className="text-xl font-serif font-bold text-stone-900 mb-4">
        Cotizaciones Recientes
      </h3>

      {quotes.length === 0 ? <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100 border-dashed">
          <p className="text-stone-500">No hay cotizaciones registradas.</p>
        </div> : <div className="grid gap-4">
          {quotes.map(quote => <div key={quote.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-stone-900">
                    {quote.cliente}
                  </h4>
                  <p className="text-sm text-stone-500">
                    ID: {quote.id} •{' '}
                    {new Date(quote.fecha).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${quote.estado === 'CONFIRMADA' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {quote.estado === 'CONFIRMADA' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {quote.estado}
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-4 mb-4 space-y-2">
                {quote.items.map(item => <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-700">
                      {item.cantidad}x {item.muebleNombre}{' '}
                      <span className="text-stone-400">
                        ({item.varianteNombre})
                      </span>
                    </span>
                    <span className="font-medium text-stone-900">
                      ${item.subtotal.toLocaleString()}
                    </span>
                  </div>)}
                <div className="border-t border-stone-200 pt-2 mt-2 flex justify-between font-bold text-stone-900">
                  <span>Total</span>
                  <span>${quote.total.toLocaleString()}</span>
                </div>
              </div>

              {quote.estado === 'PENDIENTE' && <div className="flex justify-end">
                  <Button onClick={() => onConfirmSale(quote.id)} className="bg-green-600 hover:bg-green-700 text-white">
                    Confirmar Venta
                  </Button>
                </div>}
            </div>)}
        </div>}
    </div>;
}