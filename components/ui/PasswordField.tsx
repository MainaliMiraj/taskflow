import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

interface PasswordCriteria {
  label: string;
  test: (pw: string) => boolean;
}

interface PasswordFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  criteria?: PasswordCriteria[];
  showPasswordCriteria: boolean;
}

const defaultCriteria: PasswordCriteria[] = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
  {
    label: "One special character",
    test: (pw: string) => /[!@#$%^&*]/.test(pw),
  },
];

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
  criteria = defaultCriteria,
  showPasswordCriteria,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 
                     focus:ring-primary-300 mt-1 outline-none transition"
        />
        <div
          className="absolute right-3 top-5 mr-2 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>

      {showPasswordCriteria && value.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm">
          {criteria.map((c, idx) => {
            const met = c.test(value);
            return (
              <li key={idx} className="flex items-center gap-2">
                <span
                  className={`
                    w-4 h-4 flex items-center justify-center rounded-full
                    ${
                      met
                        ? "bg-green-500 text-white scale-100 opacity-100"
                        : "bg-gray-300 text-gray-400 scale-75 opacity-0"
                    }
                    transition-all duration-300 ease-out
                  `}
                >
                  <FaCheck className="w-3 h-3" />
                </span>
                <span className={met ? "text-green-600" : "text-gray-400"}>
                  {c.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PasswordField;
