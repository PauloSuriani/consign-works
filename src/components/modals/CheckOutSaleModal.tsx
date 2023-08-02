import React from 'react';

interface ModalProps {
  showCheckOut: boolean;
  onClose: () => void;
}

const CheckOutSaleModal: React.FC<ModalProps> = ({ showCheckOut, onClose }) => {
  if (!showCheckOut) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Exemplo de Modal</h2>
        <p>Aqui você pode adicionar o conteúdo do seu modal.</p>
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
