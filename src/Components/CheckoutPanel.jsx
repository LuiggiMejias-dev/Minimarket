import React, { useState } from 'react';
import { Delete, Banknote, CreditCard, Smartphone, CheckCircle2, XCircle, ShoppingCart, QrCode, CreditCard as CardIcon } from 'lucide-react';

export const CheckoutPanel = ({ total, onClearCart, onOpenCart }) => {
  const [montoRecibido, setMontoRecibido] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");

  // NUEVO: Estado para controlar las pantallas de éxito o anulación
  // Valores posibles: 'EXITO', 'ANULADO', null
  const [estadoTransaccion, setEstadoTransaccion] = useState(null);

  const vuelto = montoRecibido ? parseFloat(montoRecibido) - total : 0;

  const presionarTecla = (tecla) => {
    if (estadoTransaccion) return; // Bloquear teclado si muestra estado
    if (tecla === 'C') setMontoRecibido("");
    else if (tecla === 'DEL') setMontoRecibido(prev => prev.slice(0, -1));
    else if (montoRecibido.length < 8) setMontoRecibido(prev => prev + tecla);
  };

  const seleccionarMetodo = (id) => {
    if (estadoTransaccion) return;
    setMetodoPago(id);
    setMontoRecibido(""); 
  };

  // ACCIÓN: Procesar Cierre Exitoso
  const handleFinalizarVenta = () => {
    if (total === 0) return;
    if (metodoPago === 'efectivo' && vuelto < 0) return;

    setEstadoTransaccion('EXITO');

    // Espera 3 segundos mostrando éxito, limpia el carrito de App y regresa al estado inicial
    setTimeout(() => {
      onClearCart();
      setMontoRecibido("");
      setEstadoTransaccion(null);
    }, 3000);
  };

  // ACCIÓN: Procesar Anulación
  const handleAnularVenta = () => {
    if (total === 0 && montoRecibido === "") return;

    setEstadoTransaccion('ANULADO');

    // Espera 2.5 segundos mostrando anulación, limpia todo y regresa al estado inicial
    setTimeout(() => {
      onClearCart();
      setMontoRecibido("");
      setEstadoTransaccion(null);
    }, 2500);
  };

  const teclas = [
    "7", "8", "9",
    "4", "5", "6",
    "1", "2", "3",
    "0", ".", "00"
  ];

  // ========================================================
  // INTERFACES INTERMITENTES DE ESTADO DE TRANSACCIÓN
  // ========================================================
  if (estadoTransaccion === 'EXITO') {
    return (
      <div className="bg-[#062f22] text-[#4ade80] rounded-[2.5rem] p-8 h-full flex flex-col items-center justify-center text-center border border-[#14532d] shadow-2xl animate-fade-in">
        <div className="w-20 h-20 bg-[#4ade80]/10 rounded-full flex items-center justify-center mb-6 border border-[#4ade80]/20 animate-bounce">
          <CheckCircle2 size={44} className="text-[#4ade80]" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-white mb-2">¡Venta Satisfactoria!</h3>
        <p className="text-[#4ade80]/70 text-sm max-w-xs font-medium leading-relaxed">
          La transacción se ha registrado correctamente en el sistema.
        </p>
        <div className="mt-8 bg-[#14532d]/40 border border-[#166534] px-5 py-3 rounded-2xl text-xs font-mono tracking-wider text-[#86efac]">
          TOTAL COBRADO: S/ {total.toFixed(2)}
        </div>
      </div>
    );
  }

  if (estadoTransaccion === 'ANULADO') {
    return (
      <div className="bg-[#4c0519] text-[#f43f5e] rounded-[2.5rem] p-8 h-full flex flex-col items-center justify-center text-center border border-[#881337] shadow-2xl animate-fade-in">
        <div className="w-20 h-20 bg-[#f43f5e]/10 rounded-full flex items-center justify-center mb-6 border border-[#f43f5e]/20">
          <XCircle size={44} className="text-[#f43f5e]" />
        </div>
        <h3 className="text-2xl font-black tracking-tight text-white mb-2">Venta Anulada</h3>
        <p className="text-[#f43f5e]/70 text-sm max-w-xs font-medium leading-relaxed">
          Operación cancelada por el cajero. Se han vaciado todos los registros actuales de compra.
        </p>
      </div>
    );
  }

  // ========================================================
  // TU INTERFAZ ORIGINAL (Mantenida exactamente igual)
  // ========================================================
  return (
    <div className="bg-[#0f172a] text-white rounded-[2.5rem] p-6 h-full flex flex-col border border-white/5 shadow-2xl justify-between overflow-hidden">
      
      {/* SECCIÓN 1: Encabezado general */}
      <div className="shrink-0 mb-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Punto de Venta</h2>
            <p className="text-slate-300 font-black text-xl tracking-tight mt-0.5">Control de Pago</p>
          </div>
          <button 
            onClick={onOpenCart}
            className="bg-white/5 hover:bg-white/10 p-3.5 rounded-2xl transition-all border border-white/5 relative"
          >
            <ShoppingCart size={20} className="text-slate-300" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              !
            </span>
          </button>
        </div>

        {/* Botones de Métodos de Pago */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'efectivo', icon: <Banknote size={18}/>, label: 'Efectivo' },
            { id: 'tarjeta', icon: <CreditCard size={18}/>, label: 'Tarjeta' },
            { id: 'yape', icon: <Smartphone size={18}/>, label: 'Yape' }
          ].map(metodo => (
            <button 
              key={metodo.id}
              onClick={() => seleccionarMetodo(metodo.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center transition-all ${
                metodoPago === metodo.id 
                ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/20' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              {metodo.icon}
              <span className="text-[9px] font-black uppercase tracking-tighter">{metodo.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECCIÓN 2: Renderizado Condicional Adaptativo (Efectivo / Yape / Tarjeta) */}
      <div className="flex-1 min-h-0 flex flex-col justify-center">
        
        {metodoPago === 'yape' ? (
          /* ================= INTERFAZ DE YAPE ================= */
          <div className="bg-white/5 border border-purple-500/15 rounded-[2rem] p-4 flex flex-col items-center justify-between h-full text-center">
            <div className="flex-1 flex flex-col justify-center shrink-0">
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] mb-0.5">Monto Exacto a Yapear</p>
              <p className="text-3xl font-black text-white tracking-tighter tabular-nums">S/ {total.toFixed(2)}</p>
            </div>

            <div className="bg-white p-3.5 rounded-2xl shadow-xl flex items-center justify-center shrink-0 my-auto">
              <QrCode size={115} className="text-[#0f172a]" />
            </div>

            <div className="flex-1 flex flex-col justify-center shrink-0 w-full">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Número de Cuenta</p>
              <p className="text-lg font-black text-white tracking-wide leading-none">987 654 321</p>
              <p className="text-[10px] font-black text-purple-400/80 mt-1 uppercase tracking-wider">MiniMarket S.A.C.</p>
            </div>
          </div>

        ) : metodoPago === 'tarjeta' ? (
          /* ================= INTERFAZ NUEVA DE TARJETA ================= */
          <div className="bg-white/5 border border-blue-500/15 rounded-[2rem] p-4 flex flex-col items-center justify-between h-full text-center">
            
            {/* Bloque superior - Monto */}
            <div className="flex-1 flex flex-col justify-center shrink-0">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-0.5">Monto a Cobrar POS</p>
              <p className="text-3xl font-black text-white tracking-tighter tabular-nums">S/ {total.toFixed(2)}</p>
            </div>

            {/* Ilustración / Animación minimalista del lector de tarjetas */}
            <div className="flex flex-col items-center justify-center my-auto py-2 shrink-0">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 animate-pulse">
                <CardIcon size={44} className="text-blue-400" />
              </div>
            </div>

            {/* Estado e instrucciones para el cajero */}
            <div className="flex-1 flex flex-col justify-center shrink-0 w-full">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Esperando Terminal</p>
              <p className="text-xs font-medium text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                Deslice, inserte o acerque la tarjeta de débito / crédito en el POS físico.
              </p>
            </div>
          </div>

        ) : (
          /* ================= INTERFAZ NORMAL (EFECTIVO) ================= */
          <div className="flex flex-col h-full justify-between">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3 shrink-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-wider">Total Mismo</span>
                <span className="text-lg font-black text-blue-400 tabular-nums">S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 mb-1.5 border-t border-white/10">
                <span className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">Monto Received</span>
                <span className="text-xl font-black text-white tabular-nums">S/ {montoRecibido || "0.00"}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">Cambio/Vuelto</span>
                <span className={`text-lg font-black tabular-nums ${vuelto >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  S/ {vuelto.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Teclado Numérico */}
            <div className="flex gap-2 flex-1 min-h-0">
              <div className="grid grid-cols-3 gap-2 flex-1">
                {teclas.map((btn) => (
                  <button 
                    key={btn}
                    onClick={() => presionarTecla(btn)}
                    className="bg-white/5 text-white rounded-xl font-black text-base flex items-center justify-center border border-white/5 hover:bg-white/10 active:scale-95 transition-all"
                  >
                    {btn}
                  </button>
                ))}
              </div>
              <div className="w-16 flex flex-col gap-2 shrink-0">
                <button 
                  onClick={() => presionarTecla('DEL')}
                  className="flex-1 bg-white/10 text-slate-300 rounded-xl flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                >
                  <Delete size={20} />
                </button>
                <button 
                  onClick={() => presionarTecla('C')}
                  className="flex-1 bg-red-500/10 text-red-400 rounded-xl font-black text-lg flex items-center justify-center hover:bg-red-500/20 active:scale-95 transition-all"
                >
                  C
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN 3: Botones de Cierre de Venta (Conectados a las nuevas funciones) */}
      <div className="grid grid-cols-2 gap-3 shrink-0 pt-3 border-t border-white/5 mt-2">
        <button 
          onClick={handleFinalizarVenta}
          disabled={total === 0 || (metodoPago === 'efectivo' && vuelto < 0)} 
          className="bg-green-600 hover:bg-green-500 disabled:opacity-20 py-4 rounded-xl font-black text-[11px] flex items-center justify-center gap-2 tracking-wider transition-all shadow-lg shadow-green-900/10 cursor-pointer disabled:cursor-not-allowed"
        >
          <CheckCircle2 size={16} /> FINALIZAR VENTA
        </button>
        <button 
          onClick={handleAnularVenta} 
          className="bg-white/5 hover:bg-red-600/20 hover:text-red-400 py-4 rounded-xl font-black text-[11px] flex items-center justify-center gap-2 tracking-wider transition-all text-slate-400 cursor-pointer"
        >
          <XCircle size={16} /> ANULAR
        </button>
      </div>

    </div>
  );
};