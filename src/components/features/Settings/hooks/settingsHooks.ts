import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { settingsService } from "../api/settingsService";
import { ProfileUpdatePayload, ChangePasswordPayload } from "../types/settings";
import { toast } from "sonner";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => settingsService.getMe(),
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProfileUpdatePayload) => settingsService.updateProfile(data),
        onSuccess: (response) => {
            if (response.status) {
                toast.success(response.message || "Profile updated successfully");
                queryClient.invalidateQueries({ queryKey: ["me"] });
            } else {
                toast.error(response.message || "Failed to update profile");
            }
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data: ChangePasswordPayload) => settingsService.changePassword(data),
        onSuccess: (response) => {
            if (response.status) {
                toast.success(response.message || "Password changed successfully");
            } else {
                toast.error(response.message || "Failed to change password");
            }
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });
};
