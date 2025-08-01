import CargaIcon from './CargaIcon';
import ViagemIcon from './ViagemIcon';
import VenderIcon from './VenderIcon';
import ConsignarIcon from './ConsignarIcon';

const IconGrid = () => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <CargaIcon onClick={() => console.log('Carga clicked')} />
      <ViagemIcon onClick={() => console.log('Viagem clicked')} />
      <VenderIcon onClick={() => console.log('Vender clicked')} />
      <ConsignarIcon onClick={() => console.log('Consignar clicked')} />
    </div>
  );
};

export default IconGrid;
