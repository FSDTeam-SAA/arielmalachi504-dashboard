import axiosInstance from "../instance/axios-instance";
import { AxiosError } from "axios";

export interface AuthResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}



// Forgot Password
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/auth/forget-password", {
      email,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Request failed",
    };
  }
};

// Verify OTP
export const verifyOtp = async (payload: {
  email: string;
  otp: string;
}): Promise<AuthResponse<{ resetToken: string }>> => {
  try {
    const response = await axiosInstance.post("/auth/verify-code", payload);

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || "Verification failed",
    };
  }
};

// Resend Forgot OTP
export const resendForgotOtp = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/auth/resend-forgot-otp", {
      email,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch {
    return {
      success: false,
      message: "Failed to resend OTP",
    };
  }
};

// Reset Password
export const resetPassword = async (
  email: string,
  newPassword: string,
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", {
      email,
      newPassword,
    });

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || "Reset password failed",
    };
  }
};
