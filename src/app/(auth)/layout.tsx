import type { Metadata } from "next";
import "../globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard Auth",
  description: "Authentication Layout for Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#faf8f6]">
      {/* Left: Auth Image Panel */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/images/auth.png"
          fill
          alt="Auth Illustration"
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#19C7DF]/20 to-[#4D8DFF]/30" />

        {/* Logo on top of image */}
        <div className="absolute top-8 left-8 flex items-center gap-2 z-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#19C7DF] to-[#4D8DFF] flex items-center justify-center shadow-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide drop-shadow-md">
            Dashboard
          </span>
        </div>
      </div>

      {/* Right: Children (form) */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Mobile Logo */}
        <div className="flex md:hidden items-center gap-2 px-6 pt-6 pb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#19C7DF] to-[#4D8DFF] flex items-center justify-center shadow-md">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[#4D8DFF] font-semibold text-base tracking-wide">
            Dashboard
          </span>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
