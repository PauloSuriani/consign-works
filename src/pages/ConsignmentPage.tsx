import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

export function ConsignmentPage() {
  const [custommerInfo, setCustommerInfo] = useState<CustommerProps>();
  const [orders, setOrders] = useState(Array<Orders>);
  const [parcialSums, setParcialSums] = useState(Array<number>);
  const [totalSum, setTotalSum] = useState<number>();

  const location = useLocation();

  useEffect(() => {
    setOrders(location.state.stateData.stateAux);
    setCustommerInfo(location.state.stateData.custommerStateAux[0]);
    console.log('lalala: ', custommerInfo, custommerMock);
  }, []);

  const custommerMock: CustommerProps = {
    id: 1,
    contato: "POLICARPO QUARESMA",
    razao_social: 'POLICARPO QUARESMA',
    nome_fantasia: 'POLICARPO QUARESMA',
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
      {/* -----======== Menu CheckOut ========----- */}
      <section className="close-order-section" style={{ minHeight: '48px' }}>
        {/* Botão Somar */}
        <svg
          cursor={'pointer'}
          className="svg-nav-style svg-icon"
          viewBox="0 0 20 20"
        >
          <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
        </svg>
        {/* Botão Impressão  */}
        <svg
          cursor={'pointer'}
          className="svg-icon svg-nav-style"
          viewBox="0 0 20 20"
        >
          <path d="M17.453,12.691V7.723 M17.453,12.691V7.723 M1.719,12.691V7.723 M18.281,12.691V7.723 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M16.625,6.066h-1.449V3.168c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.187-0.414,0.414v2.898H3.375c-0.913,0-1.656,0.743-1.656,1.656v4.969c0,0.913,0.743,1.656,1.656,1.656h1.449v2.484c0,0.228,0.187,0.414,0.414,0.414h9.523c0.229,0,0.414-0.187,0.414-0.414v-2.484h1.449c0.912,0,1.656-0.743,1.656-1.656V7.723C18.281,6.81,17.537,6.066,16.625,6.066 M5.652,3.582h8.695v2.484H5.652V3.582zM14.348,16.418H5.652v-4.969h8.695V16.418z M17.453,12.691c0,0.458-0.371,0.828-0.828,0.828h-1.449v-2.484c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.186-0.414,0.414v2.484H3.375c-0.458,0-0.828-0.37-0.828-0.828V7.723c0-0.458,0.371-0.828,0.828-0.828h13.25c0.457,0,0.828,0.371,0.828,0.828V12.691z M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312M7.309,15.383h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,15.383,7.309,15.383 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555"></path>
        </svg>
        {/* Exibição do cálculo */}
        {totalSum &&
          <div style={{ marginInlineEnd: '22px', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
            <label>Total</label>
            <label style={{ fontSize: '28px' }}>
              {`R$ ` + totalSum.toFixed(2)}
            </label>
          </div>
        }
      </section>
    </div>
  )
}
