import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Plan" },
  { href: "/results", label: "Results" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/report", label: "Report" },
];

export function SiteHeader() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          FirePath
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/plan" className={cn(buttonVariants({ size: "default" }))}>
          Start Plan
        </Link>
      </div>
    </header>
  );
}
