"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "@/api-client/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation – replace with your logic
    const newErrors = { email: "", password: "" };
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);

      try {
        const response = await axios.post<{ success: boolean }>(
          "/api/auth/login",
          {
            email,
            password,
          },
        );

        if (response.data.success) {
          toast.success("Welcome back");
          router.push("/client/dashboard");
        }
      } catch (error: unknown) {
        let message = "Invalid email or password";

        if (typeof error === "object" && error !== null && "response" in error) {
          const response = error as { response?: { data?: unknown } };
          const responseData = response.response?.data;

          if (
            typeof responseData === "object" &&
            responseData !== null &&
            "error" in responseData &&
            typeof responseData.error === "string"
          ) {
            message = responseData.error;
          }
        }

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    // Will be replaced with Google OAuth flow
    console.log("Google login clicked");
  };

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-br from-secondary/10 via-background to-primary/10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-20  h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card-bg/80 p-8 shadow-2xl backdrop-blur-sm"
      >
        {/* Brand */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-heading">
              Blackcrest<span className="text-secondary">.</span>
            </span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-heading">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-body">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-body"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-body/50" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-background/50 pl-10 pr-3 py-2.5 text-heading placeholder:text-body/50 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-colors`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-body"
            >
              Password
            </label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-body/50" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-border"
                } bg-background/50 pl-10 pr-10 py-2.5 text-heading placeholder:text-body/50 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-colors`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-body/50 hover:text-body transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-border bg-background/50 text-secondary focus:ring-2 focus:ring-secondary/30"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-body"
              >
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-secondary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/30"
          >
            <LogIn className="h-5 w-5" />
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card-bg/80 px-2 text-body/60">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social login */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background/50 py-2.5 text-sm font-medium text-heading transition-all hover:bg-secondary/5 hover:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/30"
        >
          <FaChrome className="h-5 w-5" />
          Sign in with Google
        </button>

        {/* Sign up link */}
        <p className="mt-6 text-center text-sm text-body">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-secondary hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
