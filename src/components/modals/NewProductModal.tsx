import React, { useEffect, useState } from 'react';

type DropDownOption = {
  idProduct?: number;
  nomeProduto?: string;
  valorSugerido: string;
  codigoProduto?: string;
};

interface Orders {
  dataVenda?: Date | any,
  idConsignment: string,
  idCustommer: string,
  idProduct: string,
  nomeProduto: string,
  preco: string,
  qtdeDeixada: string | number | any,
  qtdeVendida?: string | number | any,
  codigoProduto: string
};
interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  updateOrders: (updatedOrders: Array<Orders>) => void;
  orders: Array<Orders>;
  productsData: Array<DropDownOption>;
  updateInputQtdeVen: (value: string | number) => void;
};

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  orders,
  updateOrders,
  productsData,
  updateInputQtdeVen,
}) => {
  const [searchValue, setSearchValue] = useState<DropDownOption | null>(null);
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const [products, setProducts] = useState(productsData);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<DropDownOption | null>(null); // Estado para a opção selecionada
  const [warningMessage, setWarningMessage] = useState(false);


  if (!showModal) return null;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.value);
  };

  function formatCents(originalString: string, charToAdd: string, position: number): string {
    if (position <= 0) {
      // Se a posição for menor ou igual a 0, adiciona o caractere no início da string
      return charToAdd + originalString;
    } else if (position >= originalString.length) {
      // Se a posição for maior ou igual ao tamanho da string, adiciona o caractere no final da string
      return originalString + charToAdd;
    } else {
      // Caso contrário, divide a string em duas partes e concatena o caractere no meio
      const part1 = originalString.slice(0, position);
      const part2 = originalString.slice(position);
      return part1 + charToAdd + part2;
    }
  };


  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    // const inputValueAux = event.target.value.replace(',', '');
    // const inputValue = inputValueAux.replace('R$ ', '');
    // setValue((prevValue) => {
    //   // Remove "R$ " from the input value
    //   const numericValue = inputValue;
    //   // Check if the input value is a valid number
    //   if ((numericValue !== '')) {
    //     // Format the number with "R$ " prefix and 2 decimal places
    //     console.log("lalalandousss nv: ", numericValue);

    //     if (inputValue.length > 1) {
    //       if (inputValue.length > 2) {
    //         const formattedValue = `R$ ${formatCents(inputValue, ',', inputValue.length - 2)}`;
    //         return formattedValue;
    //       }
    //       const formattedValue = `R$ ${formatCents(inputValue, ',', inputValue.length - 1)}`;
    //       return formattedValue;
    //     }
    //     else {
    //       const formattedValue = `R$ ${inputValue}`;
    //       return formattedValue;
    //     }
    //   } else {
    //     // If the input value is not valid, set it as it is
    //     return inputValue;
    //   }
    // });
  };

  //const isAddButtonVisible = searchValue.trim() !== '' && quantity.trim() !== '' && value.trim() !== '';
  const isAddButtonVisible = '';
  const handleCloseModal = () => {
    // showModal(false);
  };

  const handleAddProduct = () => {
    const newProduct: Orders = {
      dataVenda: new Date(),
      idConsignment: 'id do pedido',
      idCustommer: 'id do cliente',
      idProduct: 'id do produto',
      codigoProduto: selectedProduct?.codigoProduto!,
      nomeProduto: selectedProduct?.nomeProduto!,
      preco: value === '' ? selectedProduct?.valorSugerido! : value,
      qtdeVendida: Number(quantity),
      qtdeDeixada: 0
    };

    const updatedOrders = [...orders, newProduct];
    // updateInputQtdeVen(newProduct.qtdeVendida);
    updateOrders(updatedOrders);
    cleanFields();
    handleCloseModal();
    onClose();
  };

  const cleanFields = () => {

    const valueElement = document.getElementById('value-input') as HTMLInputElement;
    const quantityElement = document.getElementById('quantity-input') as HTMLInputElement;
    const productElement = document.getElementById('product-input') as HTMLInputElement;
    const productDropDown = document.getElementById('products-dropdown') as HTMLInputElement;

    if (valueElement) {
      valueElement.value = ''; // Definindo o valor para uma string vazia
      setValue('');
    }
    if (quantityElement) {
      quantityElement.value = ''; // Definindo o valor para uma string vazia
      setQuantity('');
    }
    if (productElement) {
      setSearchValue({ valorSugerido: '' }); // Definindo o valor para uma string vazia
    }
    if (productDropDown) {
      setSelectedOption(''); // Definindo o valor para uma string vazia
      productDropDown.value = '';
      setSelectedProduct(true);
    }
  };

  //const handleDropDownChange = (event: any) => {
  // setSelectedOption(event.target.value);
  //  setSearchValue(event.target.value);
  //};

  const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value; // Pega o ID do produto selecionado
    const product = products.find((p) => p.idProduct === Number(selectedId)); // Encontra o objeto correspondente
    setSelectedProduct(product || null); // Salva o objeto do produto no estado
  };

  return (
    <div className="modal-general-style modal px-3">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className='text-lg'>Selecione um produto</h2>

        {/* DROP DOWN LIST */}
        <div
          className="dropdown mt-2"
          style={{ marginBlockEnd: "18px", fontFamily: "Arial, sans-serif" }}
        >
          <select
            className="form-input"
            value={selectedProduct?.idProduct || ""}
            onChange={handleDropDownChange}
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <option value="" disabled>
              [Lista de produtos disponíveis]
            </option>
            {products.map((product) => (
              <option
                key={product.idProduct}
                value={product.idProduct} // Usa o ID como valor
              >
                {product.nomeProduto}
              </option>
            ))}
          </select>
        </div>


        <div className=" search-container">
          <input
            className='max-h-10'
            id='product-input'
            type="text"
            placeholder="Busque por nome ou código..."
            onChange={handleSearchChange}
            value={searchValue?.nomeProduto}
          //readOnly
          />

          <button className="search-button bg-consigna max-h-10">
            <div className=''>
              <svg className="fill-white font-bold min-w-7 h-7 mb-4" viewBox="0 0 28 23">
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
            </div>
          </button>

        </div>
        {selectedProduct && (
          <p className='p-0 bg-gray-200 text-black rounded-lg border border-gray-800 mx-auto shadow-md flex flex-col items-center'>
            <svg className="max-w-10 mt-4" viewBox="0 0 20 20">
              <path d="M17.283,5.549h-5.26V4.335c0-0.222-0.183-0.404-0.404-0.404H8.381c-0.222,0-0.404,0.182-0.404,0.404v1.214h-5.26c-0.223,0-0.405,0.182-0.405,0.405v9.71c0,0.223,0.182,0.405,0.405,0.405h14.566c0.223,0,0.404-0.183,0.404-0.405v-9.71C17.688,5.731,17.506,5.549,17.283,5.549 M8.786,4.74h2.428v0.809H8.786V4.74z M16.879,15.26H3.122v-4.046h5.665v1.201c0,0.223,0.182,0.404,0.405,0.404h1.618c0.222,0,0.405-0.182,0.405-0.404v-1.201h5.665V15.26z M9.595,9.583h0.81v2.428h-0.81V9.583zM16.879,10.405h-5.665V9.19c0-0.222-0.183-0.405-0.405-0.405H9.191c-0.223,0-0.405,0.183-0.405,0.405v1.215H3.122V6.358h13.757V10.405z"></path>
            </svg>
            <strong className='text-lg'>
              {`Cód. ${selectedProduct.codigoProduto}`}
            </strong>  <strong className='text-xl mb-4 max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap'>
              {`${selectedProduct.nomeProduto} `}
            </strong>
          </p>
        )}
        <div className='flex p-0 pt-3'>
          {selectedProduct && (
            <div className='min-w-[60%] pl-2'>

              <div className="input-container ">
                <label>Preço</label>
                <input
                  className='max-w-[40%]'
                  id='value-input'
                  type="text"
                  placeholder="Digite o valor"
                  value={selectedProduct.valorSugerido}
                  onChange={(e) => {
                    const updatedProduct = { ...selectedProduct, valorSugerido: e.target.value };
                    setSelectedProduct(updatedProduct);
                    handleValueChange(e);
                  }}
                // onchage handleValueChange estava arrumando o formato também
                />
              </div>
              <div className="input-container ">
                <label>Qtde.</label>
                <input
                  className='max-w-[25%]'
                  id='quantity-input'
                  type="number"
                  placeholder="Informe a quantidade"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>

            </div>
          )}
          {selectedProduct && (
            <section
              className='min-w-[40%] bg-consigna m-2 flex items-center mx-auto text-center justify-center text-white p-2 border rounded-lg '
              onClick={handleAddProduct}
            >
              <label className='text-xl font-bold m-2'>
                Adicionar produto
              </label>
              <svg className="fill-white" viewBox="0 0 20 20">
                <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
              </svg>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

