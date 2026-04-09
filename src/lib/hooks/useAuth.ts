// src/lib/hooks/useAuth.ts
"use client";

import { useState } from "react";
import {
  AuthResponse,
  forgotPassword,
  resendForgotOtp,
  resetPassword,
  verifyOtp,
} from "../services/authService";


export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgotPassword = async (email: string): Promise<AuthResponse> => {

    setLoading(true);
    setError(null);

    const res = await forgotPassword(email);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  // Handle OTP verification
  const handleVerifyOtp = async (
    otp: string,
  ): Promise<AuthResponse<{ resetToken: string }>> => {


    setLoading(true);
    setError(null);

    const email = localStorage.getItem("user_email") || "";

    if (!email) {
      setError("Email not found. Please try the forgot password flow again.");
      setLoading(false);
      return { success: false, message: "Email not found in storage" };
    }

    const res = await verifyOtp({ email, otp });

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  //  NEW — Resend OTP
  const handleResendOtp = async (): Promise<AuthResponse> => {

    setLoading(true);
    setError(null);

    const email = localStorage.getItem("user_email") || "";

    if (!email) {
      setError("Email not found. Please try the forgot password flow again.");
      setLoading(false);
      return { success: false, message: "Email not found in storage" };
    }

    const res = await resendForgotOtp(email);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  // Reset Password hook
  const handleResetPassword = async (
    newPassword: string,
  ): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    const email = localStorage.getItem("user_email") || "";

    if (!email) {
      setError("Email not found. Please try the forgot password flow again.");
      setLoading(false);
      return { success: false, message: "Email not found in storage" };
    }

    const res = await resetPassword(email, newPassword);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.message || "Something went wrong");
    }

    setLoading(false);
    return res;
  };

  return {
    loading,
    result,
    error,
    handleVerifyOtp,
    handleForgotPassword,
    handleResendOtp,
    handleResetPassword,
  };
}
