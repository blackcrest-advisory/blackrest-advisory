"use client";

//==============================================================//
// SERVICES HEADER
//==============================================================//

export const ServicesHeader = () => {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-[-0.05em] text-heading sm:text-[38px] lg:text-[42px]">
        Services
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-body">
        Manage the four Blackcrest service offerings displayed across the public
        website.
      </p>

      <div className="mt-5 flex items-center gap-3">
        <span className="h-px w-10 bg-secondary/50" />

        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
          Public service architecture
        </span>
      </div>
    </div>
  );
};
