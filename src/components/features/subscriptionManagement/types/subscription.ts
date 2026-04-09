export interface SubscriptionPlan {
    _id: string;
    name: string;
    monthlyPrice: number;
    description: string;
    credits: number;
    features: string[];
    createdAt?: string;
    updatedAt?: string;
}

export type CreateSubscriptionPlan = Omit<SubscriptionPlan, "_id" | "createdAt" | "updatedAt">;
export type UpdateSubscriptionPlan = Partial<CreateSubscriptionPlan>;
