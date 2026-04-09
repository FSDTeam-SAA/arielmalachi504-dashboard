"use client";

import { User, KeyRound } from "lucide-react";
import Link from "next/link";

const settingsItems = [
    {
        id: 1,
        title: "Profile",
        href: "/settings/profile",
        icon: User,
    },
    {
        id: 2,
        title: "Password",
        href: "/settings/password",
        icon: KeyRound,
    },
];

export default function Settings() {
    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
            <div className="mx-auto max-w-[1500px]">
                <div className="space-y-3">
                    {settingsItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="flex h-[44px] items-center rounded-md border border-[#e5e7eb] bg-white px-4 shadow-[0_2px_8px_rgba(15,23,42,0.05)] transition hover:bg-[#f8fbff]"
                            >
                                <div className="flex items-center gap-2 text-[#2f9bff]">
                                    <Icon className="h-[14px] w-[14px]" strokeWidth={2} />
                                    <span className="text-[12px] font-medium">{item.title}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}