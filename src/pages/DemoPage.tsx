import { useState, useEffect } from "react";
import { Link } from "@/src/lib/router";
import { executeSandboxRequest } from "@/src/lib/sandbox-api";

export function DemoPage() {
  const [energy, setEnergy] = useState<number>(3);
  const [stress, setStress] = useState<number>(2);
  const [mood, setMood] = useState<string>("calm");
  const [journal, setJournal] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [breathingActive, setBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [timerCount, setTimerCount] = useState<number>(4);

  // Breathing pacer effect
  useEffect(() => {
    if (!breathingActive) return;
    const interval = setInterval(() => {
      setTimerCount((prev) => {
        if (prev <= 1) {
          setBreathPhase((current) => {
            if (current === "Inhale") return "Hold";
            if (current === "Hold") return "Exhale";
            return "Inhale";
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [breathingActive]);

  const handleSubmitCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        subject_id: "sub_peptok_demo_user",
        type: "checkin.completed",
        occurred_at: new Date().toISOString(),
        payload: {
          energy_rating: energy,
          stress_level: stress,
          mood_label: mood,
          journal_snippet: journal,
        },
      };
      const result = await executeSandboxRequest("/v1/events", "POST", JSON.stringify(payload));
      setApiResponse(result.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      {/* Platform Showcase Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Live Showcase App
            </span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono">
              Powered by PAMHA Data-Plane
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Peptok AI &mdash; End-User Wellbeing Experience
          </h1>
          <p className="mt-1 text-sm text-muted">
            This demo simulates how a consumer health app integrates PAMHA&apos;s adaptive intelligence under its own brand.
          </p>
        </div>

        <Link
          href="/platform"
          className="rounded-full border border-line px-4 py-2 text-xs font-semibold hover:bg-line/60 transition-colors self-start md:self-auto"
        >
          Platform Capabilities &rarr;
        </Link>
      </div>

      {/* Main Interactive Demo Container */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Peptok Mobile App Mockup */}
        <div className="lg:col-span-6 rounded-3xl border border-line bg-bg p-6 sm:p-8 shadow-md">
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 grid place-items-center text-white text-xs font-bold">
                P
              </span>
              <div>
                <h2 className="text-base font-semibold leading-tight">Peptok AI</h2>
                <p className="text-[11px] text-muted">Daily Mental Fitness</p>
              </div>
            </div>
            <span className="text-xs text-muted">Oct 28 &bull; Evening</span>
          </div>

          <form onSubmit={handleSubmitCheckin} className="mt-6 space-y-6">
            {/* Mood selector */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                How are you feeling right now?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "calm", label: "Calm", emoji: "🌿" },
                  { id: "energetic", label: "Energized", emoji: "⚡" },
                  { id: "stressed", label: "Overwhelmed", emoji: "🌧️" },
                  { id: "exhausted", label: "Depleted", emoji: "🔋" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMood(item.id)}
                    className={`rounded-2xl border p-3 text-center transition-all ${
                      mood === item.id
                        ? "border-ink bg-line/60 font-semibold text-ink shadow-sm"
                        : "border-line bg-bg text-muted hover:border-ink/30"
                    }`}
                  >
                    <div className="text-xl mb-1">{item.emoji}</div>
                    <div className="text-xs">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted font-medium">Energy Level</span>
                  <span className="font-mono font-bold text-ink">{energy} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full accent-ink cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted font-medium">Stress Level</span>
                  <span className="font-mono font-bold text-ink">{stress} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={stress}
                  onChange={(e) => setStress(Number(e.target.value))}
                  className="w-full accent-ink cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Journal note */}
            <div>
              <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Quick reflection (optional)
              </label>
              <textarea
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                rows={2}
                placeholder="What occupied your thoughts today? (Tested through PAMHA zero-PII guardrail)"
                className="w-full rounded-2xl border border-line bg-line/10 p-3 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-ink text-bg py-3 text-xs font-semibold hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {submitting ? "Processing through PAMHA Data-Plane..." : "Complete Check-in"}
            </button>
          </form>
        </div>

        {/* Right: Adaptive Intervention & Telemetry Result */}
        <div className="lg:col-span-6 space-y-6">
          {/* Peptok Active Micro-Intervention */}
          <div className="rounded-3xl border border-line bg-bg p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <h2 className="text-base font-semibold tracking-tight">Prescribed Micro-Intervention</h2>
              <span className="text-[11px] font-mono text-muted">
                {apiResponse?.recommendation_ids?.[0] || "rec_breathing_01"}
              </span>
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold tracking-tight">2-Minute Cyclic Sighing</h3>
              <p className="mt-1 text-xs text-muted max-w-sm mx-auto leading-relaxed">
                Neurobiologically proven double inhale and slow exhale to reset autonomic nervous arousal.
              </p>

              {/* Animated breathing circle */}
              <div className="my-8 flex flex-col items-center justify-center">
                <div
                  className={`w-36 h-36 rounded-full border-2 border-emerald-500/50 flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathPhase === "Inhale"
                      ? "scale-110 bg-emerald-500/20 shadow-lg"
                      : breathPhase === "Hold"
                      ? "scale-110 bg-emerald-500/30"
                      : "scale-90 bg-emerald-500/10"
                  }`}
                >
                  <span className="text-xs font-mono font-semibold uppercase text-ink tracking-wider">
                    {breathPhase}
                  </span>
                  <span className="text-3xl font-bold font-mono text-ink mt-1">
                    {timerCount}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 text-xs font-medium transition-colors"
              >
                {breathingActive ? "Pause Exercise" : "Start Guided Exercise"}
              </button>
            </div>
          </div>

          {/* Under the hood telemetry card */}
          {apiResponse && (
            <div className="rounded-3xl border border-line bg-panel text-panel-ink p-6 shadow-lg animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-panel-ink/60">Under-the-Hood Telemetry</span>
                <span className="text-xs font-mono text-emerald-400">HTTP 202 Accepted</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-panel-ink/50 block">Inferred Wellbeing:</span>
                  <span className="text-xl font-bold text-white">
                    {apiResponse.wellbeing_score * 100} / 100
                  </span>
                </div>
                <div>
                  <span className="text-panel-ink/50 block">Model Confidence:</span>
                  <span className="text-xl font-bold text-emerald-400">
                    {Math.round(apiResponse.confidence * 100)}%
                  </span>
                </div>
              </div>

              {apiResponse.reasons && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-mono text-panel-ink/50 block mb-1.5">
                    Reasoning Signals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {apiResponse.reasons.map((r: string) => (
                      <span
                        key={r}
                        className="rounded bg-white/10 px-2 py-0.5 text-[11px] font-mono text-panel-ink/90"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default DemoPage;
