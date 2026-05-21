import React, { useState } from 'react';
import { Search, Plus, LayoutGrid, Apple, Cookie, Milk, CupSoda, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductosView = ({ productos, carrito, agregarAlCarrito }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const categorias = [
    { id: 'Todos', label: 'Todos', icon: <LayoutGrid size={14} /> },
    { id: 'Abarrotes', label: 'Abarrotes', icon: <ShoppingBag size={14} /> },
    { id: 'Lácteos', label: 'Lácteos', icon: <Milk size={14} /> },
    { id: 'Panadería', label: 'Panadería', icon: <Cookie size={14} /> },
    { id: 'Bebidas', label: 'Bebidas', icon: <CupSoda size={14} /> },
    { id: 'Limpieza', label: 'Limpieza', icon: <Sparkles size={14} /> },
    { id: 'Frutas y Verduras', label: 'Frutas y Veg', icon: <Apple size={14} /> },
  ];

  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaSeleccionada === 'Todos' || p.categoria === categoriaSeleccionada)
  );

  return (
    <div className="flex-1 overflow-y-auto h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Catálogo</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Explora nuestros productos</p>
        </div>
        
        {/* BUSCADOR CORREGIDO: outline-none y focus ring suave */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-64 bg-white border border-slate-200 rounded-2xl px-10 py-3 text-sm font-bold shadow-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categorias.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategoriaSeleccionada(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs tracking-wide border transition-all ${
              categoriaSeleccionada === cat.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {productosFiltrados.map(prod => {
          const enCarro = carrito.find(item => item.id === prod.id)?.cantidad || 0;
          const stockDisponible = prod.stock - enCarro;

          return (
            <div key={prod.id} className="bg-white border border-slate-200 p-5 rounded-[2rem] shadow-sm flex flex-col justify-between gap-4">
              <div>
                <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full mb-3">{prod.categoria}</span>
                <h3 className="font-bold text-slate-900 text-base mb-1">{prod.nombre}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Stock: {stockDisponible}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <p className="text-xl font-black text-slate-900">S/ {prod.precio.toFixed(2)}</p>
                <button
                  onClick={() => agregarAlCarrito(prod)}
                  disabled={stockDisponible <= 0}
                  className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};