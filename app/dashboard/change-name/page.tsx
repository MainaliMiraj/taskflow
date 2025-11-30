"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChangeNamePage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/me");
      if (res.ok) {
        const data = await res.json();
        setName(data.user.name);
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const res = await fetch("/api/auth/change-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Your Name was changed successfully.");
      router.push("/dashboard");
      // setSuccess("Name updated successfully!");
    } else {
      setError(data.message || "Failed to update name.");
    }
  };
  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow ">
      <h2 className="text-xl font-semibold mb-4">Update you name</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-700">New Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Name"}
        </button>
        <button
          className="w-full border-2 text-black py-2  hover:bg-primary-600  hover:text-white transition disabled:bg-gray-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
