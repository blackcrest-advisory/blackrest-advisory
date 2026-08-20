//===== imports =====//
import { BellRing, LockKeyhole, UserRound } from "lucide-react";

//==============================================================//
// SETTINGS PAGE HEADER
//==============================================================//

export const SettingsPageHeader = () => {
  return (
    <header
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== AMBIENT BACKDROP =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[42%] opacity-[0.18] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:56px_100%] [mask-image:linear-gradient(to_left,black,transparent)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-secondary/[0.045] blur-[95px]"
      />

      {/*===== MAIN HEADER =====*/}

      <div
        className="relative z-10 px-6 py-7 sm:px-7 lg:px-9 lg:py-9"
      >
        <div
          className="max-w-3xl"
        >
          <div
            className="flex flex-wrap items-center gap-3"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary"
            >
              <UserRound className="h-3.5 w-3.5" />
            </span>

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
            >
              Personal account
            </span>

            <span className="h-px w-10 bg-secondary/30" />

            <span
              className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40"
            >
              Client preferences
            </span>
          </div>

          <h1
            className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[40px] lg:text-[46px]"
          >
            Your account,
            <span className="text-secondary"> your way.</span>
          </h1>

          <p
            className="mt-4 max-w-2xl text-sm leading-7 text-body"
          >
            Keep your profile current, protect your access, and choose how you
            receive updates from Blackcrest.
          </p>
        </div>
      </div>

      {/*===== ACCOUNT AREAS =====*/}

      <div
        className="relative z-10 grid border-t border-border bg-background/20 sm:grid-cols-3"
      >
        <AccountArea
          icon={UserRound}
          label="Profile"
          description="Personal and company details"
        />

        <AccountArea
          icon={LockKeyhole}
          label="Security"
          description="Password and account access"
        />

        <AccountArea
          icon={BellRing}
          label="Notifications"
          description="Communication preferences"
        />
      </div>

      {/*===== STATUS FOOTER =====*/}

      <div
        className="relative z-10 flex flex-col gap-2 border-t border-border bg-muted/10 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-9"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
          >
            Secure client workspace
          </span>
        </div>

        <span
          className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground/35"
        >
          Account preferences
        </span>
      </div>
    </header>
  );
};

//==============================================================//
// ACCOUNT AREA
//==============================================================//

function AccountArea({
  icon: Icon,
  label,
  description,
}: {
  icon: typeof UserRound;
  label: string;
  description: string;
}) {
  return (
    <div
      className="group flex items-start gap-3 border-b border-border px-6 py-4 transition-colors hover:bg-secondary/[0.018] sm:border-b-0 sm:border-r sm:last:border-r-0 lg:px-9"
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-secondary transition-colors group-hover:border-secondary/20 group-hover:bg-secondary/[0.04]"
      >
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">
        <p
          className="text-xs font-semibold text-heading"
        >
          {label}
        </p>

        <p
          className="mt-1 text-[10px] leading-4 text-muted-foreground"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
