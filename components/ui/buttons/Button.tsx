"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  target,
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50";

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
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combined = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={target} className={combined} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={combined} onClick={onClick}>
      {content}
    </button>
  );
};
