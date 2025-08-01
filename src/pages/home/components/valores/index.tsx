import { useState } from "react";


export function ValoresRota() {
  const [showValues, setShowValues] = useState(false);
  const media = localStorage.getItem('media');
  const total = localStorage.getItem('total');
  return (
    <div
      className="p-4 grid grid-cols-2 gap-px max-w-[84vw] h-[90px] mx-auto my-3 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 shadow-md cursor-pointer"
      onClick={() => setShowValues(!showValues)}
    >
      <label className="text-gray-800">Média de Vendas</label>
      <div className="text-right text-gray-800">Total da Rota</div>

      <div className="consigna-color text-xl">
        {showValues ? `R$ ${Number(media ?? 0).toFixed(2)}` : "R$ ******"}
      </div>
      <div className="text-right consigna-color text-xl">
        {showValues ? `R$ ${Number(total ?? 0).toFixed(2)}` : "R$ ******"}
      </div>
    </div>
  );
}