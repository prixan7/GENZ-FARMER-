import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, cardCls } from "@/components/shared";
import { jobs } from "@/data/demo";

export const Route = createFileRoute("/jobs")({
  head: () => pageHead("Farm jobs — GENZ Farmer", "Find farm workers or seasonal work. Demonstration listings."),
  component: Jobs,
});

function Jobs() {
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  return (
    <PageShell
      title="Farm jobs"
      intro="Seasonal crews, technicians and full-time roles — demo listings with demo applications."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {jobs.map((j) => (
          <div key={j.id} className={cardCls + " flex flex-col p-5"}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-display text-lg font-semibold text-foreground">{j.title}</div>
                <div className="text-sm text-muted-foreground">
                  {j.farm} · {j.location}
                </div>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {j.type}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-foreground">{j.wage}</span>
              <button
                onClick={() => setApplied((a) => ({ ...a, [j.id]: true }))}
                disabled={applied[j.id]}
                className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                {applied[j.id] ? "Applied ✓ (demo)" : "Apply"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <DemoNote what="listings and wages" />
    </PageShell>
  );
}
