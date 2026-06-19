import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Overwatch Statistics",
  description:
    "Overwatch Statistics - a more detailed way to track overwatch stats",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body
          className={cn(
            "h-full text-neutral-800 bg-extra_background",
            inter.className,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
