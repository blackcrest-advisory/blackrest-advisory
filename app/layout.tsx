import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./styles/global.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ToasterProvider } from "@/app/providers/ToasterProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Blackcrest Advisory | B2B Digital Solutions",
  description:
    "Empowering European businesses with technology, marketing & growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${roboto.className} font-sans antialiased overflow-x-hidden`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
