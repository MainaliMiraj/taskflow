import { Suspense } from "react";
import Dashboard from "./_ui/Dashboard";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-primary-700 text-center">Loading dashboard...</div>
      }
    >
      <Dashboard />
    </Suspense>
  );
}
