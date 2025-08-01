import { useEffect, useState } from "react";
import Custommer from "../../interfaces/Custommer";

type Props = {
  customer: Custommer;
  visited: boolean;
  consignmentQueue: number[];
  openConsignmentScreen: (id: number) => void;
  newSaleScreen: (id: number) => void;
  onMarkVisited: (id: number) => void;
};

const CustomerCard: React.FC<Props> = ({
  customer,
  visited,
  consignmentQueue,
  openConsignmentScreen,
  newSaleScreen,
  onMarkVisited,
}) => {
  const [observation, setObservation] = useState("");
  const [expanded, setExpanded] = useState(false);

  const customerId = customer.id;

  useEffect(() => {
    const saved = localStorage.getItem(`note_${customerId}`);
    if (saved) {
      setObservation(saved);
    } else if (customer.notes) {
      setObservation(customer.notes);
    }
  }, [customerId, customer.notes]);

  useEffect(() => {
    localStorage.setItem(`note_${customerId}`, observation);
  }, [observation, customerId]);

  const isInQueue = consignmentQueue.includes(customerId);

  const handleExpandToggle = () => setExpanded((prev) => !prev);

  const cardBgClass = getCardBackground(customer.inDebt, visited);

  return (
    <div className={`rounded-lg p-2 font-mono ${cardBgClass}`}>
      <div className="flex justify-between">
        <div>
          <div>{customer.contato}</div>
          <div>{customer.cidade} - {customer.uf}</div>
          <div>{customer.rua}{customer.nro !== 'S/N' ? `, ${customer.nro}` : ''} - {customer.bairro}</div>
        </div>

        <button onClick={handleExpandToggle} className="ml-auto">
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      <div className="flex justify-between mt-2">
        <div className="font-semibold">
          {customer.nomeFantasia || customer.razaoSocial}
        </div>

        <div className="flex gap-2">
          {customer.inDebt ? (
            <span className="bg-red-500 text-white px-2 rounded-sm">Débito</span>
          ) : null }
          {isInQueue ? (
            <button
              className="bg-yellow-500 px-2 rounded-sm"
              onClick={() => !customer.inDebt && openConsignmentScreen(customerId)}
            >
              Consignado
            </button>
          ) : (
            <button
              className="bg-green-700 text-white px-2 rounded-sm"
              onClick={() => newSaleScreen(customerId)}
            >
              Vender
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="mt-3 border-t pt-2">
          <div>R. Social: {customer.razaoSocial}</div>
          <div>Telefone: {customer.telefone}</div>
          <div>Email: {customer.email}</div>
          <div>CNPJ: {customer.cnpj}</div>
          <textarea
            className="w-full mt-2 p-1 border"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Observações..."
          />
           {!visited && (
      <button
        onClick={() => onMarkVisited(customerId)}
        className="mt-2 bg-consigna text-white px-3 py-1 rounded shadow"
      >
        Marcar como visitado
      </button>
    )}
        </div>
      )}
    </div>
  );
};

// Helper
function getCardBackground(inDebt: boolean, visited: boolean): string {
  if (inDebt && visited) {
    return "bg-red-200 bg-[repeating-linear-gradient(-45deg,_#fecaca_0,_#fecaca_5px,_#fee2e2_5px,_#fee2e2_10px),_repeating-linear-gradient(45deg,_#d1d5db_0,_#d1d5db_5px,_#e5e7eb_5px,_#e5e7eb_10px)] border border-red-500";
  }
  if (inDebt) return "bg-[repeating-linear-gradient(-45deg,_#fecaca_0,_#fecaca_5px,_#fee2e2_5px,_#fee2e2_10px)] border border-red-500";
  if (visited) return "bg-[repeating-linear-gradient(-45deg,_#d1d5db_0,_#d1d5db_5px,_#e5e7eb_5px,_#e5e7eb_10px)]";
  return "bg-gray-100";
}

export default CustomerCard;
