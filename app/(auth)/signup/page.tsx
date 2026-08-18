"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";

import { useRegister } from "@/hooks/useSignUp";
import { signupSchema } from "@/lib/validations/auth";

const workspaceBenefits = [
  "Centralised project communication",
  "Secure client workspace",
  "Clear delivery visibility",
];

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupPageFallback />}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const reduceMotion = Boolean(useReducedMotion());

  // ============================================================
  // URL-derived value — NO useEffect + setState required
  // ============================================================

  const searchParams = useSearchParams();

  const selectedIndustry = searchParams.get("industry") ?? "";

  // ============================================================
  // Existing form state
  // ============================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { register, loading } = useRegister();

  // ============================================================
  // Existing signup functionality
  // ============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = {
      email,
      password,
      name,
      confirmPassword,
      industry: selectedIndustry,
    };

    const result = signupSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        password: fieldErrors.password?.[0] ?? "",
        confirmPassword: fieldErrors.confirmPassword?.[0] ?? "",
      });

      return;
    }

    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    await register(result.data);
  };

  // ============================================================
  // Existing Google placeholder functionality
  // ============================================================

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };

  return (
    <PageWrapper>
      <Section
        className="
          relative isolate
          flex min-h-[calc(100vh-4rem)]
          items-center
          overflow-hidden
          bg-background
          py-10
          text-foreground
          transition-colors duration-300
          sm:py-14
          lg:py-16
        "
      >
        {/* ====================================================== */}
        {/* BACKGROUND                                             */}
        {/* ====================================================== */}

        <div className="pointer-events-none absolute inset-0 -z-20">
          {/* grid */}
          <div
            className="absolute inset-0 opacity-[0.2]"
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
                "radial-gradient(48rem 34rem at 50% 48%, black 15%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(48rem 34rem at 50% 48%, black 15%, transparent 78%)",
            }}
          />

          {/* gold atmosphere */}
          <div
            className="
              absolute -right-40 -top-40
              h-[35rem] w-[35rem]
              opacity-60
            "
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 10%, transparent), transparent 68%)",
            }}
          />

          {/* navy atmosphere */}
          <div
            className="
              absolute -bottom-48 -left-40
              h-[36rem] w-[36rem]
              opacity-40
            "
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 9%, transparent), transparent 70%)",
            }}
          />

          {/* moving signal */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="
                absolute left-[-10rem] top-[42%]
                h-px w-32
                bg-gradient-to-r
                from-transparent
                via-secondary
                to-transparent
                shadow-[0_0_14px_var(--color-secondary)]
              "
              animate={{
                x: ["0vw", "115vw"],
                opacity: [0, 0.7, 0.7, 0],
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
            className="
              mx-auto grid
              max-w-5xl
              overflow-hidden
              border border-border
              bg-card
              text-card-foreground
              shadow-[var(--shadow-overlay)]
              lg:grid-cols-[0.92fr_1.08fr]
            "
          >
            {/* ================================================== */}
            {/* LEFT — BRAND STORY                                 */}
            {/* ================================================== */}

            <motion.aside
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
              className="
                relative hidden
                overflow-hidden
                border-r border-border
                bg-primary
                p-10
                text-primary-foreground
                lg:flex
                lg:min-h-[720px]
                lg:flex-col
                lg:justify-between
              "
            >
              {/* decorative glow */}
              <div
                className="
                  pointer-events-none
                  absolute -right-32 -top-24
                  h-80 w-80
                  rounded-full
                  bg-secondary/15
                  blur-[100px]
                "
              />

              {/* vertical architecture */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0
                  opacity-[0.07]
                "
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
                {/* top meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CircleDot className="h-4 w-4 text-secondary" />

                    <span
                      className="
                        font-mono
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-secondary
                      "
                    >
                      Client onboarding
                    </span>
                  </div>

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.17em]
                      text-primary-foreground/30
                    "
                  >
                    BCR / CREATE
                  </span>
                </div>

                {/* brand */}
                <Link
                  href="/"
                  className="
                    mt-10 inline-block
                    rounded-[var(--radius-control)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-secondary/60
                  "
                >
                  <span
                    className="
                      text-3xl
                      font-semibold
                      tracking-[-0.04em]
                      text-primary-foreground
                    "
                  >
                    Blackcrest
                    <span className="text-secondary">.</span>
                  </span>
                </Link>

                {/* statement */}
                <h1
                  className="
                    mt-12
                    max-w-md
                    text-4xl
                    font-semibold
                    leading-[1.05]
                    tracking-[-0.045em]
                    text-primary-foreground
                  "
                >
                  Start the relationship.
                  <span className="block text-primary-foreground/45">
                    Keep everything connected.
                  </span>
                  <span className="text-secondary">
                    Grow from one workspace.
                  </span>
                </h1>

                <p
                  className="
                    mt-6
                    max-w-sm
                    text-sm
                    leading-7
                    text-primary-foreground/55
                  "
                >
                  Create your Blackcrest account to begin your journey and keep
                  future project communication, progress, and collaboration
                  organised in one place.
                </p>

                {/* selected industry */}
                {selectedIndustry && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      mt-8
                      border border-secondary/20
                      bg-secondary/[0.08]
                      p-4
                    "
                  >
                    <p
                      className="
                        font-mono
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.17em]
                        text-secondary
                      "
                    >
                      Selected industry
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        font-semibold
                        capitalize
                        text-primary-foreground
                      "
                    >
                      {selectedIndustry.replaceAll("-", " ")}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* bottom benefits */}
              <div className="relative z-10">
                <div className="border-t border-primary-foreground/10">
                  {workspaceBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
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
                      className="
                        flex items-center
                        justify-between
                        border-b border-primary-foreground/10
                        py-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex h-5 w-5
                            items-center justify-center
                            rounded-full
                            bg-secondary/10
                          "
                        >
                          <Check className="h-3 w-3 text-secondary" />
                        </div>

                        <span
                          className="
                            text-xs
                            font-medium
                            text-primary-foreground/65
                          "
                        >
                          {benefit}
                        </span>
                      </div>

                      <span
                        className="
                          font-mono
                          text-[7px]
                          text-primary-foreground/25
                        "
                      >
                        0{index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-secondary" />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-primary-foreground/35
                    "
                  >
                    Secure account creation
                  </span>
                </div>
              </div>
            </motion.aside>

            {/* ================================================== */}
            {/* RIGHT — SIGNUP FORM                                */}
            {/* ================================================== */}

            <motion.main
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
              className="
                relative
                px-6 py-8
                sm:px-9 sm:py-10
                lg:flex
                lg:min-h-[720px]
                lg:flex-col
                lg:justify-center
                lg:px-12
              "
            >
              {/* mobile brand */}
              <div className="mb-8 lg:hidden">
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href="/"
                    className="
                      rounded-[var(--radius-control)]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring/60
                    "
                  >
                    <span
                      className="
                        text-2xl
                        font-semibold
                        tracking-[-0.035em]
                        text-heading
                      "
                    >
                      Blackcrest
                      <span className="text-secondary">.</span>
                    </span>
                  </Link>

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-muted-foreground/40
                    "
                  >
                    Create account
                  </span>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md">
                {/* heading */}
                <div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-secondary" />

                    <span
                      className="
                        font-mono
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-secondary
                      "
                    >
                      Create your workspace
                    </span>

                    <span className="h-px w-10 bg-secondary/40" />
                  </div>

                  <h2
                    className="
                      mt-4
                      text-3xl
                      font-semibold
                      tracking-[-0.04em]
                      text-heading
                    "
                  >
                    Create an account
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-muted-foreground
                    "
                  >
                    Set up your Blackcrest account to get started.
                  </p>
                </div>

                {/* mobile selected industry */}
                {selectedIndustry && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      mt-6
                      flex items-center
                      justify-between
                      gap-4
                      border border-secondary/20
                      bg-secondary/[0.05]
                      px-4 py-3
                      lg:hidden
                    "
                  >
                    <div>
                      <span
                        className="
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.16em]
                          text-muted-foreground/45
                        "
                      >
                        Selected industry
                      </span>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          capitalize
                          text-heading
                        "
                      >
                        {selectedIndustry.replaceAll("-", " ")}
                      </p>
                    </div>

                    <Check className="h-4 w-4 text-secondary" />
                  </motion.div>
                )}

                {/* ================================================= */}
                {/* FORM — functionality preserved                    */}
                {/* ================================================= */}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2 block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
                    >
                      Full name
                    </label>

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
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2 block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
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
                      className="
                        mb-2 block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
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
                        className="
                          absolute inset-y-0 right-0
                          flex items-center
                          pr-3
                          text-muted-foreground/45
                          transition-colors
                          hover:text-secondary
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-ring/60
                        "
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

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="
                        mb-2 block
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-muted-foreground
                      "
                    >
                      Confirm password
                    </label>

                    <div className="relative">
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
                        className="
                          absolute inset-y-0 right-0
                          flex items-center
                          pr-3
                          text-muted-foreground/45
                          transition-colors
                          hover:text-secondary
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-ring/60
                        "
                        aria-label={
                          showConfirm
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
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
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="group w-full justify-center"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? (
                      <>
                        <Loader size="sm" />

                        <span className="ml-2">Creating account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create account
                        <ArrowUpRight
                          className="
                            ml-2 h-3.5 w-3.5
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                          "
                        />
                      </>
                    )}
                  </Button>
                </form>

                {/* divider */}
                <div className="relative my-7">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>

                  <div className="relative flex justify-center">
                    <span
                      className="
                        bg-card
                        px-4
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.16em]
                        text-muted-foreground/45
                      "
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* ================================================= */}
                {/* GOOGLE — same functionality, correct logo          */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="
                    group
                    flex min-h-12
                    w-full
                    items-center
                    justify-center
                    gap-3
                    border border-border
                    bg-background
                    px-4 py-3
                    text-sm
                    font-medium
                    text-foreground
                    shadow-[var(--shadow-control-inset)]
                    transition-all
                    duration-300
                    hover:border-secondary/25
                    hover:bg-secondary/[0.035]
                    hover:shadow-[var(--shadow-card)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring/60
                  "
                >
                  <FcGoogle className="h-5 w-5 shrink-0" />
                  Sign up with Google
                </button>

                {/* Login */}
                <div
                  className="
                    mt-7
                    border-t border-border
                    pt-6
                    text-center
                  "
                >
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="
                        font-semibold
                        text-secondary
                        underline-offset-4
                        transition-opacity
                        hover:opacity-70
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring/60
                      "
                    >
                      Sign in
                    </Link>
                  </p>
                </div>

                {/* security */}
                <div
                  className="
                    mt-6
                    flex items-center
                    justify-center
                    gap-2
                  "
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      uppercase
                      tracking-[0.14em]
                      text-muted-foreground/40
                    "
                  >
                    Protected Blackcrest account
                  </span>
                </div>
              </div>
            </motion.main>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}

// =================================================================
// Suspense fallback for useSearchParams
// =================================================================

function SignupPageFallback() {
  return (
    <PageWrapper>
      <Section
        className="
          flex min-h-[calc(100vh-4rem)]
          items-center
          bg-background
        "
      >
        <Container>
          <div className="flex justify-center">
            <div
              className="
                flex items-center gap-3
                text-sm
                text-muted-foreground
              "
            >
              <Loader size="sm" />
              Loading account setup...
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
