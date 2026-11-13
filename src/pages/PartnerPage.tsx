import { Link } from "@/src/lib/router";

export function PartnerPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-14">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Partner With Us
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Build Adaptive Wellbeing Experiences on a Domain-Specific Foundational AI Model
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          We partner with digital health platforms, wearable ecosystems, employee assistance providers, and clinical networks to embed PAMHA—our domain-specific foundational AI model—and safety guardrails directly into existing products.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start a Partnership Inquiry &rarr;
          </Link>
          <Link
            href="/platform"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-line/60 transition-colors"
          >
            Explore Platform
          </Link>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-line bg-bg p-7">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Digital Health Apps
          </span>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">Platform Integration</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Deliver personalized micro-interventions, circadian insights, and continuous trajectory scoring under your own brand via sub-50ms APIs.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-7">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Devices &amp; Telemetry
          </span>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">Wearable &amp; Sensor Partners</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Combine passive sleep architecture and biometric signals with subjective check-ins to surface timely, context-aware recommendations.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-7">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
            Clinical &amp; Research
          </span>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">Care &amp; Academic Networks</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Collaborate on safety guardrail validation, webhook-driven clinician escalation workflows, and Zero-PII longitudinal research initiatives.
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-3xl border border-line bg-line/20 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight">Co-Design Your Integration</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Share your expected event volume, regional residency needs, and clinical safety requirements with our solutions engineering team.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-ink text-bg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity shrink-0 self-start sm:self-auto"
        >
          Talk to Partnerships &rarr;
        </Link>
      </div>
    </div>
  );
}
export default PartnerPage;
