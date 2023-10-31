import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CustommerCard } from "../../components/cards/CustommerCard";
import Modal from '../../components/modals/SalesModal';
import ExitToHomeConfirmation from '../../components/modals/ExitToHomeConfirmation';
import CheckOutSaleModal from '../../components/modals/CheckOutSaleModal';

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
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [orders, setOrders] = useState(Array<Orders>);
  const [parcialSums, setParcialSums] = useState(Array<number>);
  const [totalSum, setTotalSum] = useState<number>(0);

  const location = useLocation();
  const navigate = useNavigate();




  useEffect(() => {
    setCustommerInfo(location.state.stateData.custommerStateAux[0]);

  }, []);

  const handleShowCheckOut = () => {
    setShowCheckOut(true);
  };

  const handleCloseCheckOut = () => {
    setShowCheckOut(false);
  };

  const handleShowConfirmation = () => {
    setShowExitConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowExitConfirmation(false);
  };

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

  const updateOrders = (updatedOrders: Array<Orders>) => {
    setOrders(updatedOrders);
  
    // Recalcula o valor total do pedido
    
    let sum = 0;
    updatedOrders.forEach(order => {
      const inputValueAux = order.preco.replace(',', '');
      const inputValue = inputValueAux.replace('R$ ', '');

      // const precoNumber = parseFloat(order.preco.replace("R$ ", ""));
      const subtotal = order.qtdeDeixada * parseFloat(inputValue);
      console.log('somadora: ', subtotal, order.qtdeDeixada)
      sum += subtotal / 100;
    });
    setTotalSum(sum);
  };
  


  const exitToHome = () => {

    navigate('/');
  }

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: 'whitesmoke', fontWeight: 'normal' }}>


      {/* Menu Barra Fixada */}
      <div className="div-svg-btn-fixed">
        {/* Informação Dinâmica: à definir */}
        {/* <h2>{`${toPrintQueue.length === 0
              ? ''
              : toPrintQueue.length === 1
                ? `${toPrintQueue.length} selecionado`
                : `${toPrintQueue.length} selecionados`}`}
            </h2> */}
        {/* Botão Ação SVG */}
        <section className="open-order-to-fixed-section">

          {/* <div style={{ paddingTop: '0px' }}>
              <svg cursor={'pointer'} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
                <path d="M7.93,4.509H9.62v1.689c0,0.233,0.189,0.422,0.422,0.422s0.422-0.189,0.422-0.422V4.509h1.689c0.233,0,0.423-0.189,0.423-0.422s-0.189-0.422-0.423-0.422h-1.689V1.975c0-0.233-0.189-0.422-0.422-0.422S9.62,1.742,9.62,1.975v1.689H7.93c-0.233,0-0.422,0.189-0.422,0.422S7.697,4.509,7.93,4.509 M18.489,8.311H1.595c-0.466,0-0.845,0.378-0.845,0.845V10c0,0.466,0.378,0.845,0.845,0.845h0.169l1.533,7.282l0.007-0.001c0.046,0.183,0.205,0.321,0.402,0.321h12.67c0.198,0,0.356-0.139,0.403-0.321l0.007,0.001l1.533-7.282h0.169c0.466,0,0.845-0.379,0.845-0.845V9.155C19.334,8.689,18.955,8.311,18.489,8.311 M2.626,10.845H5.53l0.266,1.689H2.982L2.626,10.845z M3.16,13.379h2.769l0.267,1.689H3.515L3.16,13.379z M4.049,17.603l-0.355-1.689h2.636l0.267,1.689H4.049z M9.62,17.603H7.441l-0.267-1.689H9.62V17.603z M9.62,15.068H7.041l-0.267-1.689H9.62V15.068z M9.62,12.534H6.641l-0.266-1.689H9.62V12.534z M12.644,17.603h-2.179v-1.689h2.446L12.644,17.603zM13.043,15.068h-2.579v-1.689h2.845L13.043,15.068z M10.464,12.534v-1.689h3.245l-0.266,1.689H10.464z M16.035,17.603h-2.548l0.268-1.689h2.636L16.035,17.603z M16.569,15.068h-2.682l0.267-1.689h2.77L16.569,15.068z M17.103,12.534h-2.814l0.267-1.689h2.903L17.103,12.534z M18.489,10H1.595V9.155h16.895V10z"></path>
              </svg>
              <div>
                Novo Produto
              </div>
            </div> */}
          <div
            onClick={handleShowConfirmation}
            style={{ cursor: 'pointer', backgroundColor: '' }}
          >

            <svg className="svg-nav-style svg-icon" viewBox="0 0 20 20">
              <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
            </svg>
            <div>
              Tela Inicial
            </div>
          </div>
          <div>
            <svg
              // onClick={newScreen}
              onClick={handleShowCheckOut}
              cursor={'pointer'}
              className="svg-nav-style svg-icon"
              viewBox="0 0 20 20"
            >
              <path d="M5.229,6.531H4.362c-0.239,0-0.434,0.193-0.434,0.434c0,0.239,0.194,0.434,0.434,0.434h0.868c0.24,0,0.434-0.194,0.434-0.434C5.663,6.724,5.469,6.531,5.229,6.531 M10,6.531c-1.916,0-3.47,1.554-3.47,3.47c0,1.916,1.554,3.47,3.47,3.47c1.916,0,3.47-1.555,3.47-3.47C13.47,8.084,11.916,6.531,10,6.531 M11.4,11.447c-0.071,0.164-0.169,0.299-0.294,0.406c-0.124,0.109-0.27,0.191-0.437,0.248c-0.167,0.057-0.298,0.09-0.492,0.098v0.402h-0.35v-0.402c-0.21-0.004-0.352-0.039-0.527-0.1c-0.175-0.064-0.324-0.154-0.449-0.27c-0.124-0.115-0.221-0.258-0.288-0.428c-0.068-0.17-0.1-0.363-0.096-0.583h0.664c-0.004,0.259,0.052,0.464,0.169,0.613c0.116,0.15,0.259,0.229,0.527,0.236v-1.427c-0.159-0.043-0.268-0.095-0.425-0.156c-0.157-0.061-0.299-0.139-0.425-0.235C8.852,9.752,8.75,9.631,8.672,9.486C8.594,9.34,8.556,9.16,8.556,8.944c0-0.189,0.036-0.355,0.108-0.498c0.072-0.144,0.169-0.264,0.292-0.36c0.122-0.097,0.263-0.17,0.422-0.221c0.159-0.052,0.277-0.077,0.451-0.077V7.401h0.35v0.387c0.174,0,0.29,0.023,0.445,0.071c0.155,0.047,0.29,0.118,0.404,0.212c0.115,0.095,0.206,0.215,0.274,0.359c0.067,0.146,0.103,0.315,0.103,0.508H10.74c-0.007-0.201-0.06-0.354-0.154-0.46c-0.096-0.106-0.199-0.159-0.408-0.159v1.244c0.174,0.047,0.296,0.102,0.462,0.165c0.167,0.063,0.314,0.144,0.443,0.241c0.128,0.099,0.23,0.221,0.309,0.366c0.077,0.146,0.116,0.324,0.116,0.536C11.509,11.092,11.473,11.283,11.4,11.447 M18.675,4.795H1.326c-0.479,0-0.868,0.389-0.868,0.868v8.674c0,0.479,0.389,0.867,0.868,0.867h17.349c0.479,0,0.867-0.389,0.867-0.867V5.664C19.542,5.184,19.153,4.795,18.675,4.795M1.76,5.664c0.24,0,0.434,0.193,0.434,0.434C2.193,6.336,2,6.531,1.76,6.531S1.326,6.336,1.326,6.097C1.326,5.857,1.52,5.664,1.76,5.664 M1.76,14.338c-0.24,0-0.434-0.195-0.434-0.434c0-0.24,0.194-0.434,0.434-0.434s0.434,0.193,0.434,0.434C2.193,14.143,2,14.338,1.76,14.338 M18.241,14.338c-0.24,0-0.435-0.195-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,14.143,18.48,14.338,18.241,14.338 M18.675,12.682c-0.137-0.049-0.281-0.08-0.434-0.08c-0.719,0-1.302,0.584-1.302,1.303c0,0.152,0.031,0.297,0.08,0.434H2.981c0.048-0.137,0.08-0.281,0.08-0.434c0-0.719-0.583-1.303-1.301-1.303c-0.153,0-0.297,0.031-0.434,0.08V7.318c0.136,0.049,0.28,0.08,0.434,0.08c0.718,0,1.301-0.583,1.301-1.301c0-0.153-0.032-0.298-0.08-0.434H17.02c-0.049,0.136-0.08,0.28-0.08,0.434c0,0.718,0.583,1.301,1.302,1.301c0.152,0,0.297-0.031,0.434-0.08V12.682z M18.241,6.531c-0.24,0-0.435-0.194-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,6.336,18.48,6.531,18.241,6.531 M9.22,8.896c0,0.095,0.019,0.175,0.058,0.242c0.039,0.066,0.088,0.124,0.148,0.171c0.061,0.047,0.13,0.086,0.21,0.115c0.079,0.028,0.11,0.055,0.192,0.073V8.319c-0.21,0-0.322,0.044-0.437,0.132C9.277,8.54,9.22,8.688,9.22,8.896 M15.639,12.602h-0.868c-0.239,0-0.434,0.195-0.434,0.434c0,0.24,0.194,0.436,0.434,0.436h0.868c0.24,0,0.434-0.195,0.434-0.436C16.072,12.797,15.879,12.602,15.639,12.602 M10.621,10.5c-0.068-0.052-0.145-0.093-0.23-0.124c-0.086-0.031-0.123-0.06-0.212-0.082v1.374c0.209-0.016,0.332-0.076,0.465-0.186c0.134-0.107,0.201-0.281,0.201-0.516c0-0.11-0.02-0.202-0.062-0.277C10.743,10.615,10.688,10.551,10.621,10.5"></path>
            </svg>
            <div>
              Fechar Pedido
            </div>
          </div>
          <div onClick={handleShowModal} style={{ cursor: 'pointer', backgroundColor: '' }}>
            <svg className="svg-icon svg-nav-style" viewBox="0 0 20 20">
              <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
            </svg>

            <div>
              Novo Produto
            </div>
          </div>

        </section>

      </div>

      {/* Cabeçalho do Pedido */}
      <div style={{ marginTop: '60px' }} className="custommer-card-roll">
        <div className="custommer-card-style" >
          {
            custommerInfo && CustommerCard(custommerInfo!, [], () => null, () => null)
          }
        </div>
      </div>
      {/* <button
        onClick={handleShowModal}
      >
        Adicionar Produto
      </button> */}
      <Modal showModal={showModal} onClose={handleCloseModal} updateOrders={updateOrders} orders={orders} productsData={productsMock} />

      <ExitToHomeConfirmation showConfirmation={showExitConfirmation} onClose={handleCloseConfirmation} />

      <CheckOutSaleModal showCheckOut={showCheckOut} totalSum={totalSum} onClose={handleCloseCheckOut} />

      {
        // -----======== Tabela Pedido ========------
        orders.map((order, i) => {
          return <ol>
            <li className="order-line" style={{ minHeight: '42px' }}>
              {/* Nome do Produto */}
              <div style={{ minWidth: '160px', fontSize: '13px', marginInlineStart: '0px', marginBlock: '0px' }}>
                {order && order.nomeProduto}
              </div>

              {/* Quantidade Deixada */}
              <div style={{ maxWidth: '18px', fontSize: '13px', marginInlineStart: '3px' }}>
                {order && order.qtdeDeixada}
              </div>

              {/* Preço */}
              <div style={{ maxWidth: '100px', fontSize: '13px' }}>
                {order && `x ` + order.preco}
              </div>

              {/* Total Individual */}
              <div style={{ maxWidth: '100px', fontSize: '14px' }}>
                {typeof (parcialSums[i]) === 'string' && (parcialSums[i] * parseFloat(order.preco)).toFixed(2)}
              </div>
            </li>

          </ol>
        })
      }
       <h3 style={{marginTop: '28px', display: 'flex', flexDirection: 'row-reverse', marginInlineEnd: '24px', paddingBottom: '12px' }}>
       Total do Pedido: {totalSum.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}


       </h3>
      

      <footer className="label-footer">
        Contato - Paulo V M Suriani [paulosuriani@gmail.com]
      </footer>

    </div>
  )
}

type DropDownOption = {
  "id": number,
  "nome": string
};

const productsMock: DropDownOption[] = [
  { id: 1, nome: "Cabo USB-C para USB-A" },
  { id: 2, nome: "Carregador de Parede USB 2.4A" },
  { id: 3, nome: "Caixa de Som Bluetooth Portátil" },
  { id: 4, nome: "Fone de Ouvido Intra-auricular" },
  { id: 5, nome: "Cabo HDMI 2.0 de 1 metro" },
  { id: 6, nome: "Carregador Veicular Qualcomm Quick Charge 3.0" },
  { id: 7, nome: "Carregador Wireless para Smartphones" },
  { id: 8, nome: "Power Bank 10000mAh" },
  { id: 9, nome: "Adaptador Universal de Tomada" },
  { id: 10, nome: "Fone de Ouvido Bluetooth com Cancelamento de Ruído" },
  { id: 11, nome: "Cabo Lightning para USB" },
  { id: 12, nome: "Carregador de Parede USB-C 18W" },
  { id: 13, nome: "Caixa de Som Soundbar 2.1" },
  { id: 14, nome: "Fone de Ouvido Over-ear com Microfone" },
  { id: 15, nome: "Cabo VGA para VGA" },
  { id: 16, nome: "Carregador Wireless para Smartwatch" },
  { id: 17, nome: "Carregador Solar Portátil" },
  { id: 18, nome: "Adaptador USB para Ethernet" },
  { id: 19, nome: "Fone de Ouvido Esportivo à Prova d'Água" },
  { id: 20, nome: "Cabo DisplayPort para HDMI" },
  { id: 21, nome: "Carregador de Parede USB 3.0 com Portas Tipo-C e USB-A" },
  { id: 22, nome: "Caixa de Som Bluetooth à Prova d'Água" },
  { id: 23, nome: "Fone de Ouvido True Wireless" },
  { id: 24, nome: "Cabo Micro USB para USB-A" },
  { id: 25, nome: "Carregador Portátil sem Fio com Ventosa" },
  { id: 26, nome: "Carregador de Bateria Universal para Câmeras" },
  { id: 27, nome: "Adaptador USB-C para HDMI e USB-A" },
  { id: 28, nome: "Fone de Ouvido com Cancelamento de Ruído Ativo" },
  { id: 29, nome: "Cabo Coaxial de 1,5 metros" },
  { id: 30, nome: "Carregador de Parede com 4 Portas USB" },
];