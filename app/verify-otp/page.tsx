"use client";

import { Suspense } from "react";
import VerifyOtpContent from "./VerifyOtpContent";
import NavBar from "@/components/navbar/Navbar";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
      <VerifyOtpContent />
    </Suspense>
  );
}
