import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote } from "@/components/shared";
import { rentalTypes, rentals } from "@/data/demo";

export const Route = createFileRoute("/rentals")({
  head: () =>
    pageHead("Rentals & transport — GENZ Farmer", "Equipment, harvesting, transport and storage on demo request."),
  component: Rentals,
});

function Rentals() {
  const [type, setType] = useState("all");
  const [requested, setRequested] = useState<Record<string, boolean>>({});
  const list = rentals.filter((r) => type === "all" || r.type === type);

  return (
    <PageShell
      title="Rentals & transport"
      intro="Tractors, harvesters, transport and storage — request a booking in the demo (nothing is dispatched)."
    >
      <div className="flex flex-wrap gap-2">
        {["all", ...rentalTypes].map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={
              "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors " +
              (type === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {list.map((r) => (
          <div
            key={r.id}
            className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="font-medium text-foreground">{r.name}</div>
              <div className="text-sm text-muted-foreground">
                ₹{r.rate.toLocaleString("en-IN")} / {r.unit} · {r.type}
              </div>
            </div>
            {!r.available && <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Unavailable</span>}
            <button
              disabled={!r.available || requested[r.id]}
              onClick={() => setRequested((s) => ({ ...s, [r.id]: true }))}
              className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
            >
              {requested[r.id] ? "Requested ✓ (demo)" : "Request booking"}
            </button>
          </div>
        ))}
      </div>

      <DemoNote what="rates and availability" />
    </PageShell>
  );
}
