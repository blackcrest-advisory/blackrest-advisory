"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import toast from "react-hot-toast";
import { registerUser } from "@/api-client/auth.api";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fadeInUp, hoverScale, pulseScale } from "@/lib/utils/animations";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //===== Handle form submission =====//
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!name) newErrors.name = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== "")) return;

    setIsLoading(true);
    try {
      const data = await registerUser(name, email, password);
      localStorage.setItem("pending_user_id", data.userId);
      toast.success("Account created successfully");
      router.push("/select-industry");
    } catch (error: unknown) {
      let message = "Failed to create account";
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
  };

  //===== Google signup placeholder =====//
  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  return (
    //===== Signup Page =====//
    <PageWrapper>
      <Section>
        {/*===== Decorative blobs =====*/}
        <motion.div
          className="absolute -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          variants={pulseScale}
          initial="initial"
          animate="animate"
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
          variants={pulseScale}
          initial="initial"
          animate="animate"
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <Container>
          <div className="mx-auto max-w-md">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              {...hoverScale}
            >
              <Card hoverEffect className="shadow-md">
                {/*===== Brand =====*/}
                <div className="text-center">
                  <Link href="/" className="inline-block">
                    <span className="text-3xl font-bold text-foreground">
                      Blackcrest<span className="text-secondary">.</span>
                    </span>
                  </Link>
                  <h2 className="mt-4 text-2xl font-semibold text-foreground">
                    Create an account
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start your journey with us
                  </p>
                </div>

                {/*===== Form =====*/}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Full name
                    </label>
                    <div className="mt-1">
                      <Input
                        id="name"
                        type="text"
                        icon={User}
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        type="email"
                        icon={Mail}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-foreground"
                    >
                      Password
                    </label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        icon={Lock}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "border-destructive" : ""}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-foreground"
                    >
                      Confirm password
                    </label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        icon={Lock}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={
                          errors.confirmPassword ? "border-destructive" : ""
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                {/*===== Divider =====*/}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card/80 px-2 text-muted-foreground/60">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/*===== Social signup =====*/}
                <button
                  onClick={handleGoogleSignup}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background/50 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/5 hover:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                >
                  <FaChrome className="h-5 w-5" />
                  Sign up with Google
                </button>

                {/*===== Login link =====*/}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-secondary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
