"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bell, LogOut, Search, User2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    setLogoutDialogOpen(false);
  };

  const firstName = session?.user?.firstName ?? "";
  const lastName = session?.user?.lastName ?? "";
  const userName = [firstName, lastName].filter(Boolean).join(" ") || "Admin";
  const userEmail = session?.user?.email ?? "";
  const userInitial = userName.charAt(0).toUpperCase();

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
          {/* Search bar */}
          <div className="hidden sm:flex items-center gap-2 h-8 rounded-lg bg-[#f4f6fb] px-3 text-[12px] text-[#94a3b8] w-[180px]">
            <Search className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Search…</span>
          </div>

          {/* Bell */}
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#f4f6fb] text-[#64748b] hover:bg-[#e9ecf4] transition">
            <Bell className="h-[15px] w-[15px]" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
          </button>

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

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LogOut className="h-4 w-4 text-red-500" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
