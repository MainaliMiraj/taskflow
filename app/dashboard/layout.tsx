"use client";

import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <TaskProvider>
    <>
      <DashboardHeader />
      <main className="px-4 pt-4">{children}</main>
      {/* </TaskProvider> */}
    </>
  );
}
