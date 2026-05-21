import React, { useState, useRef } from 'react';
import { PlusCircle, X, CheckCircle, AlertTriangle } from 'lucide-react'; // Añadimos AlertTriangle

export const InventarioView = ({ productos, onAgregarProducto }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('unidad');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  
  const modalRef = useRef(null);
  const categories = ['Abarrotes', 'Lácteos', 'Panadería', 'Bebidas', 'Limpieza', 'Frutas y Verduras'];

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMostrarModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoria) return;

    onAgregarProducto({ 
      id: Date.now(), 
      nombre, 
      precio: parseFloat(precio), 
      stock: parseInt(stock), 
      categoria, 
      tipo 
    });

    setNombre(''); setPrecio(''); setStock(''); setCategoria(''); setTipo('unidad');
    setMostrarModal(false);
    setMostrarExito(true);
    setTimeout(() => setMostrarExito(false), 2500);
  };

  return (
    <div className="h-full w-full flex flex-col gap-6 p-2">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Inventario</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gestión de existencias</p>
        </div>
        <button onClick={() => setMostrarModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
          <PlusCircle size={18} /> Nuevo Producto
        </button>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden shadow-sm">
        <div className="h-full overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-slate-400 text-[10px] uppercase font-black border-b border-slate-100">
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4 text-center">Tipo</th>
                <th className="p-4 text-right">Precio</th>
                <th className="p-4 text-center">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {productos.map((prod) => {
                const stockBajo = prod.stock <= 5; // Lógica de alerta
                return (
                  <tr key={prod.id} className="hover:bg-slate-50 text-sm">
                    <td className="p-4 font-bold text-slate-900">{prod.nombre}</td>
                    <td className="p-4"><span className="px-2.5 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase">{prod.categoria}</span></td>
                    <td className="p-4 text-center text-slate-400 font-bold text-xs uppercase">{prod.tipo}</td>
                    <td className="p-4 text-right font-mono font-bold">S/ {prod.precio.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <div className={`flex items-center justify-center gap-2 font-mono font-bold px-3 py-1 rounded-lg ${stockBajo ? 'bg-red-50 text-red-600' : 'bg-slate-100'}`}>
                        {stockBajo && <AlertTriangle size={14} />}
                        {prod.stock}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
          <div ref={modalRef} className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMostrarModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X /></button>
            <h3 className="text-xl font-black mb-6">Registrar nuevo artículo</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Nombre del producto" className="w-full p-4 bg-slate-50 rounded-xl outline-none" value={nombre} onChange={e => setNombre(e.target.value)} required />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" step="0.01" placeholder="Precio (S/)" className="w-full p-4 bg-slate-50 rounded-xl outline-none" value={precio} onChange={e => setPrecio(e.target.value)} required />
                <input type="number" placeholder="Stock Inicial" className="w-full p-4 bg-slate-50 rounded-xl outline-none" value={stock} onChange={e => setStock(e.target.value)} required />
              </div>
              <select className="w-full p-4 bg-slate-50 rounded-xl outline-none cursor-pointer text-slate-700" value={categoria} onChange={e => setCategoria(e.target.value)} required>
                <option value="" disabled>Selecciona una categoría...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button type="button" onClick={() => setTipo('unidad')} className={`flex-1 py-3 rounded-lg font-bold text-xs uppercase transition-all ${tipo === 'unidad' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>Unidad</button>
                <button type="button" onClick={() => setTipo('peso')} className={`flex-1 py-3 rounded-lg font-bold text-xs uppercase transition-all ${tipo === 'peso' ? 'bg-white shadow-sm' : 'text-slate-400'}`}>Peso (KG)</button>
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-blue-700 mt-2">Registrar en Inventario</button>
            </form>
          </div>
        </div>
      )}

      {mostrarExito && (
        <div className="fixed top-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-2xl flex items-center gap-3 z-50 shadow-lg">
          <CheckCircle size={18} /> Producto agregado correctamente
        </div>
      )}
    </div>
  );
};