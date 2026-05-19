import React from 'react';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CheckoutPanel } from './CheckoutPanel';

export const VentasView = ({ carrito, modificarCantidad, eliminarDelCarrito, totalVenta, limpiarCarrito, setVistaActiva }) => {
  return (
    <div className="flex-1 flex overflow-hidden gap-8 h-full">
      
      {/* TABLA DE PRODUCTOS ESCOGIDOS */}
      <div className="flex-1 bg-white border border-slate-200/60 rounded-[2rem] p-6 flex flex-col shadow-sm overflow-hidden">
        <div className="mb-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Ventas</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Lista de productos escogidos</p>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 border border-slate-100 rounded-2xl">
          {carrito.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <p className="text-slate-400 font-bold text-sm">No hay productos seleccionados en la venta</p>
              <button 
                onClick={() => setVistaActiva('productos')}
                className="mt-3 text-xs font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all"
              >
                Ir al Catálogo de Productos
              </button>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Producto</th>
                  <th className="py-4 px-4 text-center">Cantidad</th>
                  <th className="py-4 px-4 text-right">Precio Unitario</th>
                  <th className="py-4 px-4 text-right">Subtotal</th>
                  <th className="py-4 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-700">
                {carrito.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{item.nombre}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2 bg-slate-100 p-1 rounded-xl w-24 mx-auto border border-slate-200/40">
                        <button 
                          onClick={() => modificarCantidad(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-slate-900 min-w-4 text-center tabular-nums">{item.cantidad}</span>
                        <button 
                          onClick={() => modificarCantidad(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:bg-slate-50 active:scale-95 transition-all"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right tabular-nums font-medium text-slate-500">S/ {item.precio.toFixed(2)}</td>
                    <td className="py-4 px-4 text-right tabular-nums font-bold text-slate-900">S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* PANEL POS DE COBRO DERECHO */}
      <div className="w-[400px] shrink-0 h-full">
        <CheckoutPanel 
          total={totalVenta} 
          onClearCart={limpiarCarrito}
        />
      </div>

    </div>
  );
};