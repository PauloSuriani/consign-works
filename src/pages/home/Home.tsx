import { useState, useEffect, useMemo } from "react";
import CustomerCard from "../../components/cards/CustommerCard";
import { useNavigate } from 'react-router-dom';
import CargaIcon from "./components/icons/CargaIcon";
import ConsignarIcon from "./components/icons/ConsignarIcon";
import VenderIcon from "./components/icons/VenderIcon";
import ViagemIcon from "./components/icons/ViagemIcon";
import Menu from "./components/menu";
import Consignment from "../../interfaces/Consignment";
import Custommer from "../../interfaces/Custommer";
import { apiService } from "../../api";
import { brDateFormat, collectVisitedCustomerIds, reorderCustomers } from "./helpers";
import { ValoresRota } from "./components/valores";

interface Route {
  contato: string,
  dataFinal?: Date | any,
  dataInicial: string,
  idFieldSeller: string,
  nomeRota: string,
  valorTotal?: number
}

interface CityGroup {
  cidade: string;
  quantidade: number;
  visitados?: number;
}

export function Home() {
  const [allCustommers, setAllCustommers] = useState<Custommer[]>([]);
  const [filteredCustommers, setFilteredCustommers] = useState<Custommer[]>([]);
  const [routeInfo, setRouteInfo] = useState<Route>();
  const [consignmentsByRoute, setConsignmentsByRoute] = useState(Array<Consignment>);
  const [shipment, setShipment] = useState([{}]);
  const [consignmentQueue, setCosnignmentsQueue] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitedCustomerIds, setVisitedCustomerIds] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem('visitedCustomers');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch (e) {
      console.error('Erro ao carregar visitedCustomers:', e);
      return new Set();
    }
  });

  const navigate = useNavigate();

  const customersOrdered = useMemo(
    () => reorderCustomers(filteredCustommers, visitedCustomerIds),
    [filteredCustommers, visitedCustomerIds]
  );

  useEffect(() => {
    localStorage.setItem('visitedCustomers', JSON.stringify(Array.from(visitedCustomerIds)));
  }, [visitedCustomerIds]);

  useEffect(() => {
    const checkAuth = async () => {
      const storage = localStorage.getItem('user');
      if (!storage) {
        navigate('/');
        return;
      }
      try {
        const userData = JSON.parse(storage);
        if (userData.token) {
          const isValid = await apiService.validateToken(userData.token);
          if (isValid) {
            const routeData = await apiService.getFullRouteData(userData.id);
            handleApiResponse(routeData);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('user');
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  function handleApiResponse(response: any) {
    console.log('full api "response": ', response);
    setAllCustommers(response.custommersInfo ? response.custommersInfo : '');
    setFilteredCustommers(response.custommersInfo);
    setRouteInfo(response.route);
    setConsignmentsByRoute(response.consignOrders);

    shipmentVersion(response);
    setShipment(response.shipment);

    if (response.message !== 'Erro interno') {
      const consignOrdersAux: Array<number> = [];
      response.consignOrders.map((consign: Consignment) => {
        consignOrdersAux.push(consign.idCustommer!);
      })
      setCosnignmentsQueue(consignOrdersAux);
    }
    else setCosnignmentsQueue([0]);
  }

  const groupedByCity: CityGroup[] = Object.values(
    allCustommers.reduce<Record<string, CityGroup>>((acc, customer) => {
      const cidade = customer.cidade!;
      if (!acc[cidade]) {
        acc[cidade] = { cidade, quantidade: 0, visitados: 0 };
      }

      acc[cidade].quantidade += 1;

      if (visitedCustomerIds.has(customer.id)) {
        acc[cidade].visitados = (acc[cidade].visitados ?? 0) + 1;
      }

      return acc;
    }, {})
  );

  function shipmentVersion(response: any) {
    const initialShipmentData = localStorage.getItem('initial_shipment_' + response.route?.idFieldSeller);
    if (!initialShipmentData) {
      const routeId = response.route?.idRoute || 'default';
      localStorage.setItem(`initial_shipment_${routeId}`, JSON.stringify(response.shipment));
      localStorage.setItem(`current_shipment_${routeId}`, JSON.stringify(response.shipment));
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();

    const filtered = allCustommers.filter((customer) => {
      const searchFields = [
        customer.razaoSocial,
        customer.nomeFantasia,
        customer.cidade,
        customer.uf,
        customer.contato,
      ];

      return searchFields.some((field) =>
        (field ?? '').toLowerCase().includes(value)
      );
    });

    setFilteredCustommers(filtered);
  }

  function openConsignmentScreen(idCustommer: number) {
    const stateAux: Consignment[] = consignmentsByRoute.filter(
      (consign) => (consign.idCustommer === idCustommer)
    );
    const custommerStateAux: Custommer[] = allCustommers.filter(
      (custommer) => (custommer.id === idCustommer)
    );
    const stateData = { stateAux, custommerStateAux };

    navigate('/consignment', { state: { stateData }, replace: false });
  }

  function newSaleScreen(id: number) {
    const custommerStateAux: any = [];
    for (let i = 0; i < allCustommers.length; i += 1) {
      if (allCustommers[i]['id'] === id) {
        custommerStateAux.push(allCustommers[i]);
      }
    }
    const stateData = { custommerStateAux };

    navigate('/sale', { state: { stateData }, replace: false });
  }



  function openShipmentScreen() {
    const stateDataAux = localStorage.getItem('current_shipment');
    const stateData = stateDataAux ? JSON.parse(stateDataAux) : {};

    navigate('/shipment', { state: { stateData }, replace: false });
  };

  function openRouteScreen() {
    const stateData = { groupedByCity };
    navigate('/route', { state: { stateData }, replace: false });
  };

  useEffect(() => {
    setVisitedCustomerIds(prev => {
      const idsFromConsignments = collectVisitedCustomerIds(consignmentsByRoute);
      return new Set([...prev, ...idsFromConsignments]);
    });
  }, [consignmentsByRoute]);

  const markCustomerVisited = (id: number) => {
    setVisitedCustomerIds(prev => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };


  return (
    isAuthenticated ?
      <div style={{ fontFamily: 'Arial' }} className="bg-white">
        <div className="pl-1 pr-2 flex bg-gray-800 hover:bg-gray-700 text-white flex items-center wx-auto justify-between">
          <Menu />
          <div>
            <div>
              <label>{`Bem vindo, ${routeInfo?.contato || 'Vendedor'}`}</label>
            </div>
            <div >
              {`${routeInfo?.nomeRota ? routeInfo?.nomeRota : '(rota desconhecida)'}, 
              em ${routeInfo?.dataInicial ? brDateFormat(routeInfo?.dataInicial) : '--/---'} 
              ${routeInfo?.dataFinal && ' à ' + brDateFormat(routeInfo?.dataFinal)}`}
            </div>
          </div>
        </div>

        <ValoresRota />

        <div className="grid grid-cols-2 gap-px  max-w-[84vw]  h-[228px] mx-auto my-3 p-0 py-3 bg-gray-100 text-gray-800 rounded-lg border shadow-md  border-gray-300 pointer">
          <CargaIcon onClick={() => openShipmentScreen()} />
          <ViagemIcon onClick={() => openRouteScreen()} />
          <VenderIcon onClick={() => true} />
          <ConsignarIcon onClick={() => true} />
        </div>

        <div
          id="SEARCH-BAR"
          className="bg-gray-800 text-white flex flex-col items-center justify-center">
          <input
            type="text"
            placeholder="Buscar cliente por nome, cidade, UF, contato..."
            onChange={handleSearch}
            className="m-2 w-[80%] p-2 border rounded  "
          />

          {filteredCustommers.length !== allCustommers.length ? <div className="flex w-[80%] ">
            <svg className="svg-big-style" viewBox="0 0 20 20" fill="white">
              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
            </svg>
            <div className="pt-2">{`${!filteredCustommers || filteredCustommers.length === 0
              ? 'Nenhum cliente encontrado'
              : filteredCustommers.length === allCustommers.length
                ? `Total de ${filteredCustommers.length} clientes na rota`
                : `Exibindo ${filteredCustommers.length} clientes`}`}
            </div>
          </div>
            : null
          }
        </div>

        <div
          id="CUSTOMER-CARDS"
          className="custommer-card-roll"
        >
          {customersOrdered.map(customer => {
            let isVisited = visitedCustomerIds.has(customer.id);

            return (
              <div
                key={`customer-card-${customer.id}`}
                id={`customer-${customer.id}`}
                className="custommer-card-style"
              >
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  visited={isVisited}
                  consignmentQueue={consignmentQueue}
                  openConsignmentScreen={openConsignmentScreen}
                  newSaleScreen={newSaleScreen}
                  onMarkVisited={() => markCustomerVisited(customer.id)}
                />
              </div>
            );
          })}
        </div>

        <label className="label-footer">Consigna - Sistema de Vendas @ 2025</label>
      </div>
      : <div>loading</div>
  ) as any
}
