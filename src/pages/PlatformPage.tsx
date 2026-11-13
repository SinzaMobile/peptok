import { Link } from "@/src/lib/router";

export function PlatformPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-14">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Platform Architecture &amp; Capabilities
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          The Intelligence Infrastructure for Digital Wellbeing
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          PAMHA decouples adaptive machine intelligence and clinical safety guardrails from front-end user experience,
          enabling digital health providers to offer hyper-personalized interventions while keeping full brand ownership.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/ide"
            className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Test Capabilities in IDE &rarr;
          </Link>
          <Link
            href="/docs"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-line/60 transition-colors"
          >
            API Documentation
          </Link>
        </div>
      </div>

      {/* Two Planes Architecture */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-3xl border border-line bg-bg p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 text-xs font-mono font-medium mb-4">
            High-Throughput / Edge
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Data-Plane (Ingestion &amp; Inference)</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            The data-plane handles live event streaming and sub-50ms inference. It ingests check-ins, passive wearable telemetry, and sentiment signals while enforcing strict pseudonymous identity validation.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 mt-0.5">&bull;</span>
              <span><strong>Sub-50ms p99 Latency:</strong> Regional clusters in Europe and North America optimized for real-time mobile app interaction.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 mt-0.5">&bull;</span>
              <span><strong>Zero-PII Gateway:</strong> All payloads pass through boundary sanitizers that reject emails, names, or unhashed identifiers.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 mt-0.5">&bull;</span>
              <span><strong>Deterministic Heuristic Scoring:</strong> Standardized wellbeing index (0.00 to 1.00) paired with explainable reasoning tags.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 text-xs font-mono font-medium mb-4">
            Governance &amp; Orchestration
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Control-Plane (Policy &amp; Keys)</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            The control-plane manages API key provisioning, rate limits, clinical escalation protocols, and organization-level compliance configurations.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-500 mt-0.5">&bull;</span>
              <span><strong>Dynamic Guardrail Profiles:</strong> Customize sensitivity levels for anxiety, depression, and somatic complaints.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-500 mt-0.5">&bull;</span>
              <span><strong>Multi-Region Sandbox:</strong> Instant synthetic testing environment without impacting production patient metrics.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-500 mt-0.5">&bull;</span>
              <span><strong>Webhooks &amp; Handoffs:</strong> Instant webhook triggers dispatching crisis signals directly into clinical triage queues.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Capabilities Deep-Dive Grid */}
      <div className="mt-16 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">
          Core Adaptive Engine Capabilities
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#128200;</div>
            <h3 className="text-base font-semibold">Circadian Regularization</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Detects chronotype misalignments, social jetlag, and erratic sleep latency trends to prescribe timing adjustments before acute burnout manifests.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#129504;</div>
            <h3 className="text-base font-semibold">Contextual Micro-Interventions</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Selects the optimal modality (physiological sigh, 5-4-3-2-1 grounding, cognitive restructuring) matching user energy level and available time.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#128737;</div>
            <h3 className="text-base font-semibold">Continuous Trajectory Modeling</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Maintains longitudinal state vectors across multiple weeks to distinguish transient situational dips from chronic downward trends.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#128274;</div>
            <h3 className="text-base font-semibold">Client-Side Pseudonymization</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Subject IDs are hashed on client devices before transmission. PAMHA operates strictly on mathematical representations, never medical records.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#9889;</div>
            <h3 className="text-base font-semibold">Crisis Fast-Track Interceptors</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Zero-latency regex &amp; transformer classifier checks every incoming unstructured payload for immediate 988 lifeline intervention.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 bg-bg">
            <div className="text-2xl mb-3">&#128187;</div>
            <h3 className="text-base font-semibold">Developer-First Tooling</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              Native SDKs in TypeScript, Python, and Go, plus an in-browser sandbox IDE with mock payloads and instantaneous feedback loops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlatformPage;
