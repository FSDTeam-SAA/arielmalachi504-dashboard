
import DashboardLayoutContent from "@/components/shared/DashboardLayoutContent";
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
  return <DashboardLayoutContent>{children}</DashboardLayoutContent>;
}

