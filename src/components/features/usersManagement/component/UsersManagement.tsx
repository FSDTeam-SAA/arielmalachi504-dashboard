"use client"
import { ChevronLeft, ChevronRight, Eye, Trash2, Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useUsers, useDeleteUser } from "../hooks/userHooks";
import { UserGenerationHistory } from "../types/user";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { UserGenerationModal } from "./UserGenerationModal";

export default function UsersManagement() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserGenerationHistory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const limit = 10;

    const { data, isLoading, isError } = useUsers({ page, limit, search });
    const deleteMutation = useDeleteUser();

    const users = data?.data?.generationSummary || [];
    const pagination = data?.data?.paginationInfo;

    const handleDelete = (id: string) => {

        deleteMutation.mutate(id);

    };

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Error loading users</h2>
                    <p className="mt-2 text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
            <div className="mx-auto max-w-[1500px] rounded-xl bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] md:p-5">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-[20px] font-semibold text-[#666666] md:text-[22px]">
                        Users Management
                    </h1>
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search users..."
                            className="h-10 pl-10"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

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
                                        Posters
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Logos
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Remaining Credits
                                    </th>
                                    <th className="px-6 py-4 text-left text-[14px] font-semibold text-[#1f2937]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, idx) => (
                                        <tr key={idx} className="border-t border-[#e5e7eb]">
                                            {Array.from({ length: 6 }).map((_, cellIdx) => (
                                                <td key={cellIdx} className="px-6 py-5">
                                                    <Skeleton className="h-4 w-full" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.userId}
                                            className="border-t border-[#e5e7eb] bg-white transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-5 text-[14px] text-[#666666]">
                                                {user.userName}
                                            </td>
                                            <td className="px-6 py-5 text-[14px] text-[#666666]">
                                                {user.userEmail}
                                            </td>
                                            <td className="px-6 py-5 text-[14px] font-medium text-[#666666]">
                                                {user.posterCount}
                                            </td>
                                            <td className="px-6 py-5 text-[14px] font-medium text-[#666666]">
                                                {user.logoCount}
                                            </td>
                                            <td className="px-6 py-5 text-[14px] font-bold text-primary">
                                                {user.remainingCredits}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="cursor-pointer text-[#1f2a44] transition hover:text-primary active:scale-95"
                                                        title="View Generations"
                                                    >
                                                        <Eye className="h-[18px] w-[18px]" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.userId)}
                                                        disabled={deleteMutation.isPending}
                                                        className="cursor-pointer text-[#ff2b2b] transition hover:opacity-70 disabled:opacity-50"
                                                        title="Delete User"
                                                    >
                                                        {deleteMutation.isPending && deleteMutation.variables === user.userId ? (
                                                            <Loader2 className="h-[18px] w-[18px] animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-[18px] w-[18px]" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between px-3 py-4 md:px-4">
                        <p className="text-[13px] text-[#a1a1aa]">
                            Showing {users.length} of {pagination?.totalData || 0} users
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={!pagination?.hasPrevPage || isLoading}
                                className="cursor-pointer text-[#9ca3af] transition hover:text-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronLeft className="h-[18px] w-[18px]" />
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {pagination?.currentPage || 1} of {pagination?.totalPages || 1}
                            </span>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={!pagination?.hasNextPage || isLoading}
                                className="cursor-pointer text-[#6b7280] transition hover:text-[#374151] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <ChevronRight className="h-[18px] w-[18px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <UserGenerationModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
            />
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

function StatusBadge({ isBlocked }: { isBlocked: boolean }) {
    const isActive = !isBlocked;

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${isActive
                ? "bg-[#d9f0df] text-[#2a9d55]"
                : "bg-[#ffd6d6] text-[#ef4444]"
                }`}
        >
            {isActive ? "Active" : "Blocked"}
        </span>
    );
}