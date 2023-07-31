import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CustommerCard } from "../components/CustommerCard";

type CustommerProps = {
  id: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  rua?: string;
  nro?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string;
  cidade?: string;
  uf?: string;
}

export function SalePage() {
  const [custommerInfo, setCustommerInfo] = useState<CustommerProps>();

  const location = useLocation();


  useEffect(() => {
    setCustommerInfo(location.state.stateData.custommerStateAux[0]);
    
  }, []);

  return (
    <div style={{ backgroundColor: 'whitesmoke', fontWeight: 'normal' }}>

      {/* Cabeçalho do Pedido */}
      <div className="custommer-card-roll">
        <div className="custommer-card-style" >
          {
            custommerInfo && CustommerCard(custommerInfo!, [], () => null, () => null)
          }
        </div>
      </div>

      {/* ... */}
    </div>
  )
}