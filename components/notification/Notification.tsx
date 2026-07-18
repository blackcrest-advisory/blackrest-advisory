import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <button
      className="relative p-2 rounded-full hover:bg-muted/50 transition-colors"
      aria-label="Notifications"
    >
      <Bell size={20} style={{ color: "var(--color-body)" }} />

      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
    </button>
  );
};

export default Notification;
