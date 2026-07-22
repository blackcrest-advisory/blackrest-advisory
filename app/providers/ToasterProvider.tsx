"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-card-bg)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        success: {
          iconTheme: {
            primary: "var(--color-secondary)",
            secondary: "var(--color-accent-hover)",
          },
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#b91c1c" },
        },
        loading: {
          iconTheme: {
            primary: "var(--color-secondary)",
            secondary: "var(--color-accent-hover)",
          },
        },
      }}
    />
  );
}
