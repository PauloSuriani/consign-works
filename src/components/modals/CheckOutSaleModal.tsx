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
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CheckOutSaleModal;
