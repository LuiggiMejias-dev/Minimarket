import React from 'react';
import { Trash2 } from 'lucide-react';

export const CartItem = ({ item, onEliminar }) => {
  return (
    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100 group">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600 text-xs shadow-sm">
        {item.cantidad}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate">{item.nombre}</h4>
        <p className="text-[10px] text-blue-500 font-semibold">S/ {item.precio.toFixed(2)}</p>
      </div>
      <div className="text-right">
        <p className="text-xs font-black text-slate-900">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
        <button 
          onClick={() => onEliminar(item.id)}
          className="text-red-400 opacity-0 group-hover:opacity-100 transition-all"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};