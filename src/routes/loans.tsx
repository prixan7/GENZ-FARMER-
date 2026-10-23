import { createFileRoute } from "@tanstack/react-router";
import { PageShell, pageHead, DemoNote, cardCls } from "@/components/shared";
import { insurancePlans, loanBasics, repayments } from "@/data/demo";

export const Route = createFileRoute("/loans")({
  head: () =>
    pageHead("Loans & insurance — GENZ Farmer", "Loan basics, a demo repayment history and crop insurance options."),
  component: Loans,
});

function Loans() {
  const statusCls = (s: string) =>
    s === "Paid" ? "text-primary" : s === "Partial" ? "text-foreground" : "text-destructive";
  const inr = (x: number) => "₹" + x.toLocaleString("en-IN");
  const totalDue = repayments.reduce((a, r) => a + r.due, 0);
  const totalPaid = repayments.reduce((a, r) => a + r.paid, 0);

  return (
    <PageShell
      title="Loans & insurance"
      intro="Learn how farm credit works, review a demo repayment history, and compare crop insurance options."
    >
      <section>
        <h2 className="font-display text-2xl font-semibold text-foreground">Loan education</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {loanBasics.map((l) => (
            <div key={l.title} className={cardCls + " p-5"}>
              <div className="font-display text-lg font-semibold text-foreground">{l.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{l.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Repayment history (demo)</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Last 6 instalments — {inr(totalPaid)} paid of {inr(totalDue)} due.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4">Month</th>
                <th className="py-3 pr-4">Due</th>
                <th className="py-3 pr-4">Paid</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((r) => (
                <tr key={r.month + r.year} className="border-b border-border">
                  <td className="py-3 pr-4 font-medium text-foreground">
                    {r.month} {r.year}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{inr(r.due)}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{inr(r.paid)}</td>
                  <td className={"py-3 font-semibold " + statusCls(r.status)}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-foreground">Crop insurance options</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {insurancePlans.map((p) => (
            <div key={p.name} className={cardCls + " p-5"}>
              <div className="font-display text-lg font-semibold text-foreground">{p.name}</div>
              <div className="mt-2 text-sm">
                <span className="font-medium text-foreground">Cover:</span>{" "}
                <span className="text-muted-foreground">{p.cover}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-foreground">Premium:</span>{" "}
                <span className="text-muted-foreground">{p.premium}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      <DemoNote what="scheme terms, history and premiums" />
    </PageShell>
  );
}
