import axiosInstance from "@/lib/instance/axios-instance";
import { UserListResponse } from "../types/user";

export const userService = {
    getAllUsers: async (params: {
        page?: number;
        limit?: number;
        search?: string;
    }): Promise<UserListResponse> => {
        const response = await axiosInstance.get("/user/all-users/generation-history", {
            params,
        });
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/user/${id}`);
    },

    blockUser: async (id: string, data: { duration?: number; unit?: "minutes" | "hours" | "days"; isPermanent: boolean }): Promise<unknown> => {
        const response = await axiosInstance.patch(`/user/${id}/block`, data);
        return response.data;
    },

    unblockUser: async (id: string): Promise<unknown> => {
        const response = await axiosInstance.patch(`/user/${id}/unblock`);
        return response.data;
    },
};
