import React from 'react';

interface InputProps {
  id: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onKeyDown,
  placeholder = '',
  className = '',
}) => {
  return (
    <div className={`my-2 space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-md font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="block w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 shadow-sm"
        placeholder={placeholder}
      />
    </div>
  );
};