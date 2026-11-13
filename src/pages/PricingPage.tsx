import { useState } from "react";
import { Link } from "@/src/lib/router";

export function PricingPage() {
  const [monthlyEvents, setMonthlyEvents] = useState<number>(100000);

  const calculateCost = () => {
    if (monthlyEvents <= 10000) return 0;
    if (monthlyEvents <= 250000) return 499;
    const extra = monthlyEvents - 250000;
    return 499 + Math.round((extra / 1000) * 1.5);
  };

  return (
    <div className="mx-auto max-w-page px-6 py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Domain-Specific Foundational AI Model Pricing
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Scale from Prototype to Millions of Check-ins
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          Pay for the domain-specific foundational AI model events you ingest. Free forever in developer sandbox mode with synthetic data.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {/* Tier 1: Sandbox */}
        <div className="rounded-3xl border border-line bg-bg p-8 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Prototype
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Developer Sandbox</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">$0</span>
              <span className="text-xs text-muted">/ forever</span>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Ideal for prototyping, evaluation, and running automated tests using synthetic test datasets.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-muted">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Up to 10,000 events / month</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Zero-PII edge validation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>OpenAPI 3.1 schema testing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Synthetic health data generation</span>
              </li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="mt-8 block w-full rounded-full border border-line py-2.5 text-center text-xs font-semibold hover:bg-line/60 transition-colors"
          >
            Request Sandbox Access
          </Link>
        </div>

        {/* Tier 2: Growth (Featured) */}
        <div className="rounded-3xl border-2 border-ink bg-bg p-8 flex flex-col justify-between shadow-lg relative">
          <span className="absolute -top-3.5 left-8 rounded-full bg-ink text-bg px-3 py-0.5 text-[11px] font-semibold tracking-wide">
            Recommended
          </span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Production
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Growth Platform</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">$499</span>
              <span className="text-xs text-muted">/ month</span>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Designed for live digital health and consumer wellbeing apps with real active users.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-muted">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>250,000 production events included</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>$1.50 per 1,000 events thereafter</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Sub-50ms p99 SLA (99.9% uptime)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Real-time Crisis Webhook alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Priority developer support</span>
              </li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="mt-8 block w-full rounded-full bg-ink text-bg py-2.5 text-center text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Upgrade to Growth
          </Link>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="rounded-3xl border border-line bg-bg p-8 flex flex-col justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Custom Scale
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Enterprise &amp; Health Systems</h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">Custom</span>
              <span className="text-xs text-muted">/ annual</span>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              For major insurers, hospital networks, EAPs, and sovereign health agencies requiring isolated infrastructure.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-muted">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited volume &amp; custom quotas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Dedicated isolated VPC deployment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>HIPAA BAA &amp; GDPR Data Addendum</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Tailored clinical safety guidelines</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Dedicated clinical engineering lead</span>
              </li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="mt-8 block w-full rounded-full border border-line py-2.5 text-center text-xs font-semibold hover:bg-line/60 transition-colors"
          >
            Talk to Enterprise Team
          </Link>
        </div>
      </div>

      {/* Interactive Volume Calculator */}
      <div className="mt-16 rounded-3xl border border-line bg-line/20 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold tracking-tight">Estimate Your Monthly Cost</h3>
          <p className="mt-1 text-xs text-muted">
            Drag the slider to calculate your estimated monthly invoice based on expected event volume.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span>{monthlyEvents.toLocaleString()} events/month</span>
              <span>Estimated Cost: <strong className="text-ink text-sm">${calculateCost()}</strong>/mo</span>
            </div>
            <input
              type="range"
              min="5000"
              max="1000000"
              step="5000"
              value={monthlyEvents}
              onChange={(e) => setMonthlyEvents(Number(e.target.value))}
              className="w-full accent-ink cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-muted">
              <span>5k (Free tier)</span>
              <span>250k (Base Growth)</span>
              <span>1 Million events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PricingPage;
