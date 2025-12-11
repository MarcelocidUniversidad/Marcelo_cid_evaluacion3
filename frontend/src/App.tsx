import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { UserView } from './pages/UserView';
import { AdminView } from './pages/AdminView';
import { Furniture } from './types/furniture';
import { api } from './services/api';
import { Loader2 } from 'lucide-react';
export function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [furnitureItems, setFurnitureItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadFurniture = async () => {
    setLoading(true);
    try {
      const data = isAdmin ? await api.muebles.getAll() : await api.muebles.getActive();
      setFurnitureItems(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los muebles. Asegúrate que el backend esté corriendo en puerto 8080.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadFurniture();
  }, [isAdmin]);
  // CRUD Operations Wrappers
  const handleAddFurniture = async (newItem: Omit<Furniture, 'id'>) => {
    try {
      await api.muebles.create(newItem);
      loadFurniture();
    } catch (err) {
      alert('Error al crear mueble');
    }
  };
  const handleUpdateFurniture = async (id: string, updatedData: Omit<Furniture, 'id'>) => {
    try {
      await api.muebles.update(id, updatedData);
      loadFurniture();
    } catch (err) {
      alert('Error al actualizar mueble');
    }
  };
  const handleDeleteFurniture = async (id: string) => {
    try {
      await api.muebles.delete(id);
      loadFurniture();
    } catch (err) {
      alert('Error al eliminar mueble');
    }
  };
  return <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Header isAdmin={isAdmin} onToggleView={setIsAdmin} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {loading ? <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div> : error ? <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-600 font-medium">{error}</p>
            <button onClick={loadFurniture} className="mt-4 text-sm text-red-700 underline hover:text-red-800">
              Reintentar
            </button>
          </div> : isAdmin ? <AdminView items={furnitureItems} onAdd={handleAddFurniture} onUpdate={handleUpdateFurniture} onDelete={handleDeleteFurniture} refreshData={loadFurniture} /> : <UserView items={furnitureItems} />}
      </main>

      <footer className="bg-stone-900 text-stone-400 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-lg text-stone-300 mb-2">
            Mueblería Los Muebles Hermanos S.A.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>;
}