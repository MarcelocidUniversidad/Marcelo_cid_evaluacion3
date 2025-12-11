import React, { useState } from 'react';
import { Furniture, FurnitureType, Variante } from '../types/furniture';
import { QuoteItem } from '../types/quote';
import { FurnitureCard } from '../components/FurnitureCard';
import { QuoteCart } from '../components/QuoteCart';
import { api } from '../services/api';
import { Search, Filter } from 'lucide-react';
interface UserViewProps {
  items: Furniture[];
}
export function UserView({
  items
}: UserViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<FurnitureType | 'Todos'>('Todos');
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filteredItems = items.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos' || item.tipo === selectedType;
    return matchesSearch && matchesType;
  });
  const handleAddToQuote = (item: Furniture, variante: Variante | undefined, cantidad: number) => {
    setQuoteItems([...quoteItems, {
      mueble: item,
      variante,
      cantidad
    }]);
  };
  const handleRemoveQuoteItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };
  const handleSubmitQuote = async () => {
    if (quoteItems.length === 0) return;
    const clientName = prompt('Por favor ingresa tu nombre para la cotización:');
    if (!clientName) return;
    setIsSubmitting(true);
    try {
      await api.cotizaciones.create({
        cliente: clientName,
        items: quoteItems.map(item => ({
          muebleId: item.mueble.id,
          varianteId: item.variante?.id,
          cantidad: item.cantidad
        }))
      });
      alert('¡Cotización creada con éxito! Un asesor te contactará pronto.');
      setQuoteItems([]);
    } catch (error) {
      console.error(error);
      alert('Error al crear la cotización. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Hero Section */}
      <div className="bg-amber-900 rounded-2xl p-8 md:p-12 text-center text-amber-50 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Encuentra el mueble perfecto para tu hogar
          </h2>
          <p className="text-amber-200 text-lg mb-8">
            Diseños exclusivos, materiales de primera calidad y el confort que
            tu familia merece.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input type="text" placeholder="Buscar sillas, mesas, estilos..." className="w-full pl-10 pr-4 py-3 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['Todos', 'Silla', 'Sillón', 'Mesa', 'Estante', 'Cajón'] as const).map(type => <button key={type} onClick={() => setSelectedType(type)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === type ? 'bg-amber-800 text-white shadow-md transform scale-105' : 'bg-white text-stone-600 hover:bg-amber-50 border border-stone-200'}`}>
            {type}
          </button>)}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? filteredItems.map(item => <FurnitureCard key={item.id} item={item} onAddToQuote={handleAddToQuote} />) : <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
              <Filter className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-900">
              No se encontraron resultados
            </h3>
            <p className="text-stone-500">
              Intenta con otros términos de búsqueda o filtros.
            </p>
          </div>}
      </div>

      <QuoteCart items={quoteItems} onRemoveItem={handleRemoveQuoteItem} onSubmitQuote={handleSubmitQuote} isSubmitting={isSubmitting} />
    </div>;
}