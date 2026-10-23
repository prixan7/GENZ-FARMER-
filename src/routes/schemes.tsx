import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, cardCls, inputCls, labelCls } from "@/components/shared";
import { schemes } from "@/data/demo";

export const Route = createFileRoute("/schemes")({
  head: () =>
    pageHead("Government schemes — GENZ Farmer", "Browse sample government scheme benefits by state. Demonstration data."),
  component: Schemes,
});

function Schemes() {
  const states = ["All India", ...new Set(schemes.map((s) => s.state).filter((s) => s !== "All India"))];
  const [state, setState] = useState("All India");
  const list = schemes.filter((s) => state === "All India" || s.state === state || s.state === "All India");

  return (
    <PageShell
      title="Government schemes"
      intro="Sample navigator for central and state schemes — eligibility and benefits are demonstration examples."
    >
      <label className="block max-w-xs">
        <span className={labelCls}>Your state</span>
        <select className={inputCls} value={state} onChange={(e) => setState(e.target.value)}>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {list.map((s) => (
          <div key={s.name} className={cardCls + " p-5"}>
            <div className="flex items-start justify-between gap-3">
              <div className="font-display text-lg font-semibold text-foreground">{s.name}</div>
              <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {s.state}
              </span>
            </div>
            <p className="mt-2 text-sm">
              <span className="font-medium text-foreground">Benefit: </span>
              <span className="text-muted-foreground">{s.benefit}</span>
            </p>
            <p className="mt-1 text-sm">
              <span className="font-medium text-foreground">Eligibility: </span>
              <span className="text-muted-foreground">{s.eligibility}</span>
            </p>
          </div>
        ))}
      </div>

      <DemoNote what="benefits and eligibility — verify with official sources" />
    </PageShell>
  );
}
