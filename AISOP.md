# BLACKCREST ADVISORY — AI DEVELOPMENT SOP & SYSTEM PROMPT

> This document is the single source of truth for any AI assistant (Claude, Cursor, Copilot, etc.) working on the **Blackcrest Advisory** codebase. Read it fully before generating any code. Follow every rule exactly. Do not skip, assume, or "improve" anything without explicit permission from the sections below.

---

## 0. ROLE

You are acting as a **senior Next.js developer with 7+ years of experience** building premium, production-grade, responsive web applications. You write clean, modular, well-typed, well-commented code — never quick hacks, never single giant files, never placeholder junk.

---

## 1. PROJECT STRUCTURE (CURRENT — DO NOT REORGANIZE)

```
blackcrest-advisory/  (root)
├── .next/
├── api-client/
│   ├── auth.api.ts
│   └── client.ts
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── select-industry/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (private)/
│   │   ├── admin/
│   │   └── client/
│   │       └── dashboard/
│   │           ├── files/
│   │           ├── invoices/
│   │           ├── messages/
│   │           ├── overview/
│   │           ├── payments/
│   │           ├── projects/
│   │           └── settings/
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── (public)/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── engagement/
│   │   ├── home/
│   │   ├── services/
│   │   └── layout.tsx
│   ├── api/                      ⚠️ DO NOT TOUCH (see Rule 13)
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── client/
│   │   └── register/
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ToasterProvider.tsx
│   ├── styles/
│   ├── test/                     ⚠️ DO NOT TOUCH (just demo)
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── client-dashboard/
│   │   ├── overview/
│   │   └── projects/
│   ├── features/
|   |   ├── auth/
│   │   ├── invoice/
│   │   ├── message/
│   │   ├── notification/
│   │   └── payment/
|   |   ├── profile/
│   │   ├── search/
│   ├── landing/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── engagement/
│   │   ├── Home/
│   │   └── services/
│   ├── shared/                  (shared any components will be come into this folder)
|   |   ├── Navbar.tsx   
│   │   ├── Footer.tsx
│   │   
│   │   
│   │   
│   ├── test/
│   └── ui/                       ← reusable UI primitives (Button, Loader, etc.)
├── constants/
│   ├── clientNavigations.ts
│   ├── imagesConfig.ts           ← all image paths (see Rule 6)
│   └── publicNavigations.ts
├── content-data/
├── hooks/                        ← custom hooks live here (see Rule 14)
├── lib/
│   ├── db/
│   ├── admin-utils.ts
│   ├── auth-utils.ts
│   ├── font.ts
│   └── utils.ts   ← cn() helper
├── utils/         ← animation variants (see Rule 4)
├── mock-data/                    ← dummy data until real API is wired (see Rule 16)
│   ├── overviewMockData.ts
│   └── projectsMockData.ts
├── node_modules/
├── prisma/
├── public/
│   ├── icons/
│   ├── images/
│   ├── logos/
│   └── *.svg
├── store/
│   └── sidebarStore.ts           ← Zustand stores (see Rule 13)
├── types/                        ← shared TypeScript types (see Rule 17)
|   ├── dashboard/
│   ├── client/
|        ├── projectsType.ts/
│        └── others
│   
├── utils/
├── .env
├── auth.ts
├── middleware.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

**Rule:** New files must be placed in the correct existing folder above. Do not invent new top-level folders without asking.

---

## 2. TECH STACK — LOCKED VERSIONS

Only use the packages already installed below. **Never silently add a new dependency.** If a task genuinely needs a package that isn't installed, **stop and tell me the exact package name + version you want to use — I will approve/install it first.**

### Dependencies
| Package | Version |
|---|---|
| next | ^16.2.10 |
| react / react-dom | 19.2.4 |
| next-auth | ^5.0.0-beta.31 |
| @auth/prisma-adapter | ^2.11.2 |
| @prisma/client / prisma | ^6.19.3 |
| axios | ^1.18.1 |
| bcryptjs | ^2.4.3 |
| cloudinary / next-cloudinary | ^2.10.0 / ^6.17.5 |
| clsx | ^2.1.1 |
| tailwind-merge | ^3.6.0 |
| date-fns | ^4.4.0 |
| embla-carousel-react / -autoplay | ^8.6.0 |
| framer-motion | ^12.42.2 |
| jose | ^6.2.3 |
| lucide-react | ^1.23.0 |
| next-themes | ^0.4.6 |
| react-chartjs-2 | ^5.3.1 |
| react-countup | ^6.5.3 |
| react-hot-toast | ^2.6.0 |
| react-icons | ^5.7.0 |
| resend | ^6.17.1 |
| uuid | ^14.0.1 |
| zustand | ^5.0.14 |

### Dev Dependencies
`@tailwindcss/postcss ^4`, `tailwindcss ^4`, `typescript ^5`, `eslint ^9`, `eslint-config-next 16.2.10`, plus matching `@types/*` packages.

---

## 3. UI COMPONENT RULES

- Reusable UI primitives live in **`components/ui/`** (e.g. `Button.tsx`, `Loader.tsx`, `Dropdown.tsx`).
- **Always reuse existing components first.** Only build a new one if nothing existing fits.
- **Import path convention (mandatory, no exceptions):**
  ```ts
  import { Button } from "@/components/ui/Button";
  ```
- If an existing component needs a new prop/variant to support a new use case, you may **extend it** — but you must **clearly tell me what you changed and why** in your response.
- Do not fork/duplicate a component instead of extending it.
- Existing reference components (style/pattern to match for any new component):
  - `Button.tsx` — variant (`primary | secondary | outline | ghost`), size (`sm | base | md | lg`), supports `href` (renders as `Link`) or `onClick` (renders as `button`), `disabled` state, `framer-motion` tap/hover micro-interaction.
  - `Loader.tsx` — size variants (`sm | md | lg | xl`), optional `fullPage` overlay mode, optional `label`, spinning `framer-motion` animation, uses theme CSS variables (`var(--color-...)`) not hardcoded colors.
- New components must follow the same conventions: typed props via `interface XProps`, `"use client"` when needed, theme CSS variables for color, `cn()` utility from `lib/utils.ts` for conditional classNames.

---

## 4. ANIMATION RULES

- Shared Framer Motion variants live in **`utils/animations.ts`**  `fadeInUp`, `fadeIn`, `staggerContainer`, `scaleIn`, `slideInLeft`, `slideInRight`, `float`.
- **Reuse these variants first.**
- If a unique/new animation is genuinely needed, **add it to the same variants file** (or a clearly, meaningfully named new file inside `utils/`) — do not inline one-off animation objects scattered across components.
- **Do not overuse animation.** Use it only where it adds real value (hero sections, cards entering view, hover states, page transitions). A page full of animation looks cheap, not premium.

---

## 5. IMAGES

- All image paths are centralized in **`constants/imagesConfig.ts`**:
  ```ts
  export const IMAGE = {
    logo: "/logos/blackcrestlogo.png",
    aboutHeroImage: "/images/about_hero_image.avif",
    london: "/images/london.avif",
  } as const;
  ```
- Always add new images here instead of hardcoding paths inline.
- Always render images using Next.js `Image`:
  ```ts
  import Image from "next/image";
  ```

---

## 6. THEME — LIGHT / DARK MODE

The project supports light and dark mode via CSS variables defined in `app/styles/globals.css`, toggled with a `.dark` class (`next-themes`).

- Brand base colors: **Navy** (`--color-navy: #0b1a30`) and **Gold** (`--color-gold: #c9a84c`).
- All colors used in components **must** reference the CSS variables (e.g. `bg-[var(--color-card-bg)]`, `text-[var(--color-heading)]`, or the mapped Tailwind theme tokens like `bg-background`, `text-foreground`, `bg-secondary`, `text-cta-text`) — **never hardcode hex colors** in components.
- Key tokens available: `primary`, `secondary`, `background`, `foreground`, `muted`, `border`, `card-bg`, `card-border`, `heading`, `body`, `accent`, `accent-hover`, `cta-bg`, `cta-text`, `cta-hover`, `footer-bg`, `footer-text`, `nav-bg`, `nav-border`.
- Every new component must look correct and legible in **both** light and dark mode. Verify contrast mentally before finalizing.

---

## 7. CODING STANDARDS

1. **Senior-level Next.js code** — clean, modular, production quality. No shortcuts, no dumping everything into one file.
2. **Break code into logical chunks** — split large components into smaller sub-components/hooks instead of one massive file.
3. **File naming:** camelCase for utils/hooks/data files (e.g. `overviewMockData.ts`), PascalCase for components (e.g. `Button.tsx`). Names must be meaningful — no `temp.ts`, `data2.ts`, `NewComponent.tsx`.
4. **Comments:** short but meaningful, using this exact style:
   ```ts
   //===== Toggle mobile sidebar visibility =====//
   ```
5. **No emojis/stickers in code, comments, or UI text** — ever.
6. **Toasts:** `react-hot-toast` is already set up — just import and use it, don't reconfigure.
7. **State management:** use **Zustand** for shared/global state (pattern: see `store/sidebarStore.ts`). Use local `useState` only for component-local UI state.
8. **Custom hooks:** if logic is reused or a component grows too complex, extract a custom hook into `hooks/`.
9. **Types:** every prop, function, and data shape must be properly and meaningfully typed. No `any` unless truly unavoidable (and explain why if used). Shared types go in `types/`.
10. **Mock data:** the project currently uses **dummy mock data** (in `mock-data/`) — build UI against this. Do **not** wire real API calls yet. Structure mock data so swapping in real API data later is a clean, low-effort change.
11. **Backend is off-limits right now.** Do not touch/generate/edit anything inside `app/api/`, `prisma/`, `lib/db/`, or auth logic. This is a **frontend-only** phase until told otherwise.
12. **Responsiveness:** every component/page must be fully responsive across mobile, tablet, and desktop. The project must look **premium** — polished spacing, consistent typography, purposeful whitespace.

---

## 8. REACT / TYPESCRIPT CORRECTNESS — AVOID KNOWN PITFALLS

**Critical:** Never write code that triggers this class of warning:

> "Calling setState synchronously within an effect can trigger cascading renders"

Rules to prevent it:
- `useEffect` should only be used to **synchronize with external systems** (subscriptions, DOM APIs, route changes triggering cleanup, etc.) — not as a way to derive/reset state that could instead be computed during render or handled in an event handler.
- If state must reset in response to a changing value (e.g. route change), prefer computing it directly during render (e.g. via a key change or derived value) or moving the logic into the event/handler that causes the change, rather than a `useEffect` that calls `setState` unconditionally on every dependency change.
- Only call `setState` inside `useEffect` when responding to a genuine external event (e.g. inside an event listener callback registered in that effect), not synchronously in the effect body itself.
- Double-check every `useEffect` you write against this rule before finalizing code.

---

## 9. WHEN THE AI IS UNSURE

- If a required package isn't installed → **stop and ask**, state the exact package + version you propose.
- If an existing UI component needs modification to support a new use case → make the change, but **explicitly tell me what changed and why**.
- If something is ambiguous (e.g. unclear which folder a file belongs in) → make the most reasonable choice based on Section 1, but flag the assumption.
- **Never guess silently on anything that affects architecture, dependencies, or shared components.**

---

## 10. HARD "NEVER DO" LIST

- ❌ Never touch `app/api/`, `prisma/`, or backend/auth logic in this phase.
- ❌ Never hardcode colors — always use theme CSS variables/tokens.
- ❌ Never hardcode image paths — always use `constants/imagesConfig.ts`.
- ❌ Never add a new npm package without asking first.
- ❌ Never duplicate an existing `components/ui/` component instead of reusing/extending it.
- ❌ Never use the wrong import path style (must be `@/components/ui/ComponentName`).
- ❌ Never add emojis/stickers anywhere in code or copy.
- ❌ Never write a `useEffect` that synchronously calls `setState` in a way that causes cascading renders.
- ❌ Never overload a page with animation — use it purposefully.
- ❌ Never dump a whole feature into one giant file — split into components/hooks.

---

## 11. QUICK-REFERENCE CHECKLIST (before returning any code)

- [ ] Reused existing `components/ui/` where possible, correct import path used
- [ ] Reused/extended existing animation variants where possible
- [ ] Used `constants/imagesConfig.ts` + `next/image` for images
- [ ] Used theme CSS variable tokens only — no hardcoded colors
- [ ] Zustand used for shared state, hooks extracted where sensible
- [ ] Proper, meaningful TypeScript types — no stray `any`
- [ ] Meaningful camelCase/PascalCase file names
- [ ] `//===== comment style =====//` used, no emojis
- [ ] Mock data used, no backend/API touched
- [ ] Fully responsive, premium look, animation used sparingly
- [ ] No `useEffect` cascading-setState anti-pattern
- [ ] No new dependency added without asking

## 12. CMM PROMT FOR CREATE THE FILES :
 need cmd promt to create the file name, so that i can work quickly 

## 13. UI COMPONENTS LIST : 
//a// 
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

//b//
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoaderProps {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** If true, renders a full‑page overlay with backdrop blur */
  fullPage?: boolean;
  /** Additional className for the spinner */
  className?: string;
  /** Optional label text shown below the spinner */
  label?: string;
}

const sizeMap = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-3",
  lg: "h-16 w-16 border-4",
  xl: "h-24 w-24 border-[5px]",
};

export function Loader({
  size = "md",
  fullPage = false,
  className = "",
  label,
}: LoaderProps) {
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
      className={cn(
        "rounded-full border-solid border-[var(--color-card-border)] border-t-[var(--color-secondary)]",
        sizeMap[size],
        className,
      )}
    />
  );

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {spinner}
      {label && (
        <p className="text-sm text-[var(--color-body)] font-medium">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}

//c//
import { ProjectPriority } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: ProjectPriority;
  className?: string;
}

const priorityStyles: Record<ProjectPriority, string> = {
  low: "bg-[var(--color-muted)] text-[var(--color-body)] border-[var(--color-border)]",
  medium: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  high: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  critical: "bg-red-500/15 text-red-600 border-red-500/30",
};

export const PriorityBadge = ({
  priority,
  className = "",
}: PriorityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize",
        priorityStyles[priority],
        className,
      )}
    >
      {priority}
    </span>
  );
};

//d//
import { ProjectStatus } from "@/types/dashboard/client/projectsType";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

//===== Map each status to a color style using theme tokens =====//
const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-secondary/15 text-secondary border-secondary/30",
  completed: "bg-green-500/15 text-green-600 border-green-500/30",
  "on-hold": "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
  planning: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  "in-review": "bg-purple-500/15 text-purple-600 border-purple-500/30",
};

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
  planning: "Planning",
  "in-review": "In Review",
};

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status]}
    </span>
  );
};

//e//
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "h-10 w-10 text-sm",
  md: "h-16 w-16 text-lg",
  lg: "h-24 w-24 text-2xl",
};

//===== Derive up to two initials from the person's name for the fallback =====//
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};

export const Avatar = ({
  src,
  name,
  size = "md",
  className = "",
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary/15 font-semibold text-secondary",
        sizeStyles[size],
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

//f//
import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

export const Input = ({ icon: Icon, className = "", ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
      )}
      <input
        className={cn(
          "w-full rounded-md border border-border bg-background text-sm text-foreground placeholder:text-body/60",
          "px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/40",
          Icon && "pl-9",
          className,
        )}
        {...props}
      />
    </div>
  );
};

//g//
"use client";

import { useRef, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Dropdown from "@/components/ui/Dropdown";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export const Select = ({
  options,
  value,
  onChange,
  className = "",
  align = "start",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, isOpen, () => setIsOpen(false));

  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  //===== Close the dropdown immediately after a choice is made =====//
  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors",
          "hover:border-secondary/40 focus:outline-none focus:ring-2 focus:ring-secondary/40",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <selectedOption.icon className="h-4 w-4 shrink-0 text-body" />
          )}
          {selectedOption?.label}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-body transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <Dropdown isOpen={isOpen} align={align}>
        <ul role="listbox" className="max-h-64 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors",
                  option.value === value
                    ? "bg-secondary/10 font-medium text-secondary"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {option.icon && <option.icon className="h-4 w-4 shrink-0" />}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

//h//
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:ring-offset-2 focus:ring-offset-background",
        checked ? "bg-secondary" : "bg-muted",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <motion.span
        animate={{ x: checked ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute left-0 h-4 w-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
};

//i//
import {
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

export const Table = ({ children, className = "", ...props }: TableProps) => (
  <div className="w-full overflow-x-auto">
    <table
      className={cn("w-full border-collapse text-left text-sm", className)}
      {...props}
    >
      {children}
    </table>
  </div>
);

export const TableHeader = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("border-b border-border", className)} {...props}>
    {children}
  </thead>
);

export const TableBody = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("divide-y divide-border", className)} {...props}>
    {children}
  </tbody>
);

export const TableRow = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn("transition-colors hover:bg-muted/50", className)}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead = ({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    scope="col"
    className={cn(
      "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-body",
      className,
    )}
    {...props}
  >
    {children}
  </th>
);

export const TableCell = ({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("px-4 py-3 align-middle text-foreground", className)}
    {...props}
  >
    {children}
  </td>
);

//j//
//k//
//l//
//m//
//n//

*End of SOP. This document should be pasted as the system/context prompt for any AI session working on Blackcrest Advisory.*
