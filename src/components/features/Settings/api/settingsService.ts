import axiosInstance from "@/lib/instance/axios-instance";
import { 
    SettingsApiResponse, 
    UserProfile, 
    ProfileUpdatePayload, 
    ChangePasswordPayload 
} from "../types/settings";

export const settingsService = {
    getMe: async (): Promise<SettingsApiResponse<UserProfile>> => {
        const response = await axiosInstance.get("/user/me");
        return response.data;
    },

    updateProfile: async (data: ProfileUpdatePayload): Promise<SettingsApiResponse<UserProfile>> => {
        const response = await axiosInstance.put("/user/me", data);
        return response.data;
    },

    changePassword: async (data: ChangePasswordPayload): Promise<SettingsApiResponse<null>> => {
        const response = await axiosInstance.post("/auth/change-password", data);
        return response.data;
    }
};
