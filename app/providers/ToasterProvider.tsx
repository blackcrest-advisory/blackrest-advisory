"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 4200,

        style: {
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-surface)",
          padding: "14px 16px",
          fontSize: "13px",
          fontWeight: 500,
          lineHeight: 1.5,
          minWidth: "300px",
          maxWidth: "420px",
          boxShadow: "var(--shadow-overlay)",
        },

        success: {
          duration: 3800,
          iconTheme: {
            primary: "var(--color-success)",
            secondary: "var(--color-success-foreground)",
          },
          style: {
            border:
              "1px solid color-mix(in srgb, var(--color-success) 22%, var(--color-border))",
            boxShadow:
              "0 14px 40px color-mix(in srgb, var(--color-success) 10%, transparent)",
          },
        },

        error: {
          duration: 5000,
          iconTheme: {
            primary: "var(--color-destructive)",
            secondary: "var(--color-destructive-foreground)",
          },
          style: {
            border:
              "1px solid color-mix(in srgb, var(--color-destructive) 22%, var(--color-border))",
            boxShadow:
              "0 14px 40px color-mix(in srgb, var(--color-destructive) 10%, transparent)",
          },
        },

        loading: {
          duration: Infinity,
          iconTheme: {
            primary: "var(--color-secondary)",
            secondary: "var(--color-card)",
          },
          style: {
            border:
              "1px solid color-mix(in srgb, var(--color-secondary) 24%, var(--color-border))",
            boxShadow: "var(--shadow-gold-glow)",
          },
        },
      }}
    />
  );
}
