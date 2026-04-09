"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Grid2x2,
  Users,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard Overview",
    href: "/",
    icon: Grid2x2,
  },
  {
    label: "Users Management",
    href: "/users-management",
    icon: Users,
  },
  {
    label: "Subscription",
    href: "/subscription-management",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col justify-between border-r border-[#eef0f6] bg-white px-3 py-6">
      <div>
        {/* Logo */}
        <div className="mb-10 flex items-center justify-center px-2">
          <Link href="/" className="flex items-center gap-2">
            {/* Icon mark */}
            <div className="relative flex h-7 w-7 items-center justify-center">
              <span className="absolute h-[5px] w-[18px] rounded-full bg-[#20c4f4] rotate-[25deg] -translate-y-[6px]" />
              <span className="absolute h-[5px] w-[18px] rounded-full bg-[#4a8cff] rotate-[25deg]" />
              <span className="absolute h-[5px] w-[18px] rounded-full bg-[#20c4f4] rotate-[25deg] translate-y-[6px]" />
            </div>
            <span className="text-[14px] font-semibold text-[#2ea7ff] tracking-tight">
              Brandflowlabs
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#4a8cff] to-[#5b9fff] text-white shadow-sm"
                    : "text-[#4b5563] hover:bg-[#f4f8fc] hover:text-[#2f3552]"
                }`}
              >
                <Icon
                  className={`h-[15px] w-[15px] flex-shrink-0 ${
                    isActive ? "text-white" : "text-[#9ca3af]"
                  }`}
                  strokeWidth={2}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-[#fca5a5] text-[13px] font-medium text-[#ef4444] transition hover:bg-red-50 active:scale-[0.99]"
      >
        <LogOut className="h-[14px] w-[14px]" strokeWidth={2} />
        <span>Log out</span>
      </button>
    </aside>
  );
}