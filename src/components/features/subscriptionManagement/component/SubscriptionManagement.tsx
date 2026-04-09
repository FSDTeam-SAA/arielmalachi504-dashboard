"use client";

import { CheckCircle2 } from "lucide-react";

const plans = [
    {
        id: 1,
        title: "Basic Pack",
        subtitle: "Start Creating with Ease",
        price: "$0",
        period: "/month",
        features: [
            "50 Credits included",
            "Ideal for beginners",
            "Create posters and logos",
            "Easy credit based usage",
            "No monthly commitment",
        ],
        highlighted: false,
    },
    {
        id: 2,
        title: "Standard Pack",
        subtitle: "Best Value for High Volume Design",
        price: "$49",
        period: "/month",
        features: [
            "300 Credits included",
            "Ideal for professionals and teams",
            "Create unlimited posters and logos within credits",
            "Cost effective for frequent usage",
            "No subscription required",
        ],
        highlighted: true,
        badge: "Most Popular",
    },
    {
        id: 3,
        title: "Premium Pack",
        subtitle: "Unlock Maximum Creativity with Premium Credits",
        price: "$99",
        period: "/month",
        features: [
            "500 Credits included",
            "Best for frequent design creation",
            "Create posters and logos anytime",
            "More value per credit",
            "No monthly subscription required",
        ],
        highlighted: false,
    },
];

export default function SubscriptionManagement() {
    return (
        <section className="min-h-screen bg-[#eef4f8] p-4 md:p-6">
            <div className="mx-auto max-w-[1500px]">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button className="h-11 rounded-md border border-[#5ab2ff] bg-white px-6 text-sm font-medium text-[#35a1ff] transition hover:bg-[#f7fbff]">
                        Create Plan
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            title={plan.title}
                            subtitle={plan.subtitle}
                            price={plan.price}
                            period={plan.period}
                            features={plan.features}
                            highlighted={plan.highlighted}
                            badge={plan.badge}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface PlanCardProps {
    title: string;
    subtitle: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
}

function PlanCard({
    title,
    subtitle,
    price,
    period,
    features,
    highlighted = false,
    badge,
}: PlanCardProps) {
    return (
        <div
            className={[
                "relative rounded-[16px] border p-6 transition-all duration-300",
                highlighted
                    ? "border-transparent bg-gradient-to-b from-[#5757f5] to-[#3c37c7] text-white shadow-[0_24px_50px_rgba(79,70,229,0.25)]"
                    : "border-[#7f87ff] bg-white text-[#1f2937]",
            ].join(" ")}
        >
            {highlighted && badge && (
                <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white">
                    {badge}
                </div>
            )}

            <div>
                <h3
                    className={`text-[31px] font-semibold leading-none ${highlighted ? "text-white" : "text-[#4f46e5]"
                        }`}
                >
                    {title}
                </h3>

                <p
                    className={`mt-3 text-sm leading-6 ${highlighted ? "text-white/80" : "text-[#8992a3]"
                        }`}
                >
                    {subtitle}
                </p>
            </div>

            <div className="mt-8 flex items-end gap-1">
                <span
                    className={`text-[54px] font-semibold leading-none ${highlighted ? "text-white" : "text-[#4f46e5]"
                        }`}
                >
                    {price}
                </span>
                <span
                    className={`mb-1 text-[20px] font-medium ${highlighted ? "text-white" : "text-[#4f46e5]"
                        }`}
                >
                    {period}
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
                className={[
                    "mt-8 h-12 w-full rounded-lg text-sm font-medium transition-all duration-300",
                    highlighted
                        ? "bg-white text-[#4f46e5] hover:bg-white/90"
                        : "bg-gradient-to-r from-[#18c8df] to-[#5f72f8] text-white hover:opacity-95",
                ].join(" ")}
            >
                Edit Plan
            </button>
        </div>
    );
}