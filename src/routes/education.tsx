import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls, inputCls } from "@/components/shared";
import { learning, threads } from "@/data/demo";

export const Route = createFileRoute("/education")({
  head: () =>
    pageHead("Learn & community — GENZ Farmer", "Farming lessons and a demo community forum for farmer questions."),
  component: Education,
});

function Education() {
  const [posts, setPosts] = useState(threads);
  const [form, setForm] = useState({ author: "", topic: "" });
  const [posted, setPosted] = useState("");

  const post = () => {
    if (!form.author.trim() || !form.topic.trim()) return;
    const p = { id: "p" + Date.now(), author: form.author.trim(), topic: form.topic.trim(), replies: 0 };
    setPosts((s) => [p, ...s]);
    setForm({ author: "", topic: "" });
    setPosted(p.topic);
  };

  return (
    <PageShell
      title="Learn & community"
      intro="Short lessons by topic, and a community board for asking and answering (demo posts)."
    >
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Learning resources</h2>
        <ul className="mt-4 space-y-2">
          {learning.map((l) => (
            <li key={l.title} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{l.topic}</span>
              <span className="font-medium text-foreground">{l.title}</span>
              <span className="ml-auto text-sm text-muted-foreground">
                {l.level} · {l.minutes} min read
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Community board</h2>
        <div className="mt-4 grid gap-3 rounded-2xl border border-border bg-secondary/50 p-6 sm:grid-cols-3">
          <input className={inputCls} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Your name" aria-label="Your name" />
          <input className={inputCls + " sm:col-span-2"} value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} placeholder="Ask a question… e.g. When should I spray for stem borer?" aria-label="Your question" />
          <div className="sm:col-span-3">
            <button onClick={post} className={btn}>
              Post question
            </button>
            {posted && <span className="ml-3 text-sm font-medium text-primary">Posted: “{posted}” (demo)</span>}
          </div>
        </div>
        <ul className="mt-6 space-y-2">
          {posts.map((p) => (
            <li key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              <span className="font-medium text-foreground">{p.author}</span>
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{p.topic}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{p.replies} replies</span>
            </li>
          ))}
        </ul>
      </section>

      <DemoNote what="lesson list and community posts" />
    </PageShell>
  );
}
