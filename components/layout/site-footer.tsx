export function SiteFooter() {
  return (
    <footer className="border-t bg-white/60">
      <div className="container py-6 text-sm text-muted-foreground">
        © {new Date().getFullYear()} FirePath · Deterministic FIRE planning for demos and client-ready conversations.
      </div>
    </footer>
  );
}
