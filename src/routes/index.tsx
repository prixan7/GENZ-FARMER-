import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import cropsImg from "@/assets/crops.jpg";
import harvestImg from "@/assets/harvest.jpg";
import { moduleLinks } from "@/data/demo";
import { pageHead } from "@/components/shared";
import { useT } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "GENZ Farmer — Smart Farming Platform",
      "Plan crops, diagnose plants, rent equipment, find farm jobs and sell produce — the complete farming toolkit. Demonstration data.",
    ),
  component: Index,
});

function Index() {
  const t = useT();
  const linkCards = [
    {
      to: "/marketplace",
      img: harvestImg,
      w: 1200,
      h: 800,
      kicker: "Marketplace",
      title: "Buy inputs, sell harvest",
    },
    {
      to: "/crop-doctor",
      img: cropsImg,
      w: 1024,
      h: 1024,
      kicker: "AI Crop Doctor",
      title: "Snap a leaf, get a lead",
    },
  ];
  const rest = moduleLinks.filter((m) => m.path !== "/marketplace" && m.path !== "/crop-doctor");

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroImg}
            alt="Lush green farm field at sunrise"
            className="h-[540px] w-full object-cover"
            width={1536}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end gap-5 p-8 sm:p-12">
            <h1 className="max-w-xl font-display text-4xl font-semibold text-primary-foreground sm:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-md text-sm text-primary-foreground/90 sm:text-base">{t("hero.sub")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-foreground/90"
              >
                {t("hero.cta")}
              </Link>
              <Link
                to="/planner"
                className="rounded-full border border-primary-foreground/50 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything a farm needs, in one place
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Thirteen working modules — from crop planning to government schemes — running on demonstration data.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {linkCards.map((c, i) => (
            <Link
              key={c.to}
              to={c.to}
              className={"group relative block overflow-hidden rounded-2xl " + (i === 0 ? "md:col-span-3" : "md:col-span-2")}
            >
              <img
                src={c.img}
                alt=""
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={c.w}
                height={c.h}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
                  {c.kicker}
                </div>
                <div className="mt-1 font-display text-2xl font-semibold text-primary-foreground">{c.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <Link
              key={m.path}
              to={m.path}
              className="flex items-center justify-between border-b border-border py-3 text-sm font-medium text-foreground hover:text-primary"
            >
              {m.label}
              <span aria-hidden="true" className="text-muted-foreground">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {[
            { value: "13", label: "modules, all working" },
            { value: "9", label: "languages, English fallback" },
            { value: "40+", label: "demo listings & records" },
            { value: "₹0", label: "to explore — no sign-up" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-semibold text-foreground">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
