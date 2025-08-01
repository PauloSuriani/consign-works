import React from 'react';

interface IconItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const IconItem: React.FC<IconItemProps> = ({ icon, label, onClick }) => {
  return (
    <div
      className=" "
      onClick={onClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
      }}
    >
      {icon}
      <label style={{ marginTop: '8px', fontFamily: '' }}>
        {label}
      </label>
    </div>
  );
};

export default IconItem;
