import axiosInstance from "@/lib/instance/axios-instance";
import { AnalyticsResponse } from "../types/typesOverView";

export const overViewApi = {
    fetchAnalytics: async (): Promise<AnalyticsResponse> => {
        const response = await axiosInstance.get("/user/analytics");
        return response.data;
    },
};
