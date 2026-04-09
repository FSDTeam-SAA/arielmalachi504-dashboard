"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useChangePassword } from "../hooks/settingsHooks";
import { KeyRound, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const passwordSchema = z.object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirmation must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function PasswordManagement() {
    const passwordMutation = useChangePassword();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: PasswordFormValues) => {
        passwordMutation.mutate({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        }, {
            onSuccess: (res) => {
                if (res.status) reset();
            }
        });
    };

    return (
        <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="border-b border-[#f1f5f9] bg-[#f8fafc]/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-[#ff4b4b]">
                            <KeyRound className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Security</h2>
                            <p className="text-xs text-slate-500">Update your account password</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Current Password</label>
                            <div className="relative">
                                <Input
                                    type={showOld ? "text" : "password"}
                                    {...register("oldPassword")}
                                    placeholder="Enter current password"
                                    className={`h-11 border-slate-200 transition-all focus:ring-2 focus:ring-red-100 ${
                                        errors.oldPassword ? "border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOld(!showOld)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.oldPassword && (
                                <p className="text-xs font-medium text-red-500">{errors.oldPassword.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">New Password</label>
                                <div className="relative">
                                    <Input
                                        type={showNew ? "text" : "password"}
                                        {...register("newPassword")}
                                        placeholder="Enter new password"
                                        className={`h-11 border-slate-200 transition-all focus:ring-2 focus:ring-primary/20 ${
                                            errors.newPassword ? "border-red-500" : ""
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNew(!showNew)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-xs font-medium text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Confirm New Password</label>
                                <div className="relative">
                                    <Input
                                        type={showConfirm ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        placeholder="Confirm new password"
                                        className={`h-11 border-slate-200 transition-all focus:ring-2 focus:ring-primary/20 ${
                                            errors.confirmPassword ? "border-red-500" : ""
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs font-medium text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 flex items-start gap-3">
                            <ShieldCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="text-[13px] font-bold text-slate-800">Password Requirements</h4>
                                <ul className="list-inside list-disc text-[11px] text-slate-500 space-y-0.5">
                                    <li>At least 6 characters long</li>
                                    <li>Must match the confirmation field</li>
                                    <li>Should be different from your current password</li>
                                </ul>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={passwordMutation.isPending}
                                className="h-11 w-full bg-primary cursor-pointer font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-primary/80 hover:scale-[1.01] active:scale-[0.99]"
                            >
                                {passwordMutation.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating Password...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
