//===== imports =====//
import { BellRing, Fingerprint, ShieldCheck, UserRoundCog } from "lucide-react";

//==============================================================//
// ADMIN SETTINGS HEADER
//==============================================================//

export const AdminSettingsHeader = () => {
  return (
    <header
      className="
          relative
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
    >
      {/* left architectural rail */}
      <div
        aria-hidden="true"
        className="
            absolute
            bottom-0 left-0 top-0
            w-[3px]
            bg-gradient-to-b
            from-secondary
            via-secondary/45
            to-transparent
          "
      />

      {/* subtle security pattern */}
      <div
        aria-hidden="true"
        className="
            pointer-events-none
            absolute
            right-0 top-0
            h-full w-[42%]
            opacity-[0.24]
            [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)]
            [background-size:54px_100%]
            [mask-image:linear-gradient(to_left,black,transparent)]
          "
      />

      <div
        className="
            relative z-10
            grid
            gap-7
            px-6 py-7
            sm:px-7
            lg:px-9
            lg:py-8
            xl:grid-cols-[minmax(0,1fr)_360px]
            xl:items-stretch
          "
      >
        {/* ================================================== */}
        {/* TITLE                                              */}
        {/* ================================================== */}

        <div className="min-w-0">
          <div
            className="
                flex
                flex-wrap
                items-center
                gap-3
              "
          >
            <UserRoundCog className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-secondary
                "
            >
              Administrator account
            </span>

            <span className="h-px w-9 bg-secondary/30" />

            <span
              className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-muted-foreground/40
                "
            >
              Account control
            </span>
          </div>

          <h1
            className="
                mt-5
                text-3xl
                font-semibold
                tracking-[-0.05em]
                text-heading
                sm:text-[38px]
                lg:text-[42px]
              "
          >
            Admin Settings
          </h1>

          <p
            className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-body
              "
          >
            Manage your administrator profile, sign-in security, and operational
            alerts.
          </p>

          <div
            className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-x-5
                gap-y-2
              "
          >
            <HeaderSignal icon={UserRoundCog} label="Profile" />

            <HeaderSignal icon={Fingerprint} label="Security" />

            <HeaderSignal icon={BellRing} label="Notifications" />
          </div>
        </div>

        {/* ================================================== */}
        {/* SECURE ACCOUNT PANEL                               */}
        {/* ================================================== */}

        <div
          className="
              relative
              border border-secondary/15
              bg-secondary/[0.035]
              px-5 py-5
            "
        >
          <div
            className="
                flex
                items-start
                gap-3
              "
          >
            <div
              className="
                  flex h-10 w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border border-secondary/20
                  bg-secondary/[0.06]
                  text-secondary
                "
            >
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <span
                className="
                    font-mono
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-secondary
                  "
              >
                Secure administrator account
              </span>

              <p
                className="
                    mt-1.5
                    text-sm
                    font-semibold
                    text-heading
                  "
              >
                Account controls protected
              </p>

              <p
                className="
                    mt-1
                    text-xs
                    leading-5
                    text-muted-foreground
                  "
              >
                Maintain accurate profile details and strong sign-in credentials
                for administrator access.
              </p>
            </div>
          </div>

          <div
            className="
                mt-5
                grid
                grid-cols-3
                divide-x divide-border
                border-t border-border
                pt-4
              "
          >
            <SecurityMeta label="Profile" value="Managed" />

            <SecurityMeta label="Access" value="Protected" />

            <SecurityMeta label="Alerts" value="Configurable" />
          </div>
        </div>
      </div>
    </header>
  );
};

//==============================================================//
// HEADER SIGNAL
//==============================================================//

function HeaderSignal({
  icon: Icon,
  label,
}: {
  icon: typeof UserRoundCog;
  label: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <Icon className="h-3.5 w-3.5 text-secondary" />

      <span
        className="
          font-mono
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.13em]
          text-muted-foreground/45
        "
      >
        {label}
      </span>
    </div>
  );
}

//==============================================================//
// SECURITY META
//==============================================================//

function SecurityMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <span
        className="
          font-mono
          text-[7px]
          uppercase
          tracking-[0.12em]
          text-muted-foreground/35
        "
      >
        {label}
      </span>

      <p
        className="
          mt-1
          text-[11px]
          font-semibold
          text-heading
        "
      >
        {value}
      </p>
    </div>
  );
}
