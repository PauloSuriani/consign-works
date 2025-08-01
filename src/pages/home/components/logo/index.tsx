import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LogoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <img
        src="/src/assets/CONSIGNA-LOGO.svg"
        alt="Consigna Logo"
        style={{
          height: '8rem',
          animation: 'fadeIn 1.5s ease-in-out forwards',
          opacity: 0
        }}
      />
      <h3 className=" mt-4 font-medium text-sm" style={{ animation: 'fadeIn 1.5s ease-in-out forwards', opacity: 0 }}>
        SISTEMA DE VENDAS</h3>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default LogoPage;
