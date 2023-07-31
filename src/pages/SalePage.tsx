import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CustommerCard } from "../components/CustommerCard";
import Modal from '../components/Modal';

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

interface Orders {
  dataVenda?: Date | any,
  idConsignment: string,
  idCustommer: string,
  idProduct: string,
  nomeProduto: string,
  preco: string,
  qtdeDeixada: string | number | any,
  qtdeVendida?: string | number | any
}

export function SalePage() {
  const [custommerInfo, setCustommerInfo] = useState<CustommerProps>();
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState(Array<Orders>);
  const [parcialSums, setParcialSums] = useState(Array<number>);
  const [totalSum, setTotalSum] = useState<number>();

  const location = useLocation();


  useEffect(() => {
    setCustommerInfo(location.state.stateData.custommerStateAux[0]);

  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  function updateInputValue(event: any) {
    const value: any = event.target.value;
    const field: number = event.target.id;
    console.log('value e field: ', value, field)
    parcialSums[field] = value;
    // set
    setParcialSums((prevParcialSums) => {
      const newArray = [...prevParcialSums]; // Obtém uma cópia do array atual
      newArray[field] = value; // Insere o valor na posição especificada
      return newArray; // Define a nova cópia do array como o novo estado
    });

    setTotalSum(() => {
      let sumAux = 0;

      for (let i = 0; i < parcialSums.length; i += 1) {
        console.log('valor a ser somado no for pos, valor: ', i, parcialSums[i], parcialSums);
        if (parcialSums[i] != null) {
          sumAux += parcialSums[i] * parseFloat(orders[i].preco);
        }
      }

      return sumAux;
    })
    console.log('parcialsums: ', parcialSums)

  }

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
      <button
        onClick={handleShowModal}
      >
        Buscar Produto
      </button>
      <Modal showModal={showModal} onClose={handleCloseModal} />

      {
        // -----======== Tabela Pedido ========------
        orders.map((order, i) => {
          return <ol>
            <li className="order-line" style={{ minHeight: '42px' }}>
              {/* Nome do Produto */}
              <div style={{ minWidth: '160px', marginInlineStart: '0px', marginBlock: '0px' }}>
                {order && order.nomeProduto}
              </div>

              {/* Quantidade Deixada */}
              <div style={{ maxWidth: '18px', fontSize: '18px', marginInlineStart: '3px' }}>
                {order && order.qtdeDeixada}
              </div>

              {/* Quantidade Restante */}
              <input
                className="input-financeiro" id={`${i}`}
                onChange={evt => updateInputValue(evt)}
                inputMode="numeric" pattern="[0-9]*"
                style={{ maxWidth: '28px', marginBottom: '1px', marginInline: '4px', fontSize: '17px' }}
                required
              />

              {/* Preço */}
              <div style={{ maxWidth: '60px', fontSize: '18px' }}>
                {order && `x ` + order.preco}
              </div>

              {/* Total Individual */}
              <div style={{ maxWidth: '100px', fontSize: '18px' }}>
                {typeof (parcialSums[i]) === 'string' && (parcialSums[i] * parseFloat(order.preco)).toFixed(2)}
              </div>
            </li>

          </ol>
        })
      }

      {/* ... */}
    </div>
  )
}