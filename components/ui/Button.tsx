"use client";

import {
  forwardRef,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import Link from "next/link";

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
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
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
      "inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-control)] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px";

    const variantStyles = {
      primary:
        "bg-secondary text-secondary-foreground shadow-[var(--shadow-action)] hover:-translate-y-px hover:bg-secondary/90 hover:shadow-[var(--shadow-action-hover)]",
      secondary: "bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:bg-primary/90 hover:shadow-md",
      outline:
        "border border-border bg-card text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.22)] hover:border-secondary/50 hover:bg-secondary/8 hover:text-secondary",
      ghost: "text-foreground hover:bg-muted/80 hover:text-heading",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:-translate-y-px hover:bg-destructive/90 hover:shadow-md",
      link: "min-h-0 px-0 text-secondary underline-offset-4 hover:text-secondary/80 hover:underline",
    };

    const sizeStyles = {
      sm: "min-h-8 px-3 text-xs",
      base: "px-4 text-sm",
      md: "min-h-11 px-5 text-sm",
      lg: "min-h-12 px-6 text-base",
    };

    const disabledStyles = disabled
      ? "pointer-events-none cursor-not-allowed opacity-45 shadow-none"
      : "";

    const combined = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

    const content = <span className="flex items-center gap-2">{children}</span>;

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
