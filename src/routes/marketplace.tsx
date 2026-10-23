import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls, inputCls, labelCls } from "@/components/shared";
import { categories, products, type Product } from "@/data/demo";

export const Route = createFileRoute("/marketplace")({
  head: () =>
    pageHead("Marketplace — GENZ Farmer", "Buy seeds, fertilizers and tools; sell your crops. Demonstration prices."),
  component: Marketplace,
});

function Marketplace() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [list, setList] = useState<Product[]>(products);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [listed, setListed] = useState("");
  const [form, setForm] = useState({ name: "", category: "crops", price: "", unit: "kg" });

  const filtered = list.filter(
    (p) => (cat === "all" || p.category === cat) && p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce(
    (sum, [id, qty]) => sum + (list.find((p) => p.id === id)?.price ?? 0) * qty,
    0,
  );

  const sell = () => {
    if (!form.name.trim() || !form.price) return;
    const item: Product = {
      id: "sell-" + Date.now(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price) || 0,
      unit: form.unit.trim() || "kg",
      note: "Listed by you (demo)",
    };
    setList((l) => [item, ...l]);
    setForm({ name: "", category: "crops", price: "", unit: "kg" });
    setListed(item.name);
  };

  return (
    <PageShell title="Marketplace" intro="Buy inputs, sell produce. Prices and listings are demonstration data.">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className={inputCls + " max-w-xs"}
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
        {cartCount > 0 && (
          <div className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Demo cart: {cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal.toLocaleString("en-IN")}
            <button onClick={() => setCart({})} className="ml-3 underline">
              clear
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {["all", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors " +
              (cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary")
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div key={p.id} className={cardCls + " flex flex-col p-5"}>
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{p.category}</div>
            <div className="mt-1 font-display text-lg font-semibold text-foreground">{p.name}</div>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.note}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <div className="font-semibold text-foreground">
                ₹{p.price.toLocaleString("en-IN")}
                <span className="text-sm font-normal text-muted-foreground">/{p.unit}</span>
              </div>
              <button
                onClick={() => setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }))}
                className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No products match your search.</p>}
      </div>

      <section className="mt-12 rounded-2xl border border-border bg-secondary/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-foreground">Sell your crop</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          List produce for others to browse — a demo listing, nothing is transmitted anywhere.
        </p>
        {listed && <p className="mt-3 text-sm font-medium text-primary">“{listed}” is now listed (demo only).</p>}
        <div className="mt-4 grid gap-4 sm:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Crop name</span>
            <input
              className={inputCls}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Country tomatoes"
            />
          </label>
          <label className="block">
            <span className={labelCls}>Category</span>
            <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Price (₹)</span>
            <input
              className={inputCls}
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Unit</span>
            <input className={inputCls} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </label>
        </div>
        <button onClick={sell} className={btn + " mt-4"}>
          List my crop
        </button>
      </section>

      <DemoNote what="prices and listings" />
    </PageShell>
  );
}
