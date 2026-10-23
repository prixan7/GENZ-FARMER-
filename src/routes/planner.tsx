import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, cardCls, inputCls, labelCls } from "@/components/shared";
import { crops, seasons, soils, type Crop } from "@/data/demo";

export const Route = createFileRoute("/planner")({
  head: () =>
    pageHead("Farm planner — GENZ Farmer", "Match crops to your soil and season, with yield and profit estimates. Demonstration data."),
  component: Planner,
});

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

function Planner() {
  const [season, setSeason] = useState<string>(seasons[0]);
  const [soil, setSoil] = useState<string>(soils[0]);
  const gross = (c: Crop) => c.yieldQtPerAcre * c.pricePerQt;

  const matched = crops.filter((c) => c.season === season && c.soil === soil);
  const list = matched.length > 0 ? matched : crops.filter((c) => c.season === season);
  const best = [...list].sort((a, b) => gross(b) - gross(a))[0];

  return (
    <PageShell
      title="Farm planner"
      intro="Pick your soil and season to see suitable crops with yield, price and gross income per acre."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Season</span>
          <select className={inputCls} value={season} onChange={(e) => setSeason(e.target.value)}>
            {seasons.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Soil type</span>
          <select className={inputCls} value={soil} onChange={(e) => setSoil(e.target.value)}>
            {soils.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      {matched.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No exact match for {soil} soil in {season} — showing other {season} crops instead.
        </p>
      )}

      {best && (
        <div className="mt-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
            Best estimated return
          </div>
          <div className="mt-2 font-display text-3xl font-semibold">{best.name}</div>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/90">
            Around {inr(gross(best))} gross per acre over {best.days} days. {best.tip} Water: {best.water}
          </p>
        </div>
      )}

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="py-3 pr-4">Crop</th>
              <th className="py-3 pr-4">Duration</th>
              <th className="py-3 pr-4">Yield / acre</th>
              <th className="py-3 pr-4">Price / quintal</th>
              <th className="py-3">Gross / acre</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.name} className="border-b border-border">
                <td className="py-3 pr-4 font-medium text-foreground">{c.name}</td>
                <td className="py-3 pr-4 text-muted-foreground">{c.days} days</td>
                <td className="py-3 pr-4 text-muted-foreground">{c.yieldQtPerAcre} qtl</td>
                <td className="py-3 pr-4 text-muted-foreground">{inr(c.pricePerQt)}</td>
                <td className="py-3 font-semibold text-foreground">{inr(gross(c))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {list.slice(0, 4).map((c) => (
          <div key={c.name} className={cardCls + " p-5"}>
            <div className="font-display text-lg font-semibold text-foreground">{c.name}</div>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Water:</span> {c.water}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Tip:</span> {c.tip}
            </p>
          </div>
        ))}
      </div>

      <DemoNote what="crop yields and prices" />
    </PageShell>
  );
}
