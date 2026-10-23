import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, cardCls } from "@/components/shared";
import { dashStats, dashboardTasks, moduleLinks } from "@/data/demo";
import { useT } from "@/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () =>
    pageHead("Farmer dashboard — GENZ Farmer", "Your fields, tasks and profit at a glance. Demonstration data."),
  component: Dashboard,
});

function Dashboard() {
  const t = useT();
  const [done, setDone] = useState<Record<number, boolean>>({});

  return (
    <PageShell
      title={t("nav.dashboard")}
      intro="A snapshot of your farm. All figures here are sample data for demonstration."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashStats.map((s) => (
          <div key={s.label} className={cardCls + " p-5"}>
            <div className="font-display text-3xl font-semibold text-foreground">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="font-display text-2xl font-semibold text-foreground">This week's tasks</h2>
          <ul className="mt-4 space-y-2">
            {dashboardTasks.map((task, i) => (
              <li key={task.title} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                <input
                  type="checkbox"
                  checked={!!done[i]}
                  onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                  className="h-4 w-4"
                  style={{ accentColor: "var(--primary)" }}
                  aria-label={"Mark done: " + task.title}
                />
                <span className={done[i] ? "text-sm text-muted-foreground line-through" : "text-sm"}>
                  {task.title}
                </span>
                <span className="ml-auto text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {task.when}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-foreground">All modules</h2>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {moduleLinks
              .filter((m) => m.path !== "/dashboard")
              .map((m) => (
                <Link
                  key={m.path}
                  to={m.path}
                  className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground hover:border-primary hover:text-primary"
                >
                  {m.label}
                </Link>
              ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
