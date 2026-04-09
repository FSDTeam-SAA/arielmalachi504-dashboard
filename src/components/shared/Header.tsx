"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LogoutModal } from "./LogoutModal";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard Overview", subtitle: "See your updates today!" },
  "/users-management": { title: "Users Management", subtitle: "Manage all your users here." },
  "/subscription-management": { title: "Subscription Management", subtitle: "Manage plans & billing." },
  "/settings": { title: "Settings", subtitle: "Configure your preferences." },
};

export default function DashboardHeader() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const pageInfo = pageTitles[pathname] ?? { title: "Dashboard", subtitle: "Welcome back!" };

  const userName = session?.user?.name || "Admin";
  const userEmail = session?.user?.email ?? "";
  
  // Logic for initials: First letter of first two words, or just first letter
  const userInitial = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <header className="flex h-[64px] w-full items-center justify-between border-b border-[#eef0f6] bg-white px-6">
        {/* Left: Page title */}
        <div className="flex flex-col justify-center">
          <h1 className="text-[15px] font-semibold text-[#1e293b] leading-tight">
            {pageInfo.title}
          </h1>
          <p className="text-[12px] text-[#94a3b8]">{pageInfo.subtitle}</p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Avatar + name */}
          <button
            onClick={() => setLogoutDialogOpen(true)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-[#f4f6fb] transition"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={session?.user?.image ?? ""} alt={userName} />
              <AvatarFallback className="text-[11px] bg-gradient-to-br from-[#4a8cff] to-[#20c4f4] text-white font-semibold">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start leading-tight">
              <span className="text-[12px] font-semibold text-[#1e293b]">{userName}</span>
              {userEmail && (
                <span className="text-[10px] text-[#94a3b8] max-w-[120px] truncate">{userEmail}</span>
              )}
            </div>
          </button>
        </div>
      </header>

      <LogoutModal 
        isOpen={logoutDialogOpen} 
        onClose={() => setLogoutDialogOpen(false)} 
      />
    </>
  );
}
