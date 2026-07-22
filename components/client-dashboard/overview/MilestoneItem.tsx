import { Milestone } from "@/types/dashboard/client/overviewType";

const colorMap = [
  "text-[var(--color-secondary)]",
  "text-[var(--color-accent)]",
  "text-[var(--color-gold)]",
  "text-[#3B82F6]",
];

export const MilestoneItem = ({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) => {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 text-sm font-medium ${colorMap[index % colorMap.length]}`}
      >
        {milestone.date}
      </span>
      <div className="flex-1">
        <p className="text-sm text-[var(--color-heading)]">{milestone.title}</p>
        <p className="text-xs text-[var(--color-body)]">{milestone.time}</p>
      </div>
    </li>
  );
};
