import React from 'react';

interface ModalProps {
  showConfirmation: boolean;
  onClose: () => void;
}

const ExitToHomeConfirmation: React.FC<ModalProps> = ({ showConfirmation, onClose }) => {
  if (!showConfirmation) return null;

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

export default ExitToHomeConfirmation;
