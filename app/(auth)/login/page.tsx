"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { FaChrome } from "react-icons/fa";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { fadeInUp, hoverScale, pulseScale } from "@/lib/utils/animations";
import { useLogin } from "@/hooks/useLogin";
import { Loader } from "@/components/ui/Loader";
import { loginSchema } from "@/lib/validations/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { login, loading } = useLogin();

  //===== Handle form submission =====//
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
      });

      return;
    }

    setErrors({
      email: "",
      password: "",
    });

    await login(result.data);
  };

  //===== Google login placeholder =====//
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    //===== Login Page =====//
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
                    Welcome back
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to your account
                  </p>
                </div>

                {/*===== Form =====*/}
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-border bg-background/50 text-secondary focus:ring-2 focus:ring-secondary/30"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-muted-foreground"
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
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader size="sm" />
                    ) : (
                      <>
                        Login
                        <LogIn className="mr-2 h-5 w-5" />
                      </>
                    )}
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

                {/*===== Social login =====*/}
                <button
                  onClick={handleGoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-background/50 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary/5 hover:border-secondary/30 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                >
                  <FaChrome className="h-5 w-5" />
                  Sign in with Google
                </button>

                {/*===== Sign up link =====*/}
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-secondary hover:underline"
                  >
                    Create one
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
