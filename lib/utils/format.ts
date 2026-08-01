//===== Convert a raw byte count into a human-readable size string =====//
//===== e.g. 876544 -> "856 KB", 152043520 -> "145 MB" =====//
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / Math.pow(1024, exponent);

  //===== Show one decimal place, but drop it for whole "B" values =====//
  const formattedValue = exponent === 0 ? value.toFixed(0) : value.toFixed(1);

  return `${formattedValue} ${units[exponent]}`;
};

//===== Convert an ISO date string into a short, table-friendly label =====//
//===== "Today, 2:30 PM" / "Yesterday, 4:15 PM" / "Jul 14, 2026" =====//
export const formatFileDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  const timeLabel = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isSameDay) return `Today, ${timeLabel}`;
  if (isYesterday) return `Yesterday, ${timeLabel}`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

//===== Format a byte count as "X GB of Y GB used" for storage progress UI =====//
export const formatStorageSummary = (
  usedBytes: number,
  limitBytes: number,
): string => {
  return `${formatFileSize(usedBytes)} of ${formatFileSize(limitBytes)} used`;
};
