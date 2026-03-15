import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://firepath.app"),
  title: {
    default: "FirePath | FIRE Planning MVP",
    template: "%s | FirePath",
  },
  description:
    "FirePath is a deterministic FIRE planning app to model retirement milestones, compare scenario tradeoffs, and share client-ready reports.",
  applicationName: "FirePath",
  keywords: ["FIRE", "retirement planning", "financial independence", "scenario comparison", "Next.js"],
  openGraph: {
    title: "FirePath | FIRE Planning MVP",
    description:
      "Plan your path to financial independence with deterministic projections, scenario comparison, and printable reports.",
    type: "website",
    siteName: "FirePath",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirePath | FIRE Planning MVP",
    description: "Deterministic FIRE projections, scenario comparisons, and launch-ready report export flow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <div className="flex min-h-screen flex-col">
          <div className="print:hidden">
            <SiteHeader />
          </div>
          <main className="container flex-1 py-10 print:max-w-none print:px-0 print:py-0">{children}</main>
          <div className="print:hidden">
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
