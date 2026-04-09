"use client";

import { ChevronLeft, ChevronRight, Eye, Trash2 } from "lucide-react";

const users = [
    {
        id: 1,
        name: "John Martinez",
        email: "john.m@email.com",
        plan: "Pro Member",
        designs: 12,
        status: "active",
    },
    {
        id: 2,
        name: "John Martinez",
        email: "john.m@email.com",
        plan: "Free Tier",
        designs: 2,
        status: "Inactive",
    },
    {
        id: 3,
        name: "John Martinez",
        email: "john.m@email.com",
        plan: "Enterprise",
        designs: 26,
        status: "active",
    },
    {
        id: 4,
        name: "John Martinez",
        email: "john.m@email.com",
        plan: "Pro Member",
        designs: 3,
        status: "active",
    },
    {
        id: 5,
        name: "John Martinez",
        email: "john.m@email.com",
        plan: "Free Tier",
        designs: 11,
        status: "active",
    },
];

export default function UsersManagement() {
    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
            <div className="mx-auto max-w-[1500px] rounded-xl bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] md:p-5">
                <h1 className="mb-5 text-[20px] font-semibold text-[#666666] md:text-[22px]">
                    Users Management
                </h1>

                <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse">
                            <thead>
                                <tr className="bg-[#f3f4f6]">
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Plan
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Total Designs
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-[#e5e7eb] bg-white"
                                    >
                                        <td className="px-6 py-5 text-[14px] text-[#666666]">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-5 text-[14px] text-[#666666]">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-5">
                                            <PlanBadge plan={user.plan} />
                                        </td>
                                        <td className="px-6 py-5 text-[14px] text-[#666666]">
                                            {user.designs}
                                        </td>
                                        <td className="px-6 py-5">
                                            <StatusBadge status={user.status} />
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <button className="text-[#1f2a44] transition hover:opacity-70">
                                                    <Eye className="h-[18px] w-[18px]" />
                                                </button>
                                                <button className="text-[#ff2b2b] transition hover:opacity-70">
                                                    <Trash2 className="h-[18px] w-[18px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between px-3 py-4 md:px-4">
                        <p className="text-[13px] text-[#a1a1aa]">
                            Showing 4 of 248 users
                        </p>

                        <div className="flex items-center gap-3">
                            <button className="text-[#9ca3af] transition hover:text-[#6b7280]">
                                <ChevronLeft className="h-[18px] w-[18px]" />
                            </button>
                            <button className="text-[#6b7280] transition hover:text-[#374151]">
                                <ChevronRight className="h-[18px] w-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PlanBadge({ plan }: { plan: string }) {
    const styles =
        plan === "Pro Member"
            ? "bg-[#e9c8f8] text-[#6b2d84]"
            : plan === "Enterprise"
                ? "bg-[#bcd3f6] text-[#315d9b]"
                : "bg-[#e5e5e5] text-[#4b3b73]";

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${styles}`}
        >
            {plan}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isActive = status.toLowerCase() === "active";

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${isActive
                    ? "bg-[#d9f0df] text-[#2a9d55]"
                    : "bg-[#ffd6d6] text-[#ef4444]"
                }`}
        >
            {status}
        </span>
    );
}