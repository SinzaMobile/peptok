import { Link } from "@/src/lib/router";
import { CodePanel } from "@/src/components/code-panel";

export function HomePage() {
  return (
    <div className="mx-auto max-w-page px-6">
      {/* Hero Section */}
      <section className="pb-12 pt-14 sm:pt-20">
        <p className="text-sm font-medium text-muted tracking-wide">
          Adaptive mental health intelligence
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl leading-[1.1]">
          The intelligence layer for mental health.
        </h1>
        <p className="mt-5 max-w-prose text-lg leading-8 text-muted">
          Powering a new generation of digital wellbeing platforms with adaptive intelligence,
          personalized recommendations and meaningful insights.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/platform"
            className="rounded-full bg-ink px-6 py-3 font-medium text-bg hover:opacity-90 transition-opacity"
          >
            Explore the platform &rarr;
          </Link>
          <Link
            href="/ide"
            className="rounded-full bg-emerald-600 dark:bg-emerald-500 text-white px-6 py-3 font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shadow-sm"
          >
            Launch Interactive IDE
          </Link>
          <Link
            href="/docs/quickstart"
            className="rounded-full border border-line px-6 py-3 font-medium hover:bg-line/60 transition-colors"
          >
            Read documentation
          </Link>
        </div>
      </section>

      {/* Interactive Code Preview Panel */}
      <CodePanel />

      {/* Narrative Section */}
      <section className="mt-20 max-w-prose">
        <p className="text-lg leading-8 text-ink">
          PAMHA is the adaptive AI infrastructure powering the next generation of digital mental health platforms. It delivers personalized
          recommendations, wellbeing tracking, analytics and context-aware intelligence through APIs that integrate into existing applications.
          Platforms deliver the experience under their own brand.
        </p>
      </section>

      {/* Core Architectural Pillars */}
      <section className="mt-20 border-t border-line pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Built for Platforms &amp; Health Systems
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
              Adaptive Intelligence at Scale
            </h2>
          </div>
          <Link href="/platform" className="text-sm font-medium text-ink hover:underline">
            View all capabilities &rarr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-line p-6 hover:border-ink/20 transition-all bg-bg">
            <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Adaptive Inference Engine</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Dynamically evaluates subjective check-ins, sleep architecture, and biometric signals to generate continuous trajectory scores without static rules.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 hover:border-ink/20 transition-all bg-bg">
            <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Clinical Safety Guardrails</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Real-time heuristic and semantic crisis detection with immediate protocol escalation, emergency hotline routing, and clinician triage alerts.
            </p>
          </div>

          <div className="rounded-3xl border border-line p-6 hover:border-ink/20 transition-all bg-bg">
            <div className="w-10 h-10 rounded-xl bg-line/60 grid place-items-center mb-4 text-ink">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold tracking-tight">Strict Zero-PII Policy</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Enforces cryptographically pseudonymous <code className="text-xs font-mono bg-line/80 px-1 py-0.5 rounded">sub_*</code> identifiers. All direct identity data is blocked at edge gateways.
            </p>
          </div>
        </div>
      </section>

      {/* IDE Callout Banner */}
      <section className="mt-20 rounded-3xl border border-line bg-line/20 p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Test the Data-Plane in Your Browser
        </h2>
        <p className="mt-3 max-w-prose mx-auto text-base text-muted">
          Experiment with event ingestion, inspect raw payload responses, test edge safety flags, and view real-time latency benchmarks in our interactive sandbox.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/ide"
            className="rounded-full bg-ink text-bg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
          >
            Open Interactive IDE &rarr;
          </Link>
          <Link
            href="/demo"
            className="rounded-full border border-line px-6 py-3 font-medium hover:bg-line/60 transition-colors"
          >
            Try Peptok AI Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
