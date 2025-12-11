import React, { useEffect, useState } from 'react';
import { Furniture, FURNITURE_TYPES, FURNITURE_SIZES, FURNITURE_STYLES, FURNITURE_STATUSES, FurnitureType, FurnitureSize, FurnitureStyle, FurnitureStatus } from '../types/furniture';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { X } from 'lucide-react';
interface FurnitureFormProps {
  initialData?: Furniture | null;
  onSubmit: (data: Omit<Furniture, 'id'>) => void;
  onCancel: () => void;
}
export function FurnitureForm({
  initialData,
  onSubmit,
  onCancel
}: FurnitureFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    type: 'Silla' as FurnitureType,
    material: '',
    size: 'Mediano' as FurnitureSize,
    style: 'Moderno' as FurnitureStyle,
    base: '',
    stock: '',
    estado: 'ACTIVO' as FurnitureStatus,
    descripcion: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre,
        type: initialData.tipo,
        material: initialData.material,
        size: initialData.size,
        style: initialData.style,
        base: initialData.base.toString(),
        stock: initialData.stock.toString(),
        estado: initialData.estado,
        descripcion: initialData.descripcion
      });
    }
  }, [initialData]);
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.material.trim()) newErrors.material = 'El material es requerido';
    if (!formData.base || Number(formData.base) <= 0) newErrors.base = 'El precio base debe ser mayor a 0';
    if (!formData.stock || Number(formData.stock) < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        nombre: formData.nombre,
        tipo: formData.type,
        material: formData.material,
        size: formData.size,
        style: formData.style,
        base: Number(formData.base),
        precio: Number(formData.base),
        stock: Number(formData.stock),
        estado: formData.estado,
        descripcion: formData.descripcion,
        variantes: [] // Variants managed separately for now
      });
    }
  };
  return <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif font-bold text-stone-900">
          {initialData ? 'Editar Mueble' : 'Registrar Nuevo Mueble'}
        </h2>
        <button onClick={onCancel} className="text-stone-400 hover:text-stone-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nombre del Producto" placeholder="Ej. Silla Imperial" value={formData.nombre} onChange={e => setFormData({
          ...formData,
          nombre: e.target.value
        })} error={errors.nombre} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Precio Base ($)" type="number" min="0" step="0.01" value={formData.base} onChange={e => setFormData({
            ...formData,
            base: e.target.value
          })} error={errors.base} />
            <Input label="Stock Inicial" type="number" min="0" value={formData.stock} onChange={e => setFormData({
            ...formData,
            stock: e.target.value
          })} error={errors.stock} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select label="Tipo" options={FURNITURE_TYPES} value={formData.type} onChange={e => setFormData({
          ...formData,
          type: e.target.value as FurnitureType
        })} />

          <Select label="Tamaño" options={FURNITURE_SIZES} value={formData.size} onChange={e => setFormData({
          ...formData,
          size: e.target.value as FurnitureSize
        })} />

          <Select label="Estilo" options={FURNITURE_STYLES} value={formData.style} onChange={e => setFormData({
          ...formData,
          style: e.target.value as FurnitureStyle
        })} />

          <Select label="Estado" options={FURNITURE_STATUSES} value={formData.estado} onChange={e => setFormData({
          ...formData,
          estado: e.target.value as FurnitureStatus
        })} />
        </div>

        <Input label="Material" placeholder="Ej. Madera de Roble, Vidrio Templado..." value={formData.material} onChange={e => setFormData({
        ...formData,
        material: e.target.value
      })} error={errors.material} />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-700">
            Descripción
          </label>
          <textarea className={`flex min-h-[100px] w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`} placeholder="Describe los detalles del mueble..." value={formData.descripcion} onChange={e => setFormData({
          ...formData,
          descripcion: e.target.value
        })} />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {initialData ? 'Guardar Cambios' : 'Registrar Mueble'}
          </Button>
        </div>
      </form>
    </div>;
}