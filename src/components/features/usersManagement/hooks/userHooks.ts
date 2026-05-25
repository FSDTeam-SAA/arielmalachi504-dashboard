import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/userService";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useUsers = (params: {
    page?: number;
    limit?: number;
    search?: string;
}) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => userService.getAllUsers(params),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userService.deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to delete user";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred while deleting user");
            }
        },
    });
};

export const useBlockUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: { duration?: number; unit?: "minutes" | "hours" | "days"; isPermanent: boolean } }) =>
            userService.blockUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User blocked successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to block user";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred while blocking user");
            }
        },
    });
};

export const useUnblockUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userService.unblockUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User unblocked successfully");
        },
        onError: (error: unknown) => {
            if (isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to unblock user";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred while unblocking user");
            }
        },
    });
};
