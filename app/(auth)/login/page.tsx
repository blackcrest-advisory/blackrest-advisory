"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";

import { useLogin } from "@/hooks/useLogin";
import { loginSchema } from "@/lib/validations/auth";

const trustSignals = [
  "Secure client workspace",
  "Protected account access",
  "Centralised project visibility",
];

export default function LoginPage() {
  const reduceMotion = Boolean(useReducedMotion());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useLogin();

  // ============================================================
  // Existing login functionality
  // ============================================================

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

  // Existing Google placeholder functionality remains unchanged
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <PageWrapper>
      <Section
        className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-background py-10 text-foreground transition-colors duration-300 sm:py-14 lg:py-16"
      >
        {/* ====================================================== */}
        {/* Background architecture                               */}
        {/* ====================================================== */}

        <div className="pointer-events-none absolute inset-0 -z-20">
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  color-mix(in srgb, var(--color-border) 65%, transparent) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  color-mix(in srgb, var(--color-border) 65%, transparent) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(46rem 34rem at 50% 45%, black 15%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(46rem 34rem at 50% 45%, black 15%, transparent 78%)",
            }}
          />

          <div
            className="absolute -right-40 -top-40 h-[34rem] w-[34rem] opacity-60"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 10%, transparent), transparent 68%)",
            }}
          />

          <div
            className="absolute -bottom-48 -left-40 h-[36rem] w-[36rem] opacity-40"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 70%)",
            }}
          />

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute left-[-10rem] top-[36%] h-px w-32 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_14px_var(--color-secondary)]"
              animate={{
                x: ["0vw", "115vw"],
                opacity: [0, 0.75, 0.75, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
              }}
            />
          )}
        </div>

        <Container className="relative">
          <div
            className="mx-auto grid max-w-5xl overflow-hidden border border-border bg-card text-card-foreground shadow-[var(--shadow-overlay)] lg:grid-cols-[0.92fr_1.08fr]"
          >
            {/* ================================================== */}
            {/* LEFT — Brand / workspace context                   */}
            {/* ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -24,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden overflow-hidden border-r border-border bg-primary p-10 text-primary-foreground lg:flex lg:min-h-[650px] lg:flex-col lg:justify-between"
            >
              {/* glow */}
              <div
                className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-secondary/15 blur-[100px]"
              />

              {/* subtle line system */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      to right,
                      rgba(255,255,255,0.7) 1px,
                      transparent 1px
                    )
                  `,
                  backgroundSize: "25% 100%",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleDot className="h-4 w-4 text-secondary" />

                    <span
                      className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary"
                    >
                      Client workspace
                    </span>
                  </div>

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.17em] text-primary-foreground/35"
                  >
                    BCR / ACCESS
                  </span>
                </div>

                <Link
                  href="/"
                  className="mt-10 inline-block rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                >
                  <span
                    className="text-3xl font-semibold tracking-[-0.04em] text-primary-foreground"
                  >
                    Blackcrest
                    <span className="text-secondary">.</span>
                  </span>
                </Link>

                <h1
                  className="mt-12 max-w-md text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-primary-foreground"
                >
                  Your projects.
                  <span className="block text-primary-foreground/45">
                    Your communication.
                  </span>
                  <span className="text-secondary">One workspace.</span>
                </h1>

                <p
                  className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/55"
                >
                  Sign in to access project updates, shared information, and
                  your Blackcrest client workspace.
                </p>
              </div>

              {/* trust signals */}
              <div className="relative z-10">
                <div className="border-t border-primary-foreground/10">
                  {trustSignals.map((signal, index) => (
                    <motion.div
                      key={signal}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.35 + index * 0.08,
                      }}
                      className="flex items-center justify-between border-b border-primary-foreground/10 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10"
                        >
                          <Check className="h-3 w-3 text-secondary" />
                        </div>

                        <span
                          className="text-xs font-medium text-primary-foreground/65"
                        >
                          {signal}
                        </span>
                      </div>

                      <span
                        className="font-mono text-[7px] text-primary-foreground/25"
                      >
                        0{index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-secondary" />

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary-foreground/35"
                  >
                    Secure Blackcrest access
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ================================================== */}
            {/* RIGHT — Login workspace                            */}
            {/* ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : 22,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative px-6 py-8 sm:px-9 sm:py-10 lg:flex lg:min-h-[650px] lg:flex-col lg:justify-center lg:px-12"
            >
              {/* mobile branding */}
              <div className="mb-8 lg:hidden">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <span
                      className="text-2xl font-semibold tracking-[-0.035em] text-heading"
                    >
                      Blackcrest
                      <span className="text-secondary">.</span>
                    </span>
                  </Link>

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
                  >
                    Secure access
                  </span>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md">
                {/* heading */}
                <div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-secondary" />

                    <span
                      className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-secondary"
                    >
                      Welcome back
                    </span>

                    <span className="h-px w-10 bg-secondary/40" />
                  </div>

                  <h2
                    className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-heading"
                  >
                    Sign in to your account
                  </h2>

                  <p
                    className="mt-2 text-sm leading-6 text-muted-foreground"
                  >
                    Enter your Blackcrest account credentials to continue.
                  </p>
                </div>

                {/* ================================================= */}
                {/* Existing form functionality                       */}
                {/* ================================================= */}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Email address
                    </label>

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
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="mt-2 text-xs text-destructive"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Password
                    </label>

                    <div className="relative">
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
                        className="absolute inset-y-0 right-0 flex items-center rounded-[var(--radius-control)] pr-3 text-muted-foreground/45 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {errors.password && (
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        className="mt-2 text-xs text-destructive"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Remember / forgot */}
                  <div
                    className="flex flex-wrap items-center justify-between gap-3"
                  >
                    <label
                      htmlFor="remember"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded-[3px] border-border bg-background accent-secondary focus:ring-2 focus:ring-secondary/30"
                      />

                      <span
                        className="text-sm text-muted-foreground"
                      >
                        Remember me
                      </span>
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-secondary underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="group w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader size="sm" />
                        <span className="ml-2">Signing in...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                      </>
                    )}
                  </Button>
                </form>

                {/* divider */}
                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>

                  <div
                    className="relative flex justify-center"
                  >
                    <span
                      className="bg-card px-4 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45"
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* ================================================= */}
                {/* Google — functionality unchanged                  */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="group flex min-h-12 w-full items-center justify-center gap-3 border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-[var(--shadow-control-inset)] transition-all duration-300 hover:border-secondary/25 hover:bg-secondary/[0.035] hover:shadow-[var(--shadow-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  {/* Correct Google logo */}
                  <FcGoogle className="h-5 w-5 shrink-0" />

                  <span>Sign in with Google</span>
                </button>

                {/* Signup */}
                <div
                  className="mt-7 border-t border-border pt-6 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-semibold text-secondary underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      Create one
                    </Link>
                  </p>
                </div>

                {/* security footer */}
                <div
                  className="mt-6 flex items-center justify-center gap-2"
                >
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-success"
                  />

                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
                  >
                    Protected Blackcrest workspace
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
