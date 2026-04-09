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
