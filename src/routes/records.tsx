import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls, inputCls, labelCls } from "@/components/shared";
import { lifecycleStages } from "@/data/demo";

export const Route = createFileRoute("/records")({
  head: () =>
    pageHead("Farm records — GENZ Farmer", "Keep a crop lifecycle tracker and field log. Stored in your browser only."),
  component: Records,
});

type Rec = { date: string; field: string; note: string };

function Records() {
  const [records, setRecords] = useState<Rec[]>([
    { date: "2026-10-20", field: "North paddy", note: "Urea top dress 25 kg/acre" },
    { date: "2026-10-12", field: "Maize plot", note: "Irrigated; growth normal" },
  ]);
  const [form, setForm] = useState({ date: "", field: "", note: "" });

  const add = () => {
    if (!form.date || !form.note.trim()) return;
    setRecords((r) => [{ date: form.date, field: form.field.trim() || "General", note: form.note.trim() }, ...r]);
    setForm({ date: "", field: "", note: "" });
  };

  return (
    <PageShell
      title="Farm records"
      intro="Track where each crop is in its lifecycle and keep a field log. Entries stay in your browser."
    >
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Crop lifecycle</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {lifecycleStages.map((s, i) => (
            <div key={s.stage} className="flex items-center gap-3">
              <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm">
                <span className="mr-2 font-display font-semibold text-primary">{i + 1}</span>
                <span className="font-medium text-foreground">{s.stage}</span>
                <span className="ml-2 text-xs text-muted-foreground">{s.days}</span>
              </div>
              {i < lifecycleStages.length - 1 && <span aria-hidden="true" className="text-muted-foreground">→</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Field log</h2>
        <div className="mt-4 grid gap-4 rounded-2xl border border-border bg-secondary/50 p-6 sm:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Date</span>
            <input className={inputCls} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </label>
          <label className="block">
            <span className={labelCls}>Field</span>
            <input className={inputCls} value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} placeholder="e.g. North paddy" />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelCls}>What happened</span>
            <input className={inputCls} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="e.g. Sprayed neem oil on chilli rows" />
          </label>
          <div className="sm:col-span-4">
            <button onClick={add} className={btn}>
              Add record
            </button>
          </div>
        </div>

        <ul className="mt-6 space-y-2">
          {records.map((r, i) => (
            <li key={r.date + i} className={cardCls + " flex flex-wrap items-baseline gap-x-4 px-4 py-3 text-sm"}>
              <span className="font-medium text-foreground">{r.date}</span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{r.field}</span>
              <span className="text-muted-foreground">{r.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <DemoNote what="sample log entries" />
    </PageShell>
  );
}
