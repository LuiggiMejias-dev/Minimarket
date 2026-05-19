import React, { useState } from 'react';
import { Plus, LayoutGrid, Apple, Cookie, Milk, CupSoda, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductosView = ({ productosFiltrados, carrito, agregarAlCarrito }) => {
  // Este estado controla qué categoría está activa
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  // Definimos las categorías que van a salir como botones seleccionables
  const categorias = [
    { id: 'Todos', label: 'Todos', icon: <LayoutGrid size={14} /> },
    { id: 'Abarrotes', label: 'Abarrotes', icon: <ShoppingBag size={14} /> },
    { id: 'Lácteos', label: 'Lácteos', icon: <Milk size={14} /> },
    { id: 'Panadería', label: 'Panadería', icon: <Cookie size={14} /> },
    { id: 'Bebidas', label: 'Bebidas', icon: <CupSoda size={14} /> },
    { id: 'Limpieza', label: 'Limpieza', icon: <Sparkles size={14} /> },
    { id: 'Frutas y Verduras', label: 'Frutas y Veg', icon: <Apple size={14} /> },
  ];

  // AQUÍ SE HACE LA MAGIA: Filtramos el arreglo para que SOLO se reflejen los productos de la categoría elegida
  const productosFiltradosPorCategoria = productosFiltrados.filter(prod => {
    if (categoriaSeleccionada === 'Todos') return true; // Si es 'Todos', pasan todos
    return prod.categoria === categoriaSeleccionada; // Si no, solo pasa el que coincida
  });

  return (
    <div className="flex-1 overflow-y-auto min-h-0 pr-1 h-full flex flex-col gap-6">
      
      {/* TÍTULO DE LA VISTA */}
      <div className="shrink-0">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Productos</h2>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">
          Catálogo general disponible
        </p>
      </div>

      {/* BOTONES SELECCIONABLES DE CATEGORÍAS */}
      <div className="shrink-0 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categorias.map(cat => {
          const isActive = categoriaSeleccionada === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs tracking-wide border transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' // Estilo seleccionado (Azul como tus botones)
                  : 'bg-white text-slate-500 border-slate-200/60 hover:bg-slate-50 hover:text-slate-900' // Estilo apagado
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* GRILLA DINÁMICA (Cambia al instante según lo que selecciones arriba) */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-4">
        {productosFiltradosPorCategoria.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200/40 rounded-[2rem]">
            <p className="text-slate-400 font-bold text-sm">No hay productos en esta categoría por ahora</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {productosFiltradosPorCategoria.map(prod => {
              const enCarro = carrito.find(item => item.id === prod.id)?.cantidad || 0;
              const stockDisponible = prod.stock - enCarro;

              return (
                <div 
                  key={prod.id}
                  className="bg-white border border-slate-200/60 p-5 rounded-[2rem] shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden group hover:shadow-md hover:border-slate-300/60 transition-all duration-200"
                >
                  <div>
                    <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full mb-3">
                      {prod.categoria}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base tracking-tight mb-1 line-clamp-2 min-h-[3rem]">
                      {prod.nombre}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Stock: <span className="tabular-nums">{stockDisponible}</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                    <p className="text-xl font-black text-slate-900 tabular-nums">S/ {prod.precio.toFixed(2)}</p>
                    <button
                      onClick={() => agregarAlCarrito(prod)}
                      disabled={stockDisponible <= 0}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 font-bold shadow-md shadow-blue-500/10"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};