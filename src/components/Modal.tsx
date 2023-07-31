import React, { useState } from 'react';
// import './Modal.css';
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
interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  updateOrders: (updatedOrders: Array<Orders>) => void;
  orders: Array<Orders>; 
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose, orders, updateOrders }) => {
  const [searchValue, setSearchValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [value, setValue] = useState('');

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
  }


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
    // setShowModal(false);
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
    handleCloseModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Selecione um Produto</h2>
        <p>Encontre na lista, busque ou adicione um novo produto</p>
        <div className="dropdown">
          <button className="dropbtn">Selecione uma opção</button>
          {/* MOCK OPÇÕES DE PRODUTO */}
          <div className="dropdown-content">
            <a onClick={() => setSearchValue("CB1000 - CABO/CARREGADOR 1.2 INOVA")} href="#">
              CB1000 - CABO/CARREGADOR 1.2 INOVA
            </a>
            <a onClick={() => setSearchValue("CR2027 CARREGADOR VEICULAR JIM BEAM AUTO MEX")} href="#">
              CR2027 CARREGADOR VEICULAR JIM BEAM AUTO MEX
            </a>
            <a onClick={() => setSearchValue("CX1011 - CAIXA DE SOM JIM BEAM")} href="#">
            CX1011 - CAIXA DE SOM JIM BEAM
            </a>
            <a onClick={() => setSearchValue("CB1001 - CABO/CARREGADOR 1.2 IPHONE JIM BEAN")} href="#">
            CB1001 - CABO/CARREGADOR 1.2 IPHONE JIM BEAN
            </a>
            <a onClick={() => setSearchValue("DV1002 - JIM BEAN FITAS")} href="#">
            DV1002 - JIM BEAN FITAS
            </a>
            <a onClick={() => setSearchValue("FN1020 - FONE DE OUVIDO BEAN JIM")} href="#">
            FN1020 - FONE DE OUVIDO BEAN JIM
            </a>
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button className="search-button">Buscar</button>
        </div>
        {searchValue && (
          <p>
            - <strong>{searchValue}</strong>
          </p>
        )}
        {searchValue && (
          <div className="input-container">
            <label>Quantidade:</label>
            <input
              type="number"
              placeholder="Digite a quantidade"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        )}
        {searchValue && (
          <div className="input-container">
            <label>Valor:</label>
            <input
              type="text"
              placeholder="Digite o valor"
              value={value}
              onChange={handleValueChange}
            />
          </div>
        )}
        {isAddButtonVisible && <button onClick={handleAddProduct} className="add-button">Adicionar</button>}
      </div>
    </div>
  );
};

export default Modal;
