import { createFileRoute } from "@tanstack/react-router";
import { PageShell, pageHead, DemoNote, cardCls } from "@/components/shared";
import { waterTips, weather } from "@/data/demo";

export const Route = createFileRoute("/weather")({
  head: () =>
    pageHead("Weather & water — GENZ Farmer", "7-day outlook and water-saving guidance. Demonstration data."),
  component: Weather,
});

function Weather() {
  return (
    <PageShell
      title="Weather & water"
      intro="A sample 7-day outlook plus practical water management guidance for your fields."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {weather.map((w) => (
          <div key={w.day} className={cardCls + " p-5"}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-foreground">{w.day}</span>
              <span className="text-sm text-muted-foreground">{w.condition}</span>
            </div>
            <div className="mt-3 font-display text-4xl font-semibold text-foreground">{w.tempC}°C</div>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <div>Rain: {w.rainMm} mm</div>
              <div>Humidity: {w.humidity}%</div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Water management</h2>
        <ul className="mt-4 space-y-2">
          {waterTips.map((tip) => (
            <li key={tip} className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <DemoNote what="the forecast and all figures" />
    </PageShell>
  );
}
