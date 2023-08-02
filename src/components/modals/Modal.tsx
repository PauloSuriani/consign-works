import React, { useEffect, useState } from 'react';

type DropDownOption = {
  "id": number,
  "nome": string
};
interface Orders {
  dataVenda?: Date | any,
  idConsignment: string,
  idCustommer: string,
  idProduct: string,
  nomeProduto: string,
  preco: string,
  qtdeDeixada: string | number | any,
  qtdeVendida?: string | number | any
};
interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  updateOrders: (updatedOrders: Array<Orders>) => void;
  orders: Array<Orders>;
  productsData: Array<DropDownOption>;
};

const Modal: React.FC<ModalProps> = ({
  showModal,
  onClose,
  orders,
  updateOrders,
  productsData,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');
  const [products, setProducts] = useState(productsData);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(Boolean); // Estado para a opção selecionada


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
    const inputValueAux = event.target.value.replace(',', '');
    const inputValue = inputValueAux.replace('R$ ', '');
    setValue((prevValue) => {
      // Remove "R$ " from the input value
      const numericValue = inputValue;
      // Check if the input value is a valid number
      if ((numericValue !== '')) {
        // Format the number with "R$ " prefix and 2 decimal places
        console.log("lalalandousss nv: ", numericValue);

        if (inputValue.length > 1) {
          if (inputValue.length > 2) {
            const formattedValue = `R$ ${formatCents(inputValue, ',', inputValue.length - 2)}`;
            return formattedValue;
          }
          const formattedValue = `R$ ${formatCents(inputValue, ',', inputValue.length - 1)}`;
          return formattedValue;
        }
        else {
          const formattedValue = `R$ ${inputValue}`;
          return formattedValue;
        }
      } else {
        // If the input value is not valid, set it as it is
        return inputValue;
      }
    });
  };

  const isAddButtonVisible = searchValue.trim() !== '' && quantity.trim() !== '' && value.trim() !== '';

  const handleCloseModal = () => {
    // showModal(false);
  };

  const handleAddProduct = () => {
    // ... lógica para adicionar o produto à lista de pedidos ...
    // Aqui você pode criar um novo objeto do tipo Orders com os dados do novo produto e adicionar à lista de pedidos.

    // Exemplo Mock:
    const newProduct: Orders = {
      dataVenda: new Date(),
      idConsignment: 'id do pedido',
      idCustommer: 'id do cliente',
      idProduct: 'id do produto',
      nomeProduto: searchValue,
      preco: value,
      qtdeDeixada: quantity
    };

    const updatedOrders = [...orders, newProduct];
    updateOrders(updatedOrders);
    cleanFields();
    // cleanFields;
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
      setSearchValue(''); // Definindo o valor para uma string vazia
    }
    if (productDropDown) {
      setSelectedOption(''); // Definindo o valor para uma string vazia
      productDropDown.value = '';
      setSelectedProduct(true);
    }
  };

  const handleDropDownChange = (event: any) => {
    setSelectedOption(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <div className="modal-general-style modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Venda de Produtos</h2>

        {/* DROP DOWN LIST */}
        <div
          className="dropdown"
          style={{ marginBlockEnd: '18px', fontFamily: 'sans-serif' }}
        >
          <select
            className="form-input"
            value={selectedOption}
            onChange={handleDropDownChange}
          >
            <option
              id='products-dropdown'
              selected={selectedProduct}
              key='0'
              value=""
            >
              [Lista de Produtos Cadastrados]
            </option>
            {products.map((productDropDownElem) => {
              return (
                <option
                  className='dropdown'
                  key={productDropDownElem['id']}
                  id="id_field_seller"
                  value={`${productDropDownElem['nome']}`}
                >
                  {productDropDownElem['nome']}
                </option>
              )
            })}
          </select>
        </div>

        <div className="search-container">
          <input
            id='product-input'
            type="text"
            placeholder="Buscar produto..."
            onChange={handleSearchChange}
            value={searchValue}
          />

          <button className="search-button">
            <div className='search-btn-div'>
              <svg style={{ cursor: 'pointer', backgroundColor: '#007bff' }} className="svg-search-style" viewBox="0 0 20 20">
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
            </div>
          </button>

        </div>
        {searchValue && (
          <p className='div-svg-custommer-card-sm-combo'>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M17.283,5.549h-5.26V4.335c0-0.222-0.183-0.404-0.404-0.404H8.381c-0.222,0-0.404,0.182-0.404,0.404v1.214h-5.26c-0.223,0-0.405,0.182-0.405,0.405v9.71c0,0.223,0.182,0.405,0.405,0.405h14.566c0.223,0,0.404-0.183,0.404-0.405v-9.71C17.688,5.731,17.506,5.549,17.283,5.549 M8.786,4.74h2.428v0.809H8.786V4.74z M16.879,15.26H3.122v-4.046h5.665v1.201c0,0.223,0.182,0.404,0.405,0.404h1.618c0.222,0,0.405-0.182,0.405-0.404v-1.201h5.665V15.26z M9.595,9.583h0.81v2.428h-0.81V9.583zM16.879,10.405h-5.665V9.19c0-0.222-0.183-0.405-0.405-0.405H9.191c-0.223,0-0.405,0.183-0.405,0.405v1.215H3.122V6.358h13.757V10.405z"></path>
            </svg>
            <strong style={{ fontSize: '16px', paddingInline: '10px', paddingTop: '3px', minWidth: '130px' }}>{searchValue}</strong>
          </p>
        )}
        {searchValue && (
          <div className="input-container">
            <label>Valor Unitário:</label>
            <input
              id='value-input'
              type="text"
              placeholder="Digite o valor"
              value={value}
              onChange={handleValueChange}
            />
          </div>
        )}
        {searchValue && (
          <div className="input-container">
            <label>Quantidade:</label>
            <input
              id='quantity-input'
              type="number"
              placeholder="Digite a quantidade"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        )}
        {!isAddButtonVisible && (

          // <p className='close-order-section' 
          //   style={{ marginTop: '24px', fontSize: '14px', paddingBlock: '12px', paddingInlineStart: '8px' , color: 'Red' }}>
          //   <strong>{`Por favor, preencha todos os Dados do Pedido`}</strong>
          // </p>



          <p className='message-notification'>
            <svg className="svg-custommer-card" viewBox="0 0 20 20">
              <path d="M14.38,3.467l0.232-0.633c0.086-0.226-0.031-0.477-0.264-0.559c-0.229-0.081-0.48,0.033-0.562,0.262l-0.234,0.631C10.695,2.38,7.648,3.89,6.616,6.689l-1.447,3.93l-2.664,1.227c-0.354,0.166-0.337,0.672,0.035,0.805l4.811,1.729c-0.19,1.119,0.445,2.25,1.561,2.65c1.119,0.402,2.341-0.059,2.923-1.039l4.811,1.73c0,0.002,0.002,0.002,0.002,0.002c0.23,0.082,0.484-0.033,0.568-0.262c0.049-0.129,0.029-0.266-0.041-0.377l-1.219-2.586l1.447-3.932C18.435,7.768,17.085,4.676,14.38,3.467 M9.215,16.211c-0.658-0.234-1.054-0.869-1.014-1.523l2.784,0.998C10.588,16.215,9.871,16.447,9.215,16.211 M16.573,10.27l-1.51,4.1c-0.041,0.107-0.037,0.227,0.012,0.33l0.871,1.844l-4.184-1.506l-3.734-1.342l-4.185-1.504l1.864-0.857c0.104-0.049,0.188-0.139,0.229-0.248l1.51-4.098c0.916-2.487,3.708-3.773,6.222-2.868C16.187,5.024,17.489,7.783,16.573,10.27"></path>
            </svg>
            <strong
              style={{ fontSize: '14px', paddingInline: '10px', paddingTop: '3px', minWidth: '130px' }}
            >
              {`Por favor, preencha todos os Dados do Pedido`}
            </strong>

          </p>


        )}
        {isAddButtonVisible && (
          <div className='close-order-section' style={{ marginTop: '24px' }}>
            <p style={{ paddingInlineStart: '6px', fontSize: '17px' }}>
              <strong>{`Adicionar essa linha ao Pedido?`}</strong>
            </p>

            {/* <button
              onClick={handleAddProduct}
              className="add-button"
            >
               <strong>Lançamento</strong>
            </button> */}


            <section className='svg-label-btn' onClick={handleAddProduct}>
              <svg className="svg-order-style " viewBox="0 0 20 20">
                <path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path>
              </svg>
              <label style={{ fontSize: '11px' }}>INCLUIR</label>
            </section>


            {/* <section className='svg-label-btn'>
              <svg onClick={handleAddProduct} className="svg-order-style " viewBox="0 0 20 20">
                <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
              </svg>
              <label style={{ fontSize: 'X-SMALL' }}>CONCLUÍDO</label>
            </section> */}

            {/* <section className='svg-label-btn'>
              <svg onClick={handleAddProduct} className="svg-order-style " viewBox="0 0 20 20">
                <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
              </svg>
              <label>SALVAR</label>
            </section> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
