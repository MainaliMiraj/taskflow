import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { TaskProvider } from "@/context/TaskContext";

import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Task Management App",
  description:
    "A clean, modern task management application for testing practice",
  keywords: "task management, productivity, testing, automation",
  authors: [{ name: "Task Management App" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TaskProvider>
        <body className={barlow.className}>
          <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </body>
      </TaskProvider>
    </html>
  );
}
