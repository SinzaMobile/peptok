import { Link } from "@/src/lib/router";

export function InvestorsPage() {
  return (
    <div className="mx-auto max-w-page px-6 py-14">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Invest in Peptok
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Building the future of connected mental well-being.
        </h1>

        <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 rounded-2xl border border-line bg-line/20 px-5 py-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Our fundraising ambition:
          </span>
          <span className="text-2xl font-bold tracking-tight text-ink">
            &pound;500,000
          </span>
          <span className="text-xs font-mono text-muted">
            Seed-Stage Funding
          </span>
        </div>

        <p className="mt-5 text-lg text-muted leading-relaxed">
          Peptok is seeking to raise &pound;500,000 in seed-stage funding to accelerate the development, validation and initial market deployment of its mental-health social networking platform and proprietary intelligence technology, PAMHA (Peptok Adaptive Mental Health AI)—a domain-specific foundational AI model for mental wellbeing.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Connect with Our Team &rarr;
          </Link>
          <Link
            href="/platform"
            className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:bg-line/60 transition-colors"
          >
            Platform Architecture
          </Link>
        </div>
      </div>

      <section className="mt-14 border-t border-line pt-12">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Use of Funds
          </span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            How the &pound;500,000 Seed Funding Will Be Spent
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">1. Team Hire</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Recruiting core engineering, AI, product, and clinical-safety talent to accelerate delivery across the Peptok platform and PAMHA infrastructure.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">2. Product Development</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Designing, engineering, and scaling the Peptok mental-health social networking platform alongside core user experiences and API workflows.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">3. PAMHA Training</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Training, fine-tuning, and calibrating PAMHA (Peptok Adaptive Mental Health AI), our domain-specific foundational AI model, for adaptive recommendations, longitudinal trajectory scoring, and safety guardrails.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">4. Product Testing and Launching</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Conducting rigorous clinical-safety validation, Zero-PII security testing, beta trials, and initial market launch of the platform.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">5. Marketing and User Acquisition</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Driving brand awareness, community partnerships, and early user acquisition campaigns to build initial momentum at launch.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-7">
            <h3 className="text-lg font-semibold tracking-tight">6. Operations and Administration</h3>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Supporting essential legal, regulatory compliance, cloud infrastructure, governance, and day-to-day operational overhead.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-14 rounded-3xl border border-line bg-line/20 p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight">Request Investor Materials</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Reach out to our leadership team for roadmap briefings, technical architecture walkthroughs, and partnership updates.
          </p>
        </div>
        <Link
          href="/contact"
          className="rounded-full bg-ink text-bg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity shrink-0 self-start sm:self-auto"
        >
          Contact Investor Relations &rarr;
        </Link>
      </div>
    </div>
  );
}
export default InvestorsPage;
