import React from 'react';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const DarkButton: React.FC<ButtonProps> = ({
  onClick,
  className = '',
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg
        bg-gray-800 hover:bg-gray-700
        text-white font-semibold
        focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        dark:bg-gray-700 dark:hover:bg-gray-600
        transition-all duration-200
        shadow-sm
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
