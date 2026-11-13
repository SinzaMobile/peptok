import { useState } from "react";
import { Link } from "@/src/lib/router";

export function QuickstartPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "typescript" | "python">("curl");
  const [copied, setCopied] = useState<boolean>(false);

  const snippets = {
    curl: `curl https://sandbox.api.pamha.example/v1/events \\
  -H "Authorization: Bearer pamha_sb_live_49f82bc190a6e7d8c41" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject_id": "sub_7f3a9c21b8",
    "type": "checkin.completed",
    "occurred_at": "2026-10-28T08:30:00Z",
    "payload": {
      "energy_rating": 4,
      "stress_level": 2,
      "mood_label": "calm"
    }
  }'`,
    typescript: `import { PamhaClient } from "@pamha/sdk";

const client = new PamhaClient({
  apiKey: process.env.PAMHA_SANDBOX_KEY!,
  environment: "sandbox",
});

const response = await client.events.submit({
  subjectId: "sub_7f3a9c21b8",
  type: "checkin.completed",
  occurredAt: new Date().toISOString(),
  payload: {
    energyRating: 4,
    stressLevel: 2,
    moodLabel: "calm",
  },
});

console.log("Inferred Wellbeing Score:", response.wellbeingScore);
console.log("Recommendations:", response.recommendationIds);`,
    python: `from pamha import PamhaClient
import datetime

client = PamhaClient(api_key="pamha_sb_live_49f82bc190a6e7d8c41", environment="sandbox")

event = client.events.submit(
    subject_id="sub_7f3a9c21b8",
    type="checkin.completed",
    occurred_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),
    payload={
        "energy_rating": 4,
        "stress_level": 2,
        "mood_label": "calm",
    }
)

print(f"Wellbeing Score: {event.wellbeing_score}")
print(f"Safety Flags: {event.safety_flags}")`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-page px-6 py-14">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          5-Minute Integration
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Quickstart Guide
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          Get your first event ingested and receive adaptive intelligence recommendations in less than five minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="mt-12 space-y-12 max-w-3xl">
        {/* Step 1 */}
        <div className="flex gap-6">
          <div className="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center font-bold text-sm shrink-0">
            1
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-lg font-semibold tracking-tight">Get Your Sandbox API Key</h2>
            <p className="text-sm text-muted leading-relaxed">
              Every request requires an API key in the Authorization header. We provide a default pre-configured Sandbox Key with instant synthetic data access:
            </p>
            <div className="rounded-2xl border border-line bg-line/20 p-4 font-mono text-xs flex items-center justify-between">
              <span className="text-ink font-semibold">pamha_sb_live_49f82bc190a6e7d8c41</span>
              <Link href="/console" className="text-xs font-semibold text-muted hover:text-ink underline">
                Manage Keys
              </Link>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex gap-6">
          <div className="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center font-bold text-sm shrink-0">
            2
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-lg font-semibold tracking-tight">Generate a Pseudonymous Subject ID</h2>
            <p className="text-sm text-muted leading-relaxed">
              Never send usernames, emails, or phone numbers. Generate a client-side SHA-256 or UUID prefixed with <code className="text-xs font-mono bg-line/80 px-1 py-0.5 rounded">sub_</code>.
            </p>
            <div className="rounded-2xl bg-panel text-panel-ink p-4 font-mono text-xs text-emerald-300">
              sub_7f3a9c21b8
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex gap-6">
          <div className="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Send an Event</h2>
              <div className="flex gap-1">
                {(["curl", "typescript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono uppercase transition-colors ${
                      activeLang === lang
                        ? "bg-ink text-bg font-medium"
                        : "border border-line text-muted hover:text-ink"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl bg-panel text-panel-ink p-6 border border-white/5 shadow-lg">
              <button
                onClick={copyCode}
                className="absolute top-4 right-4 rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-xs text-white transition-colors"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-emerald-200/95 pr-16">
                <code>{snippets[activeLang]}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex gap-6">
          <div className="w-8 h-8 rounded-full bg-ink text-bg flex items-center justify-center font-bold text-sm shrink-0">
            4
          </div>
          <div className="space-y-3 flex-1">
            <h2 className="text-lg font-semibold tracking-tight">Process the Adaptive Response</h2>
            <p className="text-sm text-muted leading-relaxed">
              PAMHA processes the event and responds with a status <code className="text-xs font-mono bg-line/80 px-1 py-0.5 rounded">202 Accepted</code>, returning the current computed wellbeing score, reasoning factors, and recommended micro-intervention IDs.
            </p>
            <div className="rounded-2xl bg-line/20 border border-line p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Next Steps</h3>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ide"
                  className="rounded-full bg-ink text-bg px-4 py-2 text-xs font-medium hover:opacity-90"
                >
                  Open in Interactive IDE &rarr;
                </Link>
                <Link
                  href="/demo"
                  className="rounded-full border border-line px-4 py-2 text-xs font-medium hover:bg-line/60"
                >
                  Test Peptok AI Showcase Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QuickstartPage;
