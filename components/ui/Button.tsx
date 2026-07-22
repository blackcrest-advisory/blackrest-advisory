"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "base" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  size = "base",
  className = "",
  onClick,
  href,
  target,
  disabled = false,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center cursor-pointer rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";

  const variantStyles = {
    primary:
      "bg-secondary text-cta-text hover:bg-accent-hover shadow-md hover:shadow-lg",
    secondary: "bg-primary text-background hover:bg-primary/90",
    outline:
      "border-2 border-secondary text-secondary hover:bg-secondary hover:text-cta-text",
    ghost: "text-foreground hover:bg-muted",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    base: "px-2 py-2 text-base",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Add disabled styles
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const combined = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  const content = (
    <motion.span
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className="flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} target={target} className={combined} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combined} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};
