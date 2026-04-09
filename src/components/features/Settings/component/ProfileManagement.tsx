"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMe, useUpdateProfile } from "../hooks/settingsHooks";
import { useEffect } from "react";
import { Loader2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileManagement() {
    const { data: response, isLoading: isFetching } = useMe();
    const updateMutation = useUpdateProfile();
    const user = response?.data;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, reset]);

    const onSubmit = (data: ProfileFormValues) => {
        updateMutation.mutate({ name: data.name });
    };

    if (isFetching) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="border-b border-[#f1f5f9] bg-[#f8fafc]/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Profile Settings</h2>
                            <p className="text-xs text-slate-500">Update your personal information</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Full Name</label>
                            <Input
                                {...register("name")}
                                placeholder="Enter your name"
                                className={`h-11 transition-all focus:ring-2 focus:ring-primary/20 ${
                                    errors.name ? "border-red-500 focus:ring-red-100" : "border-slate-200"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-xs font-medium text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <Input
                                {...register("email")}
                                disabled
                                className="h-11 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                            />
                            <p className="text-[11px] text-slate-400 font-medium italic">
                                Email cannot be changed for security reasons.
                            </p>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="h-11 w-full bg-primary text-white cursor-pointer font-bold shadow-md shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {updateMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating Profile...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
