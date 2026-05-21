import React from 'react';
import { TrendingUp, DollarSign, Package } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { dia: 'Lun', ventas: 400 },
  { dia: 'Mar', ventas: 300 },
  { dia: 'Mié', ventas: 600 },
  { dia: 'Jue', ventas: 450 },
  { dia: 'Vie', ventas: 800 },
  { dia: 'Sáb', ventas: 950 },
  { dia: 'Dom', ventas: 700 },
];

export const ReportesView = ({ historial }) => {
  // 1. Cálculo de ganancias
  const totalGanancias = historial.reduce((sum, v) => sum + v.total, 0);

  // 2. Cálculo del producto más vendido
  const conteoProductos = {};
  historial.forEach(venta => {
    venta.items.forEach(item => {
      conteoProductos[item.nombre] = (conteoProductos[item.nombre] || 0) + item.cantidad;
    });
  });

  const nombreTop = Object.keys(conteoProductos).reduce((a, b) => 
    conteoProductos[a] > conteoProductos[b] ? a : b, 'Ninguno'
  );

  return (
    <div className="h-full flex flex-col gap-6">
      <h2 className="text-2xl font-black text-slate-900">Dashboard de Ventas</h2>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><DollarSign size={20} /></div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Total Ganancias</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900">S/ {totalGanancias.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><TrendingUp size={20} /></div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Ventas Totales</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{historial.length} transacciones</h3>
        </div>

        {/* TARJETA CORREGIDA: Muestra el producto más vendido */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Package size={20} /></div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Producto Estrella</p>
          </div>
          <h3 className="text-2xl font-black text-slate-900 truncate">{nombreTop}</h3>
          <p className="text-xs font-bold text-indigo-600">Más vendido en el historial</p>
        </div>
      </div>

      {/* Gráfica Simulada */}
      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <div className="mb-6">
          <h3 className="font-black text-slate-900">Tendencia de Ventas (Semanal)</h3>
          <p className="text-xs text-slate-400 font-bold">Resumen de ingresos de los últimos 7 días</p>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="#2563eb" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};