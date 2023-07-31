import React from 'react';
// import './Modal.css';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose }) => {
  if (!showModal) return null;

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

export default Modal;
