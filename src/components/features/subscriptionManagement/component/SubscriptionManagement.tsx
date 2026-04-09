"use client"
import { CheckCircle2, Loader2, Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import {
    useSubscriptions,
    useCreateSubscription,
    useUpdateSubscription,
    useDeleteSubscription
} from "../hooks/subscriptionHooks";
import { SubscriptionModal } from "./SubscriptionModal";
import { SubscriptionPlan, CreateSubscriptionPlan } from "@/components/features/subscriptionManagement/types/subscription";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionManagement() {
    const { data: plans, isLoading, isError } = useSubscriptions();
    const createMutation = useCreateSubscription();
    const updateMutation = useUpdateSubscription();
    const deleteMutation = useDeleteSubscription();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

    const handleCreate = () => {
        setSelectedPlan(null);
        setIsModalOpen(true);
    };

    const handleEdit = (plan: SubscriptionPlan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this plan?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleSubmit = (data: CreateSubscriptionPlan) => {
        if (selectedPlan) {
            updateMutation.mutate(
                { id: selectedPlan._id, data },
                {
                    onSuccess: () => setIsModalOpen(false),
                }
            );
        } else {
            createMutation.mutate(data, {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-6 flex justify-end">
                        <Skeleton className="h-11 w-32" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-[500px] w-full rounded-[16px]" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Error loading subscriptions</h2>
                    <p className="mt-2 text-gray-600">Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
            <div className="mx-auto max-w-[1500px]">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <Button
                        onClick={handleCreate}
                        className="h-11 rounded-md border border-[#5ab2ff] bg-white px-6 text-sm font-medium text-[#35a1ff] transition hover:bg-[#f7fbff]"
                        variant="outline"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Plan
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {plans && plans.length > 0 ? (
                        plans.map((plan, index) => (
                            <PlanCard
                                key={plan._id}
                                plan={plan}
                                highlighted={index === 1} // Just for visual interest, highlight the middle one or similar
                                onEdit={() => handleEdit(plan)}
                                onDelete={() => handleDelete(plan._id)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-lg text-gray-500">No subscription plans found. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            <SubscriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedPlan}
                title={selectedPlan ? "Edit Subscription Plan" : "Create New Plan"}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />
        </section>
    );
}

interface PlanCardProps {
    plan: SubscriptionPlan;
    highlighted?: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

function PlanCard({
    plan,
    highlighted = false,
    onEdit,
    onDelete,
}: PlanCardProps) {
    const { name, monthlyPrice, description, features } = plan;
    return (
        <div
            className={[
                "relative rounded-[16px] border p-6 transition-all duration-300",
                highlighted
                    ? "border-transparent bg-gradient-to-b from-[#5757f5] to-[#3c37c7] text-white shadow-[0_24px_50px_rgba(79,70,229,0.25)]"
                    : "border-[#7f87ff] bg-white text-[#1f2937]",
            ].join(" ")}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3
                        className={`text-[31px] font-semibold leading-none ${highlighted ? "text-white" : "text-[#4f46e5]"
                            }`}
                    >
                        {name}
                    </h3>

                    <p
                        className={`mt-3 text-sm leading-6 ${highlighted ? "text-white/80" : "text-[#8992a3]"
                            }`}
                    >
                        {description}
                    </p>
                </div>
                <button
                    onClick={onDelete}
                    className={`rounded-full p-2 transition hover:bg-red-50 ${highlighted ? "text-white hover:bg-white/10" : "text-gray-400 hover:text-red-600"
                        }`}
                    title="Delete Plan"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>

            <div className="mt-8 flex items-end gap-1">
                <span
                    className={`text-[54px] font-semibold leading-none ${highlighted ? "text-white" : "text-[#4f46e5]"
                        }`}
                >
                    ${monthlyPrice}
                </span>
                <span
                    className={`mb-1 text-[20px] font-medium ${highlighted ? "text-white" : "text-[#4f46e5]"
                        }`}
                >
                    /month
                </span>
            </div>

            <div className="mt-8 space-y-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <CheckCircle2
                            className={`mt-1 h-4 w-4 shrink-0 ${highlighted ? "text-white" : "text-[#6b6dff]"
                                }`}
                        />
                        <p
                            className={`text-sm leading-6 ${highlighted ? "text-white/90" : "text-[#6b7280]"
                                }`}
                        >
                            {feature}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={onEdit}
                className={[
                    "mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300",
                    highlighted
                        ? "bg-white text-[#4f46e5] hover:bg-white/90"
                        : "bg-gradient-to-r from-[#18c8df] to-[#5f72f8] text-white hover:opacity-95",
                ].join(" ")}
            >
                <Edit2 className="h-4 w-4" />
                Edit Plan
            </button>
        </div>
    );
}