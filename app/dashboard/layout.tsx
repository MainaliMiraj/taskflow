"use client";

import DashboardHeader from "@/components/DashboardHeader";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <DashboardHeader />
      <main className="px-4 pt-4">{children}</main>
    </div>
  );
}
