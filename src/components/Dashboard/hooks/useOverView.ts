import { useQuery } from "@tanstack/react-query";
import { overViewApi } from "../api/overView.api";

export const useAnalytics = () => {
    return useQuery({
        queryKey: ["dashboard-analytics"],
        queryFn: () => overViewApi.fetchAnalytics(),
    });
};
