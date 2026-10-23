import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls, inputCls, labelCls } from "@/components/shared";

export const Route = createFileRoute("/calculator")({
  head: () =>
    pageHead("Profit calculator — GENZ Farmer", "Estimate crop revenue, expenses and profit per acre. Demonstration estimates."),
  component: Calculator,
});

const defaults = {
  acres: "2",
  yieldQt: "22",
  pricePerQt: "2100",
  seed: "3000",
  fertilizer: "4500",
  labour: "6000",
  irrigation: "1500",
  other: "1000",
};

function Calculator() {
  const [v, setV] = useState(defaults);
  const n = (s: string) => Number(s) || 0;

  const perAcreCost = n(v.seed) + n(v.fertilizer) + n(v.labour) + n(v.irrigation) + n(v.other);
  const revenue = n(v.acres) * n(v.yieldQt) * n(v.pricePerQt);
  const cost = n(v.acres) * perAcreCost;
  const profit = revenue - cost;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : "0.0";
  const inr = (x: number) => "₹" + Math.round(x).toLocaleString("en-IN");

  const fields: [keyof typeof defaults, string][] = [
    ["acres", "Acres"],
    ["yieldQt", "Expected yield (quintal / acre)"],
    ["pricePerQt", "Sale price (₹ / quintal)"],
    ["seed", "Seed cost (₹ / acre)"],
    ["fertilizer", "Fertilizer cost (₹ / acre)"],
    ["labour", "Labour cost (₹ / acre)"],
    ["irrigation", "Irrigation cost (₹ / acre)"],
    ["other", "Other costs (₹ / acre)"],
  ];

  return (
    <PageShell
      title="Profit calculator"
      intro="Enter your own figures to estimate revenue, total cost and profit for one crop cycle."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map(([key, label]) => (
            <label key={key} className="block">
              <span className={labelCls}>{label}</span>
              <input
                className={inputCls}
                type="number"
                min="0"
                value={v[key]}
                onChange={(e) => setV((s) => ({ ...s, [key]: e.target.value }))}
              />
            </label>
          ))}
          <div className="sm:col-span-2">
            <button onClick={() => setV(defaults)} className="rounded-full border border-input bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Reset to sample values
            </button>
          </div>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          <div className={cardCls + " p-5"}>
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="mt-1 font-display text-3xl font-semibold text-foreground">{inr(revenue)}</div>
          </div>
          <div className={cardCls + " p-5"}>
            <div className="text-sm text-muted-foreground">Total cost</div>
            <div className="mt-1 font-display text-3xl font-semibold text-foreground">{inr(cost)}</div>
            <div className="mt-1 text-xs text-muted-foreground">{inr(perAcreCost)} per acre</div>
          </div>
          <div className={"p-5 rounded-2xl " + (profit >= 0 ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground")}>
            <div className="text-sm opacity-80">{profit >= 0 ? "Estimated profit" : "Estimated loss"}</div>
            <div className="mt-1 font-display text-3xl font-semibold">{inr(Math.abs(profit))}</div>
          </div>
          <div className={cardCls + " p-5"}>
            <div className="text-sm text-muted-foreground">Profit margin</div>
            <div className="mt-1 font-display text-3xl font-semibold text-foreground">{margin}%</div>
          </div>
        </div>
      </div>

      <DemoNote what="estimates — real prices vary by mandi and season" />
    </PageShell>
  );
}
