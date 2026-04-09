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
};
