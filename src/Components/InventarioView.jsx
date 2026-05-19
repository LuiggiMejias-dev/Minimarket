import React, { useState } from 'react';
import { PlusCircle, Package, CircleDollarSign, Layers, Boxes, CheckCircle } from 'lucide-react';

export const InventarioView = ({ productos, onAgregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('Abarrotes');
  const [tipo, setTipo] = useState('unidad');
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !stock) return;

    const nuevoProducto = {
      id: productos.length + 1, 
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      categoria,
      tipo
    };

    onAgregarProducto(nuevoProducto);
    setNombre('');
    setPrecio('');
    setStock('');
    setCategoria('Abarrotes');
    setTipo('unidad');

    setMostrarExito(true);
    setTimeout(() => setMostrarExito(false), 2500);
  };

  const categories = ['Abarrotes', 'Lácteos', 'Panadería', 'Bebidas', 'Limpieza', 'Frutas y Verduras'];

  return (
    <div className="flex gap-6 h-full w-full min-h-0 overflow-hidden relative bg-slate-50 p-2">
      
      {/* ALERTA DE ÉXITO */}
      {mostrarExito && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-white px-6 py-3.5 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/20 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle size={18} />
          <p className="margin-0 font-black text-xs uppercase tracking-wider">Producto registrado</p>
        </div>
      )}

      {/* SECCIÓN IZQUIERDA: TABLA BLANCA PREMIUM */}
      <div className="flex-1 bg-white border border-slate-200 rounded-[32px] p-6 flex flex-col overflow-hidden shadow-sm">
        <div className="mb-5 flex-shrink-0">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Inventario de Almacén</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">Monitoreo de existencias y control de mercancía</p>
        </div>

        <div className="flex-1 overflow-y-auto border border-slate-100 rounded-2xl">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 text-center w-16">ID</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4 text-center">Tipo</th>
                <th className="p-4 text-right">Precio</th>
                <th className="p-4 text-center">Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600 font-semibold divide-y divide-slate-50">
              {productos.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-center text-slate-400 font-mono text-xs">#{prod.id}</td>
                  <td className="p-4 font-extrabold text-slate-900">{prod.nombre}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full">
                      {prod.categoria}
                    </span>
                  </td>
                  <td className="p-4 text-center text-xs uppercase text-slate-400 font-bold">{prod.tipo}</td>
                  <td className="p-4 text-right font-bold text-slate-900 font-mono">S/ {prod.precio.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <span className={`font-mono font-bold px-2.5 py-1 rounded-lg text-xs ${prod.stock === 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
                      {prod.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECCIÓN DERECHA: FORMULARIO OSCURO MINIMALISTA */}
      <div className="w-[360px] bg-slate-900 rounded-[32px] p-7 flex flex-col flex-shrink-0 shadow-xl shadow-slate-900/30 border border-slate-800">
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between">
          
          <div className="flex flex-col gap-5">
            {/* Header del Formulario */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <PlusCircle size={20} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">Nuevo Ingreso</h3>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">Formulario de registro</p>
              </div>
            </div>

            {/* Input: Nombre */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider pl-1">Nombre del artículo</label>
              <div className="relative">
                <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Arroz Faraón 1kg"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pt-3.5 pb-3.5 pl-11 pr-4 text-white text-sm font-medium placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Grid: Precio y Stock */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider pl-1">Precio Venta</label>
                <div className="relative">
                  <CircleDollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pt-3.5 pb-3.5 pl-11 pr-4 text-white text-sm font-bold font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider pl-1">Cant. Inicial</label>
                <div className="relative">
                  <Boxes size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pt-3.5 pb-3.5 pl-11 pr-4 text-white text-sm font-bold font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Selector: Categoría */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider pl-1">Agrupar en Categoría</label>
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pt-3.5 pb-3.5 pl-11 pr-4 text-white text-sm font-semibold appearance-none focus:outline-none focus:border-blue-500 cursor-pointer transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Switch Toggle: Tipo Distribución */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider pl-1">Esquema de Distribución</label>
              <div className="flex gap-1 p-1 bg-slate-950 border border-slate-800/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => setTipo('unidad')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${tipo === 'unidad' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' : 'text-slate-500 hover:text-slate-400'}`}
                >
                  Por Unidad
                </button>
                <button
                  type="button"
                  onClick={() => setTipo('peso')}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${tipo === 'peso' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' : 'text-slate-500 hover:text-slate-400'}`}
                >
                  Al Peso (KG)
                </button>
              </div>
            </div>
          </div>

          {/* Botón de Envío Metálico */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-500 active:scale-[0.99] transition-all shadow-lg shadow-blue-600/20 mt-6"
          >
            Registrar en Almacén
          </button>

        </form>
      </div>

    </div>
  );
};