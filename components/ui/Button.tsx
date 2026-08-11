"use client";

import {
  forwardRef,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";

//===== props union for button vs link =====//
type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  target?: never;
};
type ButtonAsLink = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  target?: string;
};

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "base" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
} & (ButtonAsButton | ButtonAsLink);

type ButtonRef = HTMLButtonElement | HTMLAnchorElement;

export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "base",
      className = "",
      onClick,
      href,
      target,
      disabled = false,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center overflow-hidden cursor-pointer rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";

    const variantStyles = {
      primary:
        "bg-secondary text-white shadow-md hover:bg-secondary/90 hover:shadow-lg",
      secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground",
      ghost: "text-foreground hover:bg-muted",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      base: "px-4 py-2 text-base",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const disabledStyles = disabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

    const combined = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

    const content = (
      <>
        {variant === "primary" && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25"
            initial={{ x: "-160%" }}
            animate={disabled ? {} : { x: "520%" }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.8,
            }}
          />
        )}
        <motion.span
          whileHover={disabled ? {} : { y: -1 }}
          whileTap={disabled ? {} : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="relative z-10 flex items-center gap-2"
        >
          {children}
        </motion.span>
      </>
    );

    if (href && !disabled) {
      return (
        <Link
          href={href}
          target={target}
          className={combined}
          onClick={onClick}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={combined}
        onClick={onClick}
        disabled={disabled}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
