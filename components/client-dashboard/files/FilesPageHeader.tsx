//===== imports =====//
import { Cloud, FileStack, LockKeyhole, Upload } from "lucide-react";

import { Button } from "@/components/ui/Button";

//===== props =====//
interface FilesPageHeaderProps {
  onUploadClick: () => void;
}

//==============================================================//
// FILES PAGE HEADER
//==============================================================//

export const FilesPageHeader = ({ onUploadClick }: FilesPageHeaderProps) => {
  return (
    <header
      className="
        relative
        min-w-0
        overflow-hidden
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* ====================================================== */}
      {/* AMBIENT DETAIL                                        */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24 -top-24
          h-72 w-72
          rounded-full
          bg-secondary/[0.055]
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0 left-0 top-0
          w-[3px]
          bg-gradient-to-b
          from-secondary/70
          via-secondary/25
          to-transparent
        "
      />

      {/* ====================================================== */}
      {/* CONTENT                                               */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10
          grid
          gap-7
          px-6 py-7
          sm:px-7
          lg:px-9
          lg:py-8
          xl:grid-cols-[minmax(0,1fr)_310px]
          xl:items-center
        "
      >
        {/* ==================================================== */}
        {/* TITLE                                               */}
        {/* ==================================================== */}

        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <FileStack className="h-3.5 w-3.5 text-secondary" />

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
              Client documents
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
              Private workspace
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
            Files
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
            Review and manage documents shared across your Blackcrest projects
            from one secure workspace.
          </p>

          {/* ================================================== */}
          {/* TRUST SIGNALS                                      */}
          {/* ================================================== */}

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
            <HeaderSignal icon={LockKeyhole} label="Private access" />

            <HeaderSignal icon={Cloud} label="Central library" />
          </div>
        </div>

        {/* ==================================================== */}
        {/* UPLOAD PANEL                                        */}
        {/* ==================================================== */}

        <div
          className="
            border-t border-border
            pt-5
            xl:border-l
            xl:border-t-0
            xl:pl-7
            xl:pt-0
          "
        >
          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-muted-foreground/40
            "
          >
            Document exchange
          </span>

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Add a document to your Blackcrest workspace when upload access is
            available.
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={onUploadClick}
            className="
              mt-5
              w-full
              !rounded-md
              justify-between
            "
          >
            <span>Upload File</span>

            <Upload className="h-4 w-4" />
          </Button>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              border-t border-border
              pt-4
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-success
              "
            />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.13em]
                text-muted-foreground/40
              "
            >
              Secure client workspace
            </span>
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
  icon: typeof LockKeyhole;
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
