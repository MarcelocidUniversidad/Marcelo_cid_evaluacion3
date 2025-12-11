import React from 'react';
interface StockBadgeProps {
  stock: number;
}
export function StockBadge({
  stock
}: StockBadgeProps) {
  if (stock === 0) {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        Agotado
      </span>;
  }
  if (stock < 5) {
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
        ¡Últimas {stock} unidades!
      </span>;
  }
  return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
      {stock} en stock
    </span>;
}