import { Link } from "@/src/lib/router";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-14">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          About PAMHA &bull; Domain-Specific Foundational AI Model
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          A Domain-Specific Foundational AI Model, Not a Clinical Service
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          PAMHA—short for <strong className="font-semibold text-ink">Peptok Adaptive Mental Health AI</strong>—is a domain-specific foundational AI model founded on a simple observation: while consumer wellness applications and digital therapeutics continue to proliferate, building reliable, clinically validated, adaptive machine intelligence remains extraordinarily complex and resource-intensive for individual teams.
        </p>
      </div>

      {/* Peptok Ecosystem & Domain-Specific Intelligence */}
      <section className="mt-12 rounded-3xl border border-line bg-line/20 p-8 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted block">
            Peptok Ecosystem &amp; Domain-Specific Foundational AI Model
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">
            PAMHA: Domain-Specific Foundational AI Model Built on Longitudinal Data
          </h2>
          <p className="text-base text-ink leading-relaxed">
            We&apos;re developing Peptok, an integrated mental wellbeing ecosystem, powered by PAMHA, our proprietary AI/ML intelligence architecture.
          </p>
          <p className="text-base text-muted leading-relaxed">
            Our ambition is to build a specialized mental wellbeing model capable of understanding longitudinal wellbeing patterns, identifying evolving support needs, and recommending appropriate interventions across self-guided, peer and professional support.
          </p>
          <p className="text-base text-muted leading-relaxed">
            Rather than building another mental health chatbot on top of a general-purpose LLM, we want to develop domain-specific intelligence that can make structured, measurable decisions using longitudinal data, with an emphasis on accuracy, inference efficiency and continuous improvement.
          </p>
          <p className="text-base text-muted leading-relaxed">
            We&apos;re particularly interested in the challenge you highlighted around verifiable rewards and domain-specific data. We believe Peptok&apos;s integrated ecosystem could provide a foundation for developing and evaluating such a model.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-line bg-bg p-8">
          <h2 className="text-lg font-semibold tracking-tight">Our Philosophy</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            We build the domain-specific foundational AI model layer for state estimation, circadian tracking, and micro-intervention algorithms. You build the brand, the user journey, and the clinical care network. We never compete with our platform partners.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-8">
          <h2 className="text-lg font-semibold tracking-tight">Zero-PII Privacy Standard</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            By rejecting personal identifiers at the API boundary, we eliminate medical identity theft vectors and drastically simplify HIPAA and GDPR compliance for early-stage digital health platforms.
          </p>
        </div>
      </div>

      {/* Milestones / Roadmap */}
      <div className="mt-16 border-t border-line pt-12">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Phase Roadmap</h2>
        <div className="space-y-4 max-w-2xl text-sm">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-line/20 border border-line">
            <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold px-2.5 py-1">
              Phase 1
            </span>
            <span className="font-semibold text-ink">Scaffold, Design Tokens &amp; Initial Shell</span>
            <span className="ml-auto text-xs text-muted">Delivered</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-line/20 border border-line">
            <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold px-2.5 py-1">
              Phase 2
            </span>
            <span className="font-semibold text-ink">Marketing Architecture &amp; Capabilities</span>
            <span className="ml-auto text-xs text-muted">Delivered</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-line/20 border border-line">
            <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold px-2.5 py-1">
              Phase 3
            </span>
            <span className="font-semibold text-ink">OpenAPI 3.1.0 Documentation &amp; Schemas</span>
            <span className="ml-auto text-xs text-muted">Delivered</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-line/20 border border-line">
            <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold px-2.5 py-1">
              Phase 4 &amp; 5
            </span>
            <span className="font-semibold text-ink">Adaptive Intelligence &amp; Clinical Safety Guardrails</span>
            <span className="ml-auto text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Active &bull; Live</span>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Link
          href="/platform"
          className="inline-block rounded-full bg-ink text-bg px-6 py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Explore Platform Capabilities &rarr;
        </Link>
      </div>
    </div>
  );
}
export default AboutPage;
