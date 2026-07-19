import { MessageSquare } from "lucide-react";
import React from "react";

const Message = () => {
  return (
    <button
      className="hidden sm:inline-flex p-2 rounded-full hover:bg-muted/50 transition-colors"
      aria-label="Messages"
    >
      <MessageSquare size={20} style={{ color: "var(--color-body)" }} />
    </button>
  );
};

export default Message;
