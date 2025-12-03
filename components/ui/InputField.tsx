// components/ui/InputField.tsx

import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 
                   focus:ring-primary-300 mt-1 outline-none transition"
      />
    </div>
  );
};

export default InputField;
