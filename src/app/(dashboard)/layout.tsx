
import DashboardHeader from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Brand Flowlabs",
  description: "Create Stunning Graphic Designs with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Sidebar — fixed width */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10">
          <DashboardHeader />
        </div>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
