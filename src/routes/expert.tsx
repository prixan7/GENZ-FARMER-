import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls, inputCls, labelCls } from "@/components/shared";

export const Route = createFileRoute("/expert")({
  head: () =>
    pageHead("Ask an expert — GENZ Farmer", "Request consultation from an agriculture expert. Demo request form."),
  component: Expert,
});

const topics = ["Crop health", "Loans & credit", "Government schemes", "Equipment rental", "Marketing & prices", "Other"];

function Expert() {
  const [form, setForm] = useState({ name: "", phone: "", topic: topics[0], message: "" });
  const [sent, setSent] = useState<typeof form | null>(null);

  const submit = () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setSent({ ...form });
  };

  return (
    <PageShell
      title="Ask an expert"
      intro="Send a consultation request — in this demo the request stays on your screen and is not delivered."
    >
      {sent ? (
        <div className={cardCls + " p-6 sm:p-8"}>
          <div className="font-display text-2xl font-semibold text-foreground">Request noted ✓</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Thanks, {sent.name}. A real service would route your “{sent.topic}” question to an agriculture officer;
            this demo only shows it back to you.
          </p>
          <blockquote className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm text-foreground">{sent.message}</blockquote>
          <button onClick={() => setSent(null)} className={btn + " mt-5"}>
            Send another request
          </button>
        </div>
      ) : (
        <div className="grid max-w-2xl gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Your name</span>
              <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ravi Kumar" />
            </label>
            <label className="block">
              <span className={labelCls}>Phone (demo)</span>
              <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 …" />
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Topic</span>
            <select className={inputCls} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Describe your question</span>
            <textarea
              className={inputCls + " min-h-32"}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="e.g. My tomato leaves show brown rings — is this early blight?"
            />
          </label>
          <div>
            <button onClick={submit} className={btn} disabled={!form.name.trim() || !form.message.trim()}>
              Send request
            </button>
          </div>
        </div>
      )}

      <DemoNote what="consultation requests" />
    </PageShell>
  );
}
