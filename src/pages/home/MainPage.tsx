import { useState, useEffect } from "react";
import { CustommerCard } from "../../components/cards/CustommerCard";
import { useNavigate } from 'react-router-dom';
import { api_url } from "../../../serverUrl";

interface Route {
  contato: string,
  dataFinal?: Date | any,
  dataInicial: string,
  idFieldSeller: string,
  nomeRota: string,
  valorTotal?: number
}

interface Consignments {
  data_consignacao: Date | any,
  em_aberto: boolean,
  id: string,
  id_custommer: number,
  id_seller: string
}

interface Orders {
  dataVenda?: Date | any,
  idConsignment: string,
  idCustommer: string | number,
  idProduct: string,
  nomeProduto: string,
  preco: string,
  qtdeDeixada: string | number,
  qtdeVendida?: string | number
}

export function MainPage() {
  const [allCustommers, setAllCustommers] = useState([]);
  const [filteredCustommers, setFilteredCustommers] = useState([]);
  const [routeInfo, setRouteInfo] = useState<Route>();
  const [consignmentInfo, setConsignmentInfo] = useState(Array<Consignments>);
  const [orders, setOrders] = useState(Array<Orders>);

  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  const [checkedState, setCheckedState] = useState(
    new Array(filteredCustommers.length).fill(false)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');
    // const { token } = storage;

    if (JSON.parse(storage).token) {
      setPrintScreen(false);

      const token: string = JSON.parse(storage).token;
      console.log('tokem: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
      })
        .then(response => response.json())
        .then(() => { setIsAuthenticated(true); fillCustommers(JSON.parse(storage).id); })
        .catch(() => navigate('/login'));
    };

  }, [navigate]);

  function fillCustommers(sellerId: number) {
    const fetchUrl: string = `${BASE_URL}/routeseller/${sellerId}`;

    fetch(fetchUrl)
      .then(response => response.json())
      .then(res => { handleApiResponse(res); console.log('ia bada bada badu: ', res); })
      .catch(err => console.log(err));
  };

  function handleApiResponse(response: any) {
    setAllCustommers(response.custommersInfo);
    setFilteredCustommers(response.custommersInfo);
    setRouteInfo(response.route);
    setConsignmentInfo(response.consignOrders);
    setOrders(response.detailedOrders);

    const consignOrdersAux: Array<number> = [];
    response.consignOrders.map((consign: Consignments) => {
      consignOrdersAux.push(consign.id_custommer);
    })
    setToPrintQueue(consignOrdersAux);
  }

  // Search Engine
  function updateInputValue(event: any) {
    const value: any = event.target.value;
    const field: string = event.target.id;
    const filteredCus: [] = [];
    allCustommers.map(custommer => {
      const a: string = custommer[field] + '';
      if (a?.toLowerCase().includes(value.toLowerCase())) {
        filteredCus.push(custommer);
      }
    })
    setFilteredCustommers(filteredCus);
  }

  // ------======= Regras de Negócio ========----------
  // Direcionamento de Consignação -> Venda
  function newScreen(id: number) {
    const stateAux = [];
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].idCustommer === id) {
        stateAux.push(orders[i]);
        console.log('é igual id e idcustomer/. ', id, orders[i]);
      }
    }
    // Header Custommer
    const custommerStateAux: any = [];
    for (let i = 0; i < allCustommers.length; i += 1) {
      if (allCustommers[i]['id'] === id) {
        custommerStateAux.push(allCustommers[i]);
        console.log('Header Custommer: ', id, allCustommers[i]);
      }
    }
    const stateData = { stateAux, custommerStateAux };
    console.log('stateData: ', stateData);
    navigate('/consignment', { state: { stateData }, replace: false });
  }

  function newSaleScreen(id: number) {
    const custommerStateAux: any = [];
    for (let i = 0; i < allCustommers.length; i += 1) {
      if (allCustommers[i]['id'] === id) {
        custommerStateAux.push(allCustommers[i]);
        console.log('é igual id e idcustomer/. ', id, allCustommers[i]);
      }
    }
    const stateData = { custommerStateAux };
    navigate('/sale', { state: { stateData }, replace: false });
  }

  return (
    isAuthenticated ?
      <div style={{ backgroundColor: 'white', fontFamily: 'Arial' }} className="home-default">

        {/* Menu Barra Fixada */}
        <div 
        className="div-svg-btn-fixed">
          {/* Informação Dinâmica: à definir */}
          {/* <h2>{`${toPrintQueue.length === 0
              ? ''
              : toPrintQueue.length === 1
                ? `${toPrintQueue.length} selecionado`
                : `${toPrintQueue.length} selecionados`}`}
            </h2> */}
          {/* Botão Ação SVG */}
          <section className="open-order-to-fixed-section">

            <div style={{ paddingTop: '0px' , fontFamily: 'Arial' }}>
              <svg cursor={'pointer'} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
                <path d="M7.93,4.509H9.62v1.689c0,0.233,0.189,0.422,0.422,0.422s0.422-0.189,0.422-0.422V4.509h1.689c0.233,0,0.423-0.189,0.423-0.422s-0.189-0.422-0.423-0.422h-1.689V1.975c0-0.233-0.189-0.422-0.422-0.422S9.62,1.742,9.62,1.975v1.689H7.93c-0.233,0-0.422,0.189-0.422,0.422S7.697,4.509,7.93,4.509 M18.489,8.311H1.595c-0.466,0-0.845,0.378-0.845,0.845V10c0,0.466,0.378,0.845,0.845,0.845h0.169l1.533,7.282l0.007-0.001c0.046,0.183,0.205,0.321,0.402,0.321h12.67c0.198,0,0.356-0.139,0.403-0.321l0.007,0.001l1.533-7.282h0.169c0.466,0,0.845-0.379,0.845-0.845V9.155C19.334,8.689,18.955,8.311,18.489,8.311 M2.626,10.845H5.53l0.266,1.689H2.982L2.626,10.845z M3.16,13.379h2.769l0.267,1.689H3.515L3.16,13.379z M4.049,17.603l-0.355-1.689h2.636l0.267,1.689H4.049z M9.62,17.603H7.441l-0.267-1.689H9.62V17.603z M9.62,15.068H7.041l-0.267-1.689H9.62V15.068z M9.62,12.534H6.641l-0.266-1.689H9.62V12.534z M12.644,17.603h-2.179v-1.689h2.446L12.644,17.603zM13.043,15.068h-2.579v-1.689h2.845L13.043,15.068z M10.464,12.534v-1.689h3.245l-0.266,1.689H10.464z M16.035,17.603h-2.548l0.268-1.689h2.636L16.035,17.603z M16.569,15.068h-2.682l0.267-1.689h2.77L16.569,15.068z M17.103,12.534h-2.814l0.267-1.689h2.903L17.103,12.534z M18.489,10H1.595V9.155h16.895V10z"></path>
              </svg>
              <label style={{ paddingTop: '0px' , fontFamily: 'Arial' }}>
                Carga
              </label>
            </div>
            <div>

              <svg cursor={'pointer'} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
                <path d="M10.862,6.47H3.968v6.032h6.894V6.47z M10,11.641H4.83V7.332H10V11.641z M12.585,11.641h-0.861v0.861h0.861V11.641z M7.415,14.226h0.862v-0.862H7.415V14.226z M8.707,17.673h2.586c0.237,0,0.431-0.193,0.431-0.432c0-0.237-0.193-0.431-0.431-0.431H8.707c-0.237,0-0.431,0.193-0.431,0.431C8.276,17.479,8.47,17.673,8.707,17.673 M5.691,14.226h0.861v-0.862H5.691V14.226z M4.83,13.363H3.968v0.862H4.83V13.363z M16.895,4.746h-3.017V3.023h1.292c0.476,0,0.862-0.386,0.862-0.862V1.299c0-0.476-0.387-0.862-0.862-0.862H10c-0.476,0-0.862,0.386-0.862,0.862v0.862c0,0.476,0.386,0.862,0.862,0.862h1.293v1.723H3.106c-0.476,0-0.862,0.386-0.862,0.862v12.926c0,0.476,0.386,0.862,0.862,0.862h13.789c0.475,0,0.861-0.387,0.861-0.862V5.608C17.756,5.132,17.369,4.746,16.895,4.746 M10.862,2.161H10V1.299h0.862V2.161zM11.724,1.299h3.446v0.862h-3.446V1.299z M13.016,4.746h-0.861V3.023h0.861V4.746z M16.895,18.534H3.106v-2.585h13.789V18.534zM16.895,15.088H3.106v-9.48h13.789V15.088z M15.17,12.502h0.862v-0.861H15.17V12.502z M13.447,12.502h0.861v-0.861h-0.861V12.502zM15.17,10.778h0.862V9.917H15.17V10.778z M15.17,9.055h0.862V8.193H15.17V9.055z M16.032,6.47h-4.309v0.862h4.309V6.47zM14.309,8.193h-0.861v0.862h0.861V8.193z M12.585,8.193h-0.861v0.862h0.861V8.193z M13.447,14.226h2.585v-0.862h-2.585V14.226zM13.447,10.778h0.861V9.917h-0.861V10.778z M12.585,9.917h-0.861v0.861h0.861V9.917z"></path>
              </svg>
              <label>
                {`Viagem`}
              </label>
            </div>
            <div>
              <svg
                // onClick={newScreen}
                cursor={'pointer'}
                className="svg-nav-style svg-icon"
                viewBox="0 0 20 20"
              >
                <path d="M5.229,6.531H4.362c-0.239,0-0.434,0.193-0.434,0.434c0,0.239,0.194,0.434,0.434,0.434h0.868c0.24,0,0.434-0.194,0.434-0.434C5.663,6.724,5.469,6.531,5.229,6.531 M10,6.531c-1.916,0-3.47,1.554-3.47,3.47c0,1.916,1.554,3.47,3.47,3.47c1.916,0,3.47-1.555,3.47-3.47C13.47,8.084,11.916,6.531,10,6.531 M11.4,11.447c-0.071,0.164-0.169,0.299-0.294,0.406c-0.124,0.109-0.27,0.191-0.437,0.248c-0.167,0.057-0.298,0.09-0.492,0.098v0.402h-0.35v-0.402c-0.21-0.004-0.352-0.039-0.527-0.1c-0.175-0.064-0.324-0.154-0.449-0.27c-0.124-0.115-0.221-0.258-0.288-0.428c-0.068-0.17-0.1-0.363-0.096-0.583h0.664c-0.004,0.259,0.052,0.464,0.169,0.613c0.116,0.15,0.259,0.229,0.527,0.236v-1.427c-0.159-0.043-0.268-0.095-0.425-0.156c-0.157-0.061-0.299-0.139-0.425-0.235C8.852,9.752,8.75,9.631,8.672,9.486C8.594,9.34,8.556,9.16,8.556,8.944c0-0.189,0.036-0.355,0.108-0.498c0.072-0.144,0.169-0.264,0.292-0.36c0.122-0.097,0.263-0.17,0.422-0.221c0.159-0.052,0.277-0.077,0.451-0.077V7.401h0.35v0.387c0.174,0,0.29,0.023,0.445,0.071c0.155,0.047,0.29,0.118,0.404,0.212c0.115,0.095,0.206,0.215,0.274,0.359c0.067,0.146,0.103,0.315,0.103,0.508H10.74c-0.007-0.201-0.06-0.354-0.154-0.46c-0.096-0.106-0.199-0.159-0.408-0.159v1.244c0.174,0.047,0.296,0.102,0.462,0.165c0.167,0.063,0.314,0.144,0.443,0.241c0.128,0.099,0.23,0.221,0.309,0.366c0.077,0.146,0.116,0.324,0.116,0.536C11.509,11.092,11.473,11.283,11.4,11.447 M18.675,4.795H1.326c-0.479,0-0.868,0.389-0.868,0.868v8.674c0,0.479,0.389,0.867,0.868,0.867h17.349c0.479,0,0.867-0.389,0.867-0.867V5.664C19.542,5.184,19.153,4.795,18.675,4.795M1.76,5.664c0.24,0,0.434,0.193,0.434,0.434C2.193,6.336,2,6.531,1.76,6.531S1.326,6.336,1.326,6.097C1.326,5.857,1.52,5.664,1.76,5.664 M1.76,14.338c-0.24,0-0.434-0.195-0.434-0.434c0-0.24,0.194-0.434,0.434-0.434s0.434,0.193,0.434,0.434C2.193,14.143,2,14.338,1.76,14.338 M18.241,14.338c-0.24,0-0.435-0.195-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,14.143,18.48,14.338,18.241,14.338 M18.675,12.682c-0.137-0.049-0.281-0.08-0.434-0.08c-0.719,0-1.302,0.584-1.302,1.303c0,0.152,0.031,0.297,0.08,0.434H2.981c0.048-0.137,0.08-0.281,0.08-0.434c0-0.719-0.583-1.303-1.301-1.303c-0.153,0-0.297,0.031-0.434,0.08V7.318c0.136,0.049,0.28,0.08,0.434,0.08c0.718,0,1.301-0.583,1.301-1.301c0-0.153-0.032-0.298-0.08-0.434H17.02c-0.049,0.136-0.08,0.28-0.08,0.434c0,0.718,0.583,1.301,1.302,1.301c0.152,0,0.297-0.031,0.434-0.08V12.682z M18.241,6.531c-0.24,0-0.435-0.194-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,6.336,18.48,6.531,18.241,6.531 M9.22,8.896c0,0.095,0.019,0.175,0.058,0.242c0.039,0.066,0.088,0.124,0.148,0.171c0.061,0.047,0.13,0.086,0.21,0.115c0.079,0.028,0.11,0.055,0.192,0.073V8.319c-0.21,0-0.322,0.044-0.437,0.132C9.277,8.54,9.22,8.688,9.22,8.896 M15.639,12.602h-0.868c-0.239,0-0.434,0.195-0.434,0.434c0,0.24,0.194,0.436,0.434,0.436h0.868c0.24,0,0.434-0.195,0.434-0.436C16.072,12.797,15.879,12.602,15.639,12.602 M10.621,10.5c-0.068-0.052-0.145-0.093-0.23-0.124c-0.086-0.031-0.123-0.06-0.212-0.082v1.374c0.209-0.016,0.332-0.076,0.465-0.186c0.134-0.107,0.201-0.281,0.201-0.516c0-0.11-0.02-0.202-0.062-0.277C10.743,10.615,10.688,10.551,10.621,10.5"></path>
              </svg>
              <label>
                Vender
              </label>
            </div>
            <div>
              <svg cursor={'pointer'} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
                <path d="M10.034,3.635h4.106c0.227,0,0.41-0.184,0.41-0.411c0-0.227-0.184-0.411-0.41-0.411h-4.106c-0.227,0-0.411,0.184-0.411,0.411C9.623,3.451,9.807,3.635,10.034,3.635 M17.412,14.412h0.002l1.643-7.392l-0.008-0.002c0.008-0.032,0.02-0.063,0.02-0.098c0-0.227-0.184-0.411-0.41-0.411H5.492L4.909,4.338L4.903,4.34C4.853,4.171,4.702,4.045,4.516,4.045H1.41C1.184,4.045,1,4.229,1,4.456S1.184,4.867,1.41,4.867h2.791l2.564,9.563h0.001c0.035,0.117,0.119,0.209,0.229,0.258c-0.154,0.25-0.247,0.541-0.247,0.857c0,0.906,0.735,1.643,1.643,1.643c0.907,0,1.643-0.736,1.643-1.643c0-0.301-0.087-0.58-0.228-0.822h4.562c-0.141,0.242-0.229,0.521-0.229,0.822c0,0.906,0.736,1.643,1.643,1.643c0.908,0,1.643-0.736,1.643-1.643c0-0.316-0.092-0.607-0.246-0.857C17.295,14.637,17.381,14.535,17.412,14.412 M15.74,7.331h2.406l-0.365,1.643h-2.223L15.74,7.331z M5.712,7.331h2.722l0.183,1.643H6.152L5.712,7.331z M6.813,11.438L6.373,9.795h2.336l0.183,1.643H6.813z M7.034,12.26h1.949L9.165,13.9h-1.69L7.034,12.26zM8.392,16.365c-0.454,0-0.822-0.367-0.822-0.82s0.368-0.822,0.822-0.822c0.454,0,0.821,0.369,0.821,0.822S8.845,16.365,8.392,16.365 M11.678,13.9H9.991L9.809,12.26h1.869V13.9z M11.678,11.438H9.717L9.534,9.795h2.144V11.438zM11.678,8.974H9.443L9.261,7.331h2.417V8.974z M14.184,13.9h-1.686V12.26h1.869L14.184,13.9z M14.457,11.438h-1.959V9.795h2.143L14.457,11.438z M14.732,8.974h-2.234V7.331h2.416L14.732,8.974z M15.783,16.365c-0.453,0-0.82-0.367-0.82-0.82s0.367-0.822,0.82-0.822s0.822,0.369,0.822,0.822S16.236,16.365,15.783,16.365 M16.686,13.9H15.01l0.184-1.641h1.857L16.686,13.9zM15.283,11.438l0.184-1.643H17.6l-0.365,1.643H15.283z"></path>
              </svg>
              <label>
                Consignar
              </label>
            </div>


          </section>

        </div>

        {/* Letreiro de informações da Rota */}
        <div className="div-svg-custommer-card-sm-combo-h1">
          <h1>
            {/* Botão Voltar  */}
            <svg className="svg-nav-style-h1" onClick={() => { localStorage.removeItem('user'); location.reload(); }} viewBox="0 0 20 20">
              <path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
            </svg>
            {/* Nome da Rota e Data */}
            <div style={{ fontSize: "18px" }}>
              {`${routeInfo?.nomeRota} - ${routeInfo?.dataInicial.split(':', 1)}`}
            </div>
          </h1>
        </div>

        {/* SEARCH BAR  */}
        <div className="SearchBar" style={{ display: 'block' }}>

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <svg className="svg-big-style" viewBox="0 0 20 20">
              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
            </svg>
            <div style={{ fontSize: '18px' }}>{`${filteredCustommers.length === 0
              ? 'Nenhum registro encontrado'
              : filteredCustommers.length === allCustommers.length
                ? `Total de ${filteredCustommers.length} registros`
                : `Exibindo ${filteredCustommers.length} registros`}`}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Nro.</label>
              <input className="form-input" type="text" size={3} id="id" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Contato</label>
              <input className="form-input" type="text" size={8} id="contato" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">N.Fantasia</label>
              <input className="form-input" type="text" size={10} id="nome_fantasia" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">R.Social</label>
              <input className="form-input" type="text" size={10} id="razao_social" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Cidade</label>
              <input className="form-input" type="text" size={8} id="cidade" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">UF</label>
              <input className="form-input" type="text" size={1} id="uf" onChange={evt => updateInputValue(evt)} />
            </div>
            {/* <button onClick={newScreen}>X</button> */}
          </div>
        </div>

        {/* ROLL DE CARDS POR CUSTOMMER:  */}
        <div className="custommer-card-roll">
          {filteredCustommers.map((custommer, index) => {
            return (
              <div
                id={`custommer['id']`} className="custommer-card-style" key={`custummer-card-${custommer['id']}`}
              // onClick={() => { handleToPrintQueue(custommer['id']); handleOnChange(index) }}
              >
                {CustommerCard(custommer, toPrintQueue, newScreen, newSaleScreen)}
              </div>
            )
          })
          }
        </div>

        {/* <p>{`${consignmentInfo[0].data_consignacao}`}</p> */}
        {/* <p>{`${orders[0].nomeProduto}`}</p> */}
        <label>{`${routeInfo?.contato}`}</label>

        <label className="label-footer">Desenvolvido e mantido por paulosuriani@gmail.com</label>

      </div>
      : navigate('/login')
  ) as any
}
