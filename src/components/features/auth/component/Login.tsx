"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error(result?.error || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-[48px] font-semibold leading-none text-[#4D8DFF]">
          Welcome Back!
        </h1>
        <p className="mt-3 text-[15px] text-[#8C8C8C]">
          Sign in to your account.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        {/* Email */}
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#6D6D6D]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="hello@example.com"
            className="h-[54px] w-full rounded-md border border-transparent bg-[#F3F8FB] px-4 text-[15px] text-[#374151] outline-none placeholder:text-[#C0C7D1] focus:border-[#7AA7FF]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-[15px] font-medium text-[#6D6D6D]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="h-[54px] w-full rounded-md border border-transparent bg-[#F3F8FB] px-4 pr-12 text-[15px] text-[#374151] outline-none placeholder:text-[#C0C7D1] focus:border-[#7AA7FF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7A7A] hover:text-[#4B5563]"
            >
              {showPassword ? (
                <EyeOff className="h-[18px] w-[18px]" />
              ) : (
                <Eye className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#8A8A8A]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border border-[#D1D5DB]"
            />
            Remember me
          </label>

          <Link
            href="/forget-password"
            className="text-sm text-[#7EA7FF] underline-offset-2 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="flex h-[54px] w-full items-center justify-center rounded-md bg-gradient-to-r from-[#19C7DF] to-[#4D8DFF] text-[15px] font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        {/* Bottom Text */}
        <p className="pt-8 text-center text-[15px] text-[#6D6D6D]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#4D8DFF] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}