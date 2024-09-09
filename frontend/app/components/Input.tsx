import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const Input: React.FC<InputProps> = ({ type, placeholder, required, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange} // Attach the onChange handler
      className="my-3 p-2 border border-black w-full lg:w-lg" // Example Tailwind CSS classes for styling
    />
  );
};

export default Input;