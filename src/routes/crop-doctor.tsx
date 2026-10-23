import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, pageHead, DemoNote, btn, cardCls } from "@/components/shared";
import { doctorCases } from "@/data/demo";

export const Route = createFileRoute("/crop-doctor")({
  head: () =>
    pageHead("AI Crop Doctor — GENZ Farmer", "Upload a crop photo and get a simulated diagnosis. Demonstration only."),
  component: CropDoctor,
});

type Case = (typeof doctorCases)[number];

function CropDoctor() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<Case | null>(null);
  const [idx, setIdx] = useState(0);
  const [scanning, setScanning] = useState(false);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    setFileName(f.name);
    setResult(null);
  };

  const analyze = () => {
    setScanning(true);
    window.setTimeout(() => {
      setResult(doctorCases[idx % doctorCases.length]);
      setIdx((i) => i + 1);
      setScanning(false);
    }, 700);
  };

  return (
    <PageShell
      title="AI Crop Doctor"
      intro="Upload a photo of the affected plant. The diagnosis below is simulated for demonstration."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card">
            {preview ? (
              <img src={preview} alt="Uploaded crop photo" className="h-full w-full object-cover" />
            ) : (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Your crop photo will appear here.
                <br />
                No image leaves your device.
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Choose photo
              <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
            </label>
            {fileName && <span className="text-xs text-muted-foreground">{fileName}</span>}
            <button onClick={analyze} disabled={!preview || scanning} className={btn + (scanning ? " opacity-70" : "")}>
              {scanning ? "Analyzing…" : "Diagnose (simulated)"}
            </button>
          </div>
        </div>

        <div>
          {result ? (
            <div className={cardCls + " p-6 sm:p-8"}>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Simulated diagnosis
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-foreground">{result.issue}</div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-medium text-foreground">Crop</dt>
                  <dd className="text-muted-foreground">{result.crop}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 font-medium text-foreground">Confidence</dt>
                  <dd className="text-muted-foreground">~{72 + ((idx * 7) % 25)}% (demo)</dd>
                </div>
              </dl>
              <div className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm">
                <span className="font-medium text-foreground">Suggested remedy: </span>
                <span className="text-muted-foreground">{result.remedy}</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                This is a simulated result for demonstration only — consult your local agriculture officer before
                acting.
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-48 items-center justify-center rounded-2xl border border-border bg-secondary/40 p-8 text-center text-sm text-muted-foreground">
              Upload a photo and run the demo diagnosis to see a sample result here.
            </div>
          )}
        </div>
      </div>

      <DemoNote what="every diagnosis" />
    </PageShell>
  );
}
