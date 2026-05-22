import React, { useState } from 'react';
import { VentasView } from './Components/VentasView';
import { ProductosView } from './Components/ProductosView';
import { InventarioView } from './Components/InventarioView';
import { HistorialView } from './Components/HistorialView';
import { ReportesView } from './Components/ReportesView';
import { ShoppingBag, Package, History, Boxes, Store, User, PieChart } from 'lucide-react';
import { PRODUCTOS_BASE } from './Constants/productos.js';

export default function App() {
  const [vistaActiva, setVistaActiva] = useState('ventas');
  const [carrito, setCarrito] = useState([]);
  const [historialVentas, setHistorialVentas] = useState([]);
  const [productos, setProductos] = useState(PRODUCTOS_BASE);

  // --- Lógica del Sistema ---
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        if (existe.cantidad >= producto.stock) return prev;
        return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const modificarCantidad = (id, incremento) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + incremento;
        if (nuevaCantidad <= 0) return null;
        if (nuevaCantidad > item.stock) return item;
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }).filter(Boolean));
  };

  const eliminarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id));
  
  const registrarVenta = (total) => {
    const nuevaVenta = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      items: carrito,
      total: total
    };
    setHistorialVentas(prev => [nuevaVenta, ...prev]);
    setCarrito([]);
    setVistaActiva('historial');
  };

  const agregarNuevoProducto = (nuevoProd) => setProductos(prev => [nuevoProd, ...prev]);

  const totalVenta = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex antialiased font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
            <Store size={20} />
          </div>
          <div>
            <h1 className="font-black text-slate-900 leading-tight">MiniMarket</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Sistema POS</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'ventas', icon: <ShoppingBag size={18} />, label: 'Ventas' },
            { id: 'productos', icon: <Package size={18} />, label: 'Productos' },
            { id: 'inventario', icon: <Boxes size={18} />, label: 'Inventario' },
            { id: 'historial', icon: <History size={18} />, label: 'Historial' },
            { id: 'reportes', icon: <PieChart size={18} />, label: 'Reportes' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setVistaActiva(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                vistaActiva === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><User size={16}/></div>
          <span className="text-xs font-bold text-slate-400">Admin User</span>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/50 backdrop-blur-md border-b border-slate-200/60 px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Sistema Activo</span>
            </div>
          </div>
          {/* CAMBIO: Ahora muestra CAJA 1 en lugar de la fecha */}
          <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest bg-slate-200/50 px-4 py-2 rounded-full">
            CAJA 1
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          {vistaActiva === 'ventas' && (
            <VentasView 
              carrito={carrito} 
              modificarCantidad={modificarCantidad} 
              eliminarDelCarrito={eliminarDelCarrito} 
              totalVenta={totalVenta} 
              registrarVenta={registrarVenta} 
            />
          )}
          {vistaActiva === 'productos' && (
            <ProductosView 
              productos={productos} 
              carrito={carrito} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          )}
          {vistaActiva === 'inventario' && (
            <InventarioView 
              productos={productos} 
              onAgregarProducto={agregarNuevoProducto} 
            />
          )}
          {vistaActiva === 'historial' && (
            <HistorialView historial={historialVentas} />
          )}
          {vistaActiva === 'reportes' && (
            <ReportesView historial={historialVentas} />
          )}
        </main>
      </div>
    </div>
  );
}