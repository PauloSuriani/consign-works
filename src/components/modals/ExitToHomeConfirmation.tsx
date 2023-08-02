import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  showConfirmation: boolean;
  onClose: () => void;
}

const ExitToHomeConfirmation: React.FC<ModalProps> = ({
  showConfirmation,
  onClose
}) => {
  if (!showConfirmation) return null;

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Atenção</h2>
        <p>Ao clicar em sair você perderá os dados inseridos</p>
        <button style={{marginInlineEnd: '8px'}} onClick={onClose}>Fechar</button>
        <button onClick={goToHome}>Sair sem salvar</button>
      </div>
    </div>
  );
};

export default ExitToHomeConfirmation;
