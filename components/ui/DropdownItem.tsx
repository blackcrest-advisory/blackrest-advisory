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
    py-3
    text-sm
    font-medium
    transition-all
    duration-150
    border-l-2
    first:rounded-t-xl
    last:rounded-b-xl

    ${
      danger
        ? "text-red-500 hover:bg-red-50 border-transparent"
        : active
          ? "border-secondary bg-muted text-secondary"
          : "border-transparent text-body hover:bg-muted/50 hover:text-secondary hover:border-secondary/30"
    }

    ${className}
  `;

  const content = (
    <>
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-secondary rounded-full" />
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
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles} w-full text-left cursor-pointer`}
    >
      {content}
    </button>
  );
};

export default DropdownItem;
