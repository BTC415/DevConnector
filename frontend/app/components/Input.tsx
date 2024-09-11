import React from 'react';

interface InputProps {
  id: string,
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  error : string | null
}

const Input: React.FC<InputProps> = ({ id, type, placeholder, required, value, onChange, error }) => {
  return (
    <div>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange} // Attach the onChange handler
        className="my-3 p-2 border border-black w-full lg:w-lg" // Example Tailwind CSS classes for styling
      />
      {error && <p className='p-2 text-md text-red-600'>{error}</p>}
    </div>
  );
};

export default Input;