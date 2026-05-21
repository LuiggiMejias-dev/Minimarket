import React, { useState } from 'react';
import { Receipt, Calendar, Filter } from 'lucide-react';

export const HistorialView = ({ historial = [] }) => {
  const [filtroTiempo, setFiltroTiempo] = useState('todo'); // 'todo', 'hoy', 'semana', 'mes'

  // Lógica de filtrado basada en la fecha
  const ventasFiltradas = historial.filter(venta => {
    const fechaVenta = new Date(venta.id); // Usamos el ID (timestamp) como fecha
    const hoy = new Date();
    
    if (filtroTiempo === 'hoy') {
      return fechaVenta.toDateString() === hoy.toDateString();
    }
    if (filtroTiempo === 'semana') {
      const unaSemanaAtras = new Date();
      unaSemanaAtras.setDate(hoy.getDate() - 7);
      return fechaVenta >= unaSemanaAtras;
    }
    if (filtroTiempo === 'mes') {
      return fechaVenta.getMonth() === hoy.getMonth() && fechaVenta.getFullYear() === hoy.getFullYear();
    }
    return true;
  });

  const totalAcumulado = ventasFiltradas.reduce((sum, v) => sum + v.total, 0);

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
      {/* HEADER Y FILTROS */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Receipt size={24} />
            </div>
            <h2 className="text-xl font-black text-slate-900">Historial de Ventas</h2>
          </div>
          <p className="text-sm text-slate-400">Gestiona y visualiza el rendimiento de tus ventas</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          {['todo', 'hoy', 'semana', 'mes'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltroTiempo(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                filtroTiempo === f ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* TARJETA DE RESUMEN */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400">Total Recaudado</p>
          <p className="text-2xl font-black text-slate-900">S/{totalAcumulado.toFixed(2)}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-[10px] uppercase font-bold text-slate-400">Ventas Realizadas</p>
          <p className="text-2xl font-black text-slate-900">{ventasFiltradas.length}</p>
        </div>
      </div>

      {/* TABLA DE VENTAS */}
      <div className="flex-1 overflow-auto">
        {ventasFiltradas.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-slate-400">
            <Filter size={40} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No hay ventas en este periodo.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100">
                <th className="pb-4">Fecha</th>
                <th className="pb-4">Items</th>
                <th className="pb-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ventasFiltradas.map((venta) => (
                <tr key={venta.id} className="text-sm hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-600">{venta.fecha}</td>
                  <td className="py-4 text-slate-500">{venta.items.length} productos</td>
                  <td className="py-4 font-bold text-slate-900 text-right">${venta.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};