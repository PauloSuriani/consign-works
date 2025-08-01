import React from 'react';
import IconItem from '.';
import locationIcon from '/src/assets/icons/location.png';

type ViagemIconProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const ViagemIcon: React.FC<ViagemIconProps> = ({ onClick }) => {
  return (
    <IconItem
  icon={
    <img
      src={locationIcon}
      alt="Ícone de localização"
      className="h-12 w-12"
    />
  }
  label="Visualizar Rota"
  onClick={onClick ? () => onClick({} as React.MouseEvent<HTMLDivElement>) : undefined}
/>
  );
};

export default ViagemIcon;