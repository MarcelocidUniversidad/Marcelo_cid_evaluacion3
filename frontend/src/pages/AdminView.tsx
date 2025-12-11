import React, { useEffect, useState } from 'react';
import { Furniture } from '../types/furniture';
import { Quote } from '../types/quote';
import { FurnitureTable } from '../components/FurnitureTable';
import { FurnitureForm } from '../components/FurnitureForm';
import { QuoteList } from '../components/QuoteList';
import { Button } from '../components/ui/Button';
import { Plus, Package, FileText } from 'lucide-react';
import { api } from '../services/api';
interface AdminViewProps {
  items: Furniture[];
  onAdd: (item: Omit<Furniture, 'id'>) => void;
  onUpdate: (id: string, item: Omit<Furniture, 'id'>) => void;
  onDelete: (id: string) => void;
  refreshData: () => void;
}
export function AdminView({
  items,
  onAdd,
  onUpdate,
  onDelete,
  refreshData
}: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'quotes'>('inventory');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Furniture | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    if (activeTab === 'quotes') {
      loadQuotes();
    }
  }, [activeTab]);
  const loadQuotes = async () => {
    try {
      const data = await api.cotizaciones.getAll();
      setQuotes(data);
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  };
  const handleConfirmSale = async (id: string) => {
    try {
      await api.cotizaciones.confirm(id);
      alert('Venta confirmada y stock actualizado');
      loadQuotes();
      refreshData(); // Refresh furniture stock
    } catch (error) {
      alert('Error al confirmar venta: ' + error);
    }
  };
  const handleEdit = (item: Furniture) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };
  const handleSubmit = (data: Omit<Furniture, 'id'>) => {
    if (editingItem) {
      onUpdate(editingItem.id, data);
    } else {
      onAdd(data);
    }
    handleCloseForm();
  };
  return <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Panel de Administración
          </h2>
          <p className="text-stone-500">
            Gestiona inventario, cotizaciones y ventas.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant={activeTab === 'inventory' ? 'primary' : 'outline'} onClick={() => setActiveTab('inventory')}>
            <Package className="mr-2 h-4 w-4" />
            Inventario
          </Button>
          <Button variant={activeTab === 'quotes' ? 'primary' : 'outline'} onClick={() => setActiveTab('quotes')}>
            <FileText className="mr-2 h-4 w-4" />
            Cotizaciones
          </Button>
        </div>
      </div>

      {activeTab === 'inventory' && <>
          {!isFormOpen && <div className="flex justify-end">
              <Button onClick={() => setIsFormOpen(true)} className="shadow-md hover:shadow-lg transition-all">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Mueble
              </Button>
            </div>}

          {isFormOpen ? <div className="max-w-3xl mx-auto">
              <FurnitureForm initialData={editingItem} onSubmit={handleSubmit} onCancel={handleCloseForm} />
            </div> : <FurnitureTable items={items} onEdit={handleEdit} onDelete={onDelete} />}
        </>}

      {activeTab === 'quotes' && <QuoteList quotes={quotes} onConfirmSale={handleConfirmSale} />}
    </div>;
}