import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { moduleLinks } from "@/data/demo";
import { useLang, languages, useT } from "@/i18n";

const secondaryPaths = ["/dashboard", "/marketplace", "/planner"];

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary" fill="currentColor" aria-hidden="true">
      <path d="M12 2C7 4 3 9 3 14a9 9 0 0 0 18 0c0-5-4-10-9-12Zm0 4c2.5 2 5 5.5 5 8a5 5 0 0 1-10 0c0-2.5 2.5-6 5-8Z" />
    </svg>
  );
}

export function Header() {
  const t = useT();
  const { lang, setLang } = useLang();
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const primary = [
    { label: t("nav.home"), path: "/" as const },
    ...moduleLinks.filter((m) => (secondaryPaths as readonly string[]).includes(m.path)),
  ];
  const more = moduleLinks.filter((m) => !(secondaryPaths as readonly string[]).includes(m.path));

  const linkCls = "block rounded-full px-3 py-1.5 text-sm text-foreground hover:bg-secondary";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
          <Leaf />
          GENZ Farmer
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primary.map((l) => (
            <Link key={l.path} to={l.path} className={linkCls}>
              {l.label}
            </Link>
          ))}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className={linkCls + " flex items-center gap-1"}
              aria-expanded={moreOpen}
            >
              {t("nav.more")}
              <span aria-hidden="true">▾</span>
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg">
                {more.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-secondary"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
            className="rounded-full border border-input bg-background px-3 py-1.5 text-sm text-foreground"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name}
              </option>
            ))}
          </select>
          <Link
            to="/dashboard"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            {t("cta.started")}
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-foreground hover:bg-secondary lg:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-border px-4 py-3 lg:hidden" aria-label="Mobile">
          {moduleLinks.map((l) => (
            <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Leaf />
            GENZ Farmer
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            The complete farming toolkit — plan, protect, hire, borrow, learn and sell. Built as a demonstration
            platform with sample data.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-x-6 gap-y-1" aria-label="Footer">
          {moduleLinks.map((l) => (
            <Link key={l.path} to={l.path} className="py-1 text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          All prices, weather, diagnoses, scheme details and listings on this platform are simulated demonstration
          data — not live, verified or transacted information.
        </p>
      </div>
    </footer>
  );
}
