import React, { useState } from 'react';
import { VentasView } from './components/VentasView';
import { ProductosView } from './components/ProductosView';
import { InventarioView } from './components/InventarioView'; // Importamos la nueva sección
import { ShoppingBag, Package, Users, Search, Boxes } from 'lucide-react';
import { PRODUCTOS_BASE } from './constants/productos.js';

export default function App() {
  const [vistaActiva, setVistaActiva] = useState('ventas');
  const [carrito, setCarrito] = useState([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  
  // NUEVO: Ahora el inventario de productos vive en el estado global para ser dinámico
  const [productos, setProductos] = useState(PRODUCTOS_BASE);

  // Funciones globales del Carrito
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

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const limpiarCarrito = () => setCarrito([]);

  const totalVenta = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  // NUEVO: Función para dar de alta un nuevo producto desde el Inventario
  const agregarNuevoProducto = (nuevoProd) => {
    setProductos(prev => [nuevoProd, ...prev]); // Los pone al inicio de la lista
  };

  // Filtrado usando el buscador superior sobre el estado dinámico
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex antialiased font-sans">
      
      {/* SIDEBAR IZQUIERDO */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0">
        <div>
          <div className="flex items-center gap-3 px-3 py-4 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">MiniMarket</span>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setVistaActiva('ventas')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                vistaActiva === 'ventas'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <ShoppingBag size={18} />
              Ventas
            </button>
            <button
              onClick={() => setVistaActiva('productos')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                vistaActiva === 'productos'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Package size={18} />
              Productos
            </button>
            
            {/* NUEVO BOTÓN DE INVENTARIO (AHORA ACTIVO) */}
            <button
              onClick={() => setVistaActiva('inventario')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                vistaActiva === 'inventario'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Boxes size={18} />
              Inventario
            </button>

            <button className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm text-slate-400 cursor-not-allowed opacity-60">
              <Users size={18} />
              Clientes
            </button>
          </nav>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER TOP */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-4 flex justify-between items-center shrink-0">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar productos por nombre..."
              value={filtroBusqueda}
              onChange={(e) => setFiltroBusqueda(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cajero Activo</p>
              <p className="text-sm font-bold text-slate-900">Luiggi Admin</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white shadow-md shadow-blue-500/10"></div>
          </div>
        </header>

        {/* CONTENIDO INTERCAMBIABLE TRIPLE */}
        <div className="flex-1 overflow-hidden p-8 bg-slate-50">
          {vistaActiva === 'ventas' ? (
            <VentasView 
              carrito={carrito}
              modificarCantidad={modificarCantidad}
              eliminarDelCarrito={eliminarDelCarrito}
              totalVenta={totalVenta}
              limpiarCarrito={limpiarCarrito}
              setVistaActiva={setVistaActiva}
            />
          ) : vistaActiva === 'productos' ? (
            <ProductosView 
              productosFiltrados={productosFiltrados}
              carrito={carrito}
              agregarAlCarrito={agregarAlCarrito}
            />
          ) : (
            /* RENDERIZADO DEL NUEVO INVENTARIO */
            <InventarioView 
              productos={productos}
              onAgregarProducto={agregarNuevoProducto}
            />
          )}
        </div>

      </div>
    </div>
  );
}