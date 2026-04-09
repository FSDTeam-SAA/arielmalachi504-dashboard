import axiosInstance from "../../../../lib/instance/axios-instance";
import { CreateSubscriptionPlan, SubscriptionPlan, UpdateSubscriptionPlan } from "../types/subscription";

export const subscriptionService = {
    getAllSubscriptions: async (): Promise<SubscriptionPlan[]> => {
        const response = await axiosInstance.get("/subscription");
        return response.data.data;
    },

    createSubscription: async (data: CreateSubscriptionPlan): Promise<SubscriptionPlan> => {
        const response = await axiosInstance.post("/subscription", data);
        return response.data.data;
    },

    updateSubscription: async (id: string, data: UpdateSubscriptionPlan): Promise<SubscriptionPlan> => {
        const response = await axiosInstance.put(`/subscription/${id}`, data);
        return response.data.data;
    },

    deleteSubscription: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/subscription/${id}`);
    },
};
