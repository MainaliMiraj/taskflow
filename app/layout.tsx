import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "TaskFlow",
  description:
    "A clean, modern task management application for testing practice",
  keywords: "task management, productivity, testing, automation",
  authors: [{ name: "Miraj Mainali" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
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
      <body className={barlow.className}>
        <div className="min-h-screen bg-gray-100">
          <main className="">
            <main></main>
            {children}
            <Toaster position="top-center"/>
          </main>
        </div>
      </body>
    </html>
  );
}

//max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
