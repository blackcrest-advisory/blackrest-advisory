// components/shared/SectionHeading.tsx
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) => {
  const alignment = centered ? "text-center" : "text-left";
  return (
    <div className={`${alignment} ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-body)] max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
