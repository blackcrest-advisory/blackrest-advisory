import IndustrySelector from "@/components/features/auth/IndustrySelector";

export default function page() {
  return (
    <main
      className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: "var(--color-heading)" }}
          >
            Choose Your <br className="sm:hidden" />
            <span style={{ color: "var(--color-gold)" }}>Industry</span>
          </h1>
          <p
            className="text-base mt-4 max-w-2xl mx-auto"
            style={{ color: "var(--color-body)" }}
          >
            Select the sector that best describes your business. We&apos;ll
            tailor your entire Blackcrest experience to fit your unique needs.
          </p>
        </div>
      </div>

      <IndustrySelector />
    </main>
  );
}
