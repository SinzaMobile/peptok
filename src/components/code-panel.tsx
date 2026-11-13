import { useState } from "react";

const SAMPLES = {
  cURL: `curl https://sandbox.api.pamha.example/v1/events \\
  -H "Authorization: Bearer $PAMHA_SANDBOX_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject_id": "sub_7f3a9c21b8",
    "type": "checkin.completed",
    "occurred_at": "2026-10-28T08:30:00Z"
  }'`,
  TypeScript: `const res = await fetch("https://sandbox.api.pamha.example/v1/events", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.PAMHA_SANDBOX_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    subject_id: "sub_7f3a9c21b8",
    type: "checkin.completed",
    occurred_at: new Date().toISOString(),
  }),
});`,
  Python: `import requests, os, datetime

res = requests.post(
    "https://sandbox.api.pamha.example/v1/events",
    headers={
        "Authorization": f"Bearer {os.getenv('PAMHA_SANDBOX_KEY')}",
        "Content-Type": "application/json",
    },
    json={
        "subject_id": "sub_7f3a9c21b8",
        "type": "checkin.completed",
        "occurred_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    },
)`,
} as const;

const RESPONSE = `{
  "wellbeing_score": 0.62,
  "confidence": 0.81,
  "reasons": ["sleep_regularity_improved"],
  "recommendation_ids": ["rec_breathing_01"],
  "safety_flags": []
}`;

export function CodePanel() {
  const [tab, setTab] = useState<keyof typeof SAMPLES>("cURL");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLES[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-label="Example request and response"
      className="overflow-hidden rounded-3xl bg-panel text-panel-ink shadow-2xl border border-white/5"
    >
      <div
        role="tablist"
        className="flex items-center justify-between border-b border-white/10 px-4 pt-3"
      >
        <div className="flex gap-1">
          {(Object.keys(SAMPLES) as (keyof typeof SAMPLES)[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-t-lg px-3.5 py-2 text-xs font-mono transition-colors ${
                tab === k
                  ? "bg-white/10 text-white font-medium shadow-sm"
                  : "text-panel-ink/60 hover:text-panel-ink"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pb-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-xs text-panel-ink/70 hover:text-white transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-6 text-emerald-200/90">
        <code>{SAMPLES[tab]}</code>
      </pre>

      <div className="border-t border-white/10 p-6 bg-black/40">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-panel-ink/60">
            Sample response. Synthetic data, structured output only. Real-time inference.
          </p>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            HTTP 202 Accepted &bull; 24ms
          </span>
        </div>
        <pre className="overflow-x-auto font-mono text-[13px] leading-6 text-sky-200/90">
          <code>{RESPONSE}</code>
        </pre>
      </div>
    </section>
  );
}
export default CodePanel;
