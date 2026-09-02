import Link from "next/link";
import { ReactNode } from "react";

interface DropdownItemProps {
  children: ReactNode;
  href?: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const DropdownItem = ({
  children,
  href,
  active = false,
  danger = false,
  onClick,
  className = "",
  disabled = false,
}: DropdownItemProps) => {
  const styles = `
    group
    relative
    flex
    items-center
    px-4
    py-2.5
    text-sm
    font-medium
    transition-[background-color,color,transform]
    duration-150
    rounded-[calc(var(--radius-control)-0.0625rem)]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring/50

    ${
      danger
        ? "text-destructive hover:bg-destructive/8"
        : active
          ? "bg-secondary/10 text-secondary"
          : "text-body hover:bg-muted/70 hover:text-foreground"
    }

    ${className}
  `;

  const content = (
    <>
      {active && (
        <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-secondary" />
      )}

      <span className="truncate">{children}</span>

      <svg
        className={`ml-auto h-4 w-4 transition-all duration-200 ${
          active
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles} w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {content}
    </button>
  );
};

export default DropdownItem;
