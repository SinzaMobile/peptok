import { useState } from "react";
import { Link } from "@/src/lib/router";
import { executeSandboxRequest } from "@/src/lib/sandbox-api";

export function SafetyPage() {
  const [testText, setTestText] = useState("I am feeling a little stressed about work, but overall coping fine.");
  const [result, setResult] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const runSafetyCheck = async () => {
    setTesting(true);
    try {
      const res = await executeSandboxRequest(
        "/v1/safety-eval",
        "POST",
        JSON.stringify({ signal_text: testText, subject_id: "sub_test_safety_eval" })
      );
      setResult(res.data);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="mx-auto max-w-page px-6 py-14">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Clinical Governance &amp; Ethics
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Safety by Design, Privacy by Default
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          PAMHA is a domain-specific foundational AI model engineered from day one to operate with strict zero-PII principles and deterministic clinical safety guardrails.
          We provide the foundational model layer; your platform provides the user relationship.
        </p>
      </div>

      {/* 3 Safety Pillars */}
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        <div className="rounded-3xl border border-line bg-bg p-6">
          <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink font-mono font-bold text-sm">
            01
          </div>
          <h2 className="text-lg font-semibold tracking-tight">Zero-PII Enforcement</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Direct personal identifiers (names, emails, social IDs, phone numbers) are blocked at the edge. The system only accepts opaque pseudonymous keys matching <code className="text-xs font-mono bg-line/80 px-1 py-0.5 rounded">^sub_[A-Za-z0-9]{'{8,64}'}$</code>.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-6">
          <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink font-mono font-bold text-sm">
            02
          </div>
          <h2 className="text-lg font-semibold tracking-tight">Real-Time Crisis Interception</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Every incoming payload undergoes immediate dual-tier safety scanning. When acute distress or self-harm keywords are detected, the API overrides standard recommendations and triggers emergency escalation flags.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-6">
          <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink font-mono font-bold text-sm">
            03
          </div>
          <h2 className="text-lg font-semibold tracking-tight">Clinician Handoff Protocols</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            PAMHA is a domain-specific foundational AI model delivered as non-clinical software infrastructure. When safety thresholds are crossed, automated webhooks notify platform operators and licensed emergency triage services for immediate human intervention.
          </p>
        </div>
      </div>

      {/* Interactive Safety Guardrail Simulator */}
      <div className="mt-16 rounded-3xl border border-line bg-panel text-panel-ink p-8 shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3 py-1 text-xs font-mono mb-3">
            Interactive Guardrail Test
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Live Risk Evaluation &amp; Safety Classifier
          </h2>
          <p className="mt-1 text-sm text-panel-ink/70">
            Type a sample journal excerpt or user message to see how the PAMHA edge engine triages risks and activates guardrail flags.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-panel-ink/60 mb-2">
              Sample Input Text
            </label>
            <textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-sans text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none leading-relaxed"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTestText("Feeling calm and satisfied after a good night of sleep and morning workout.")}
                className="text-[11px] rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-panel-ink/80 transition-colors"
              >
                Safe text
              </button>
              <button
                type="button"
                onClick={() => setTestText("I am having panic attacks and cannot breathe, everything is spiraling out of control.")}
                className="text-[11px] rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-panel-ink/80 transition-colors"
              >
                Moderate anxiety
              </button>
              <button
                type="button"
                onClick={() => setTestText("I want to end my life, there is no hope left.")}
                className="text-[11px] rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 px-2.5 py-1 transition-colors"
              >
                Trigger crisis flag
              </button>
            </div>
            <button
              onClick={runSafetyCheck}
              disabled={testing}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold px-5 py-2.5 text-xs hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {testing ? "Evaluating..." : "Run Safety Classifier"}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-xs text-panel-ink/50 py-8">
                Click &quot;Run Safety Classifier&quot; to test edge classification.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-panel-ink/60 font-mono uppercase">Triage Result:</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold font-mono ${
                      result.risk_level === "critical"
                        ? "bg-rose-500 text-white animate-pulse"
                        : result.risk_level === "moderate"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    Risk: {result.risk_level.toUpperCase()}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-panel-ink/60">Is Safe:</span>
                    <span className={result.is_safe ? "text-emerald-400" : "text-rose-400 font-bold"}>
                      {result.is_safe ? "YES" : "NO (ESCALATE)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-panel-ink/60">Escalation Required:</span>
                    <span className="font-mono text-white">
                      {result.escalation_required ? "TRUE (988 Protocol)" : "FALSE"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-panel-ink/60">Recommended Action:</span>
                    <span className="font-mono text-emerald-300">
                      {result.recommended_action}
                    </span>
                  </div>
                </div>

                {result.safety_flags?.length > 0 && (
                  <div className="mt-3 rounded-xl bg-rose-500/10 border border-rose-500/30 p-2.5 text-[11px] text-rose-300 font-mono">
                    Flags: {result.safety_flags.join(", ")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-14 rounded-2xl border border-line/60 bg-line/20 p-6 text-xs text-muted leading-relaxed">
        <strong>Important Clinical Notice:</strong> PAMHA is a domain-specific foundational AI model delivered purely as software and algorithmic infrastructure for platforms. It is not a medical device, does not diagnose, treat, or cure any psychological or psychiatric condition, and does not provide emergency medical services. Platform operators are responsible for ensuring appropriate clinical staffing and emergency handoff protocols.
      </div>
    </div>
  );
}
export default SafetyPage;
