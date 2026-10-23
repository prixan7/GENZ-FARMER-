import type { ReactNode } from "react";

// Shared head metadata builder for every content route.
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
export const cardCls = "rounded-2xl border border-border bg-card";
export const inputCls =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
export const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        {intro && <p className="mt-3 text-base text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </main>
  );
}

export function DemoNote({ what }: { what?: string }) {
  return (
    <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-1.5 text-xs text-muted-foreground">
      Demonstration data{what ? ` — ${what}` : ""}. Not live or verified information.
    </p>
  );
}
