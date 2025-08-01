import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "../home/components/menu";


// ter o objeto 'carga_inicio' para referência e um temporário atualizado
// a toda nova consig / venda realizar chamada api, embora o array principal não será recarregado (a menos que houver sinalização no front - de rota concluída) 

export function Shipment() {
  const [products, setProducts] = useState<Array<any>>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('data', location.state?.stateData);
    if (location.state?.stateData) {
      const productsState = location.state.stateData;
      setProducts(productsState);
    }
  }, []);

  return (
    <div>
      <div className="pl-1 pr-2 flex bg-gray-800 hover:bg-gray-700 text-white flex items-center wx-auto justify-between">
        <Menu />
        <div className='text-xl'>
          Carga da viagem
        </div>
      </div>

      <h1 className='bg-gray-200 text-black flex flex-col items-center text-xl py-2 mb'>
        Produtos disponíveis
      </h1>

      <ol
        id='lista-produtos-disponiveis'
        className=''
      >
        <li className='px-2 flex justify-between text-md bg-consigna text-white' >
          <div className='flex'>
            Cód.
            <div className='ml-6'>
              Nome do produto
            </div>
          </div>
          Qtde.
        </li>
        {products.map((product, i) => {
          return <li className={`px-2
           min-h-[0px]
                ${!(i % 2 === 0) ? 'bg-consigna text-white' : 'bg-gray-200'}`}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center text-sm'>
                <div className="pr-1 max-w-[48px] text-xs">
                  {product.codigoProduto}
                </div>
                {` - ${product.nomeProduto}`}
              </div>
              <div className=''>
                {product.quantidade}
              </div>
            </div>
          </li>
        })
        }
      </ol>
      <section className="max-h-[60px] fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-3 flex justify-between items-center z-50">
        <button
          className="bg-gray-200 text-black py-2 px-4 rounded text-lg mr-3 my-2"
          onClick={() => {
            navigate('/');

          }}
        >
          Voltar
        </button>
        <button
          className="bg-gray-200 text-black py-2 px-4 rounded text-lg mr-3 my-2"
          onClick={() => {
            navigate('/');

          }}
        >
          Carga inicial
        </button>
      </section>
    </div>
  );

};