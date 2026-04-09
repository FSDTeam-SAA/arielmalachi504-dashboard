import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/components/features/subscriptionManagement/api/subscriptionService";
import { CreateSubscriptionPlan, UpdateSubscriptionPlan } from "@/components/features/subscriptionManagement/types/subscription";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useSubscriptions = () => {
    return useQuery({
        queryKey: ["subscriptions"],
        queryFn: subscriptionService.getAllSubscriptions,
    });
};

export const useCreateSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: subscriptionService.createSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
            toast.success("Subscription plan created successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to create subscription plan";
                toast.error(message);
            } else {
                toast.error("Failed to create subscription plan");
            }
        },
    });
};

export const useUpdateSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionPlan }) =>
            subscriptionService.updateSubscription(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
            toast.success("Subscription plan updated successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to update subscription plan";
                toast.error(message);
            } else {
                toast.error("Failed to update subscription plan");
            }
        },
    });
};

export const useDeleteSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: subscriptionService.deleteSubscription,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
            toast.success("Subscription plan deleted successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to delete subscription plan";
                toast.error(message);
            } else {
                toast.error("Failed to delete subscription plan");
            }
        },
    });
};
