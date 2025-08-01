import { useLocation, Link } from 'react-router-dom';

interface CityGroup {
  cidade: string;
  quantidade: number;
  visitados?: number;
}


export function RouteScreen(): JSX.Element {
  const location = useLocation();
  const stateData = location.state?.stateData;
  const groupedByCity = stateData?.groupedByCity ?? [];

  return (
    <>
      <nav className="flex text-white bg-consigna items-center justify-between p-2">
        <div className="text-xl font-medium ">Resumo por cidade</div>
        <Link to="/" className="text-white hover:underline font-medium">
          ← Voltar
        </Link>
      </nav>
      <div className="p-4">
        <div className="space-y-3">
          {groupedByCity.map((group: CityGroup) => (
            <div
              key={group.cidade}
              className="p-4 border rounded-xl shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800">{group.cidade}</h3>
                <p className="text-sm text-gray-500">Total de clientes: {group.quantidade}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${group.visitados === group.quantidade
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  Visitados: {group.visitados}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RouteScreen;