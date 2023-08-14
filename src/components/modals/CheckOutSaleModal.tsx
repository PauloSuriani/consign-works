import React from 'react';

interface ModalProps {
  showCheckOut: boolean;
  totalSum: number;
  onClose: () => void;
}

const CheckOutSaleModal: React.FC<ModalProps> = ({ showCheckOut, totalSum, onClose }) => {
  if (!showCheckOut) return null;

  const dateSetUp = () => {
    const orderDate = new Date(); 
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', options);
    const formattedDate = dateFormatter.format(orderDate);
    return formattedDate;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Fechar Venda</h2>
        <h3 style={{marginTop: '28px', display: 'flex', flexDirection: 'row-reverse', marginInlineEnd: '24px', paddingBottom: '12px' }}>
        Total do Pedido: R$ {totalSum.toFixed(2)}
       </h3>
        <p>Realizado em {dateSetUp()}</p>
        <footer style={{
          marginBlockStart: '8px',
          display: 'flex',
          justifyContent: 'end',
          marginInlineEnd: '20px'
        }}>
          <input
            type="checkbox"
            id="discount-checkbox"
            name="discount"
            value="5"
          />
          <label style={{ paddingTop: '2px' }} htmlFor="discount-checkbox">Aplicar desconto de 5% à vista</label>
        </footer>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CheckOutSaleModal;
