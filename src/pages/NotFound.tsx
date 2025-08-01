import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img
        src="/src/assets/c-solo-logo.svg"
        alt="Logo Consigna"
        className="h-60 mb-[-50px] animate-pulse transition-colors duration-300"
      />
      <h1 className="text-9xl font-bold text-consigna animate-pulse transition-colors duration-300">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Página não encontrada</h2>
      <p className="text-gray-600 mt-2">
        A página que você está procurando não existe ou foi movida
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 bg-consigna hover:bg-blue-700 text-white rounded-md transition"
      >
        Voltar para o início
      </button>
    </div>
  );
};

export default NotFound;
