"use client";

import { useState } from "react";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
}

interface AuthFormProps {
  showNameField?: boolean; // register only
  submitLabel: string;
  onSubmit: (values: AuthFormValues) => Promise<void>;
}

export default function AuthForm({
  showNameField = false,
  submitLabel,
  onSubmit,
}: AuthFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await onSubmit({ name, email, password, setLoading });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {showNameField && (
        <InputField
          label="Username"
          id="username"
          required
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <InputField
        label="Email"
        id="email"
        required
        placeholder="Enter your email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordField
        label="Password"
        id="password"
        required
        placeholder={
          showNameField ? "Create a password" : "Enter your password"
        }
        value={password}
        showPasswordCriteria={showNameField}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary-600 text-white py-2.5 font-medium 
        hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? "Please wait..." : submitLabel}
      </button>
    </form>
  );
}
