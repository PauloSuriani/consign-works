import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { api_url } from '../../serverUrl';
import { CustommerCard } from "../components/CustommerCard";

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




export function ConsignmentPage() {
  const [orders, setOrders] = useState(Array<Orders>);
  const [parcialSums, setParcialSums] = useState(Array<number>);
  const [custommerData, setCustommerData] = useState(Object);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  console.log(location.state);
  // if (!orders)  setOrders(location.state.stateData.stateAux);
  
  useEffect(() => {
    setOrders(location.state.stateData.stateAux);


  }, []);

  const custommerMock  = {
    id: 1,
    contato: "FLÁVIO DINO",
    razao_social: 'GOVERNO FEDERAL JUSTO',
    nome_fantasia: 'MINISTRO DA JUSTIÇA',
    rua: 'RUA ESPLANADA DOS MINISTÉRIOS',
    nro: '1266',
    bairro: 'MARTINS',
    telefone: '(34) 99667 3334',
    cnpj: '132164978036',
    email: 'flaviodino@gov.com.br',
    cidade: 'Brasília',
    uf: "DF"
  }

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
    console.log('parcialsums: ', parcialSums)

  }

  return (
    <div style={{backgroundColor: 'whitesmoke', fontWeight: 'normal'}}>
      <h1>
      { CustommerCard(custommerMock, [], null) }
        Cabeçalho padrão Cliente</h1>
      {
        orders.map((order, i) => {
          return <ol>
            <li className="order-line">
              <div style={{ minWidth: '260px' }}>{order && order.nomeProduto}</div>
              <div>{order && order.qtdeDeixada}</div>
              {/* <input type="text" className="input-financeiro" pattern="[0-9]*" inputMode="numeric" placeholder="Digite um valor numérico" required/> */}

              <input id={`${i}`} onChange={evt => updateInputValue(evt)} type="text" required inputMode="numeric" pattern="[0-9]*" className="input-financeiro" style={{ marginInlineStart: '-80px', marginInlineEnd: '40px', marginBottom: '2px' }} size={1} ></input>
              <div>{order && order.preco}</div>
              <div>{typeof(parcialSums[i]) === 'string' &&( parcialSums[i] * parseFloat(order.preco)).toFixed(2)}</div>
            </li>
          </ol>
        })
      }
      <button>Calcular</button>
      <button>Fechar</button>
    </div>
  )
}
