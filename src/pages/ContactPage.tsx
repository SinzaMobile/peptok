import { useState } from "react";
import { Link } from "@/src/lib/router";

interface SubmissionResult {
  ok: boolean;
  delivered: boolean;
  recipient: string;
  subject: string;
  text: string;
  mailtoUrl: string;
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "digital_health_app",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = (await response.json()) as SubmissionResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send inquiry. Please try again.");
      }

      setSubmissionResult(data);
      setSubmitted(true);

      if (!data.delivered && data.mailtoUrl) {
        const mailLink = document.createElement("a");
        mailLink.href = data.mailtoUrl;
        mailLink.style.display = "none";
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyDetails = () => {
    if (!submissionResult) return;
    navigator.clipboard.writeText(`To: ${submissionResult.recipient}\nSubject: ${submissionResult.subject}\n\n${submissionResult.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-page px-6 py-14">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Get in Touch
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Connect with PAMHA Engineering &amp; Solutions
        </h1>
        <p className="mt-4 text-base text-muted leading-relaxed">
          Whether you are exploring sandbox integration with our domain-specific foundational AI model, requesting high-volume enterprise quotas, or auditing our clinical safety architecture, our team is here to assist.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          {submitted && submissionResult ? (
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-ink">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 grid place-items-center mb-4 text-emerald-600 dark:text-emerald-400">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold">
                {submissionResult.delivered ? "Inquiry Sent" : "Inquiry Ready for support@mypeptok.com"}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {submissionResult.delivered ? (
                  <>
                    Thank you for reaching out, {formData.name || "partner"}. Your inquiry has been sent to{" "}
                    <strong className="text-ink">{submissionResult.recipient}</strong> and our team will follow up within 24 business hours.
                  </>
                ) : (
                  <>
                    Thank you, {formData.name || "partner"}. Your inquiry details have been formatted for{" "}
                    <strong className="text-ink">{submissionResult.recipient}</strong>. If your email app did not open automatically, click below to send it directly.
                  </>
                )}
              </p>

              <div className="mt-5 rounded-2xl border border-line bg-bg/80 p-4 text-xs font-mono text-muted space-y-1">
                <div><span className="text-ink font-semibold">To:</span> {submissionResult.recipient}</div>
                <div><span className="text-ink font-semibold">Subject:</span> {submissionResult.subject}</div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={submissionResult.mailtoUrl}
                  className="rounded-full bg-ink text-bg px-5 py-2 text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Send via Email App &rarr;
                </a>
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="rounded-full border border-line bg-bg px-5 py-2 text-xs font-semibold hover:bg-line/60 transition-colors"
                >
                  {copied ? "Copied Details" : "Copy Email Details"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubmissionResult(null);
                  }}
                  className="rounded-full border border-line px-5 py-2 text-xs font-semibold hover:bg-line/60 transition-colors"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line bg-bg p-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@healthapp.io"
                    className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Acme Digital Therapeutics"
                  className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Primary Use Case
                </label>
                <select
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                >
                  <option value="digital_health_app">Consumer Digital Health / Wellbeing App</option>
                  <option value="eap_corporate">Corporate EAP / Employee Mental Fitness</option>
                  <option value="clinic_triage">Clinical System / Remote Patient Monitoring</option>
                  <option value="wearables">Smart Wearable &amp; Biometric Integration</option>
                  <option value="research">Academic or Clinical Research Study</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your expected monthly event volume, regional residency requirements, or timeline..."
                  className="w-full rounded-xl border border-line bg-line/10 p-3.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink resize-none leading-relaxed"
                />
              </div>

              {error && (
                <div role="alert" className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-600 dark:text-rose-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-ink text-bg py-3 text-xs font-semibold hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {submitting ? "Sending Inquiry..." : "Send Inquiry \u2192"}
              </button>
            </form>
          )}
        </div>

        {/* Right: Quick Links & Support Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-3xl border border-line bg-line/20 p-6">
            <h3 className="text-sm font-semibold tracking-tight">Need Instant Sandbox Access?</h3>
            <p className="mt-2 text-xs text-muted leading-relaxed">
              You do not need to wait for sales approval. Sandbox keys are self-service and activate instantly with 10,000 free monthly events.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-full bg-ink text-bg px-4 py-2 text-xs font-medium hover:opacity-90 transition-opacity"
            >
              View Pricing Tiers &rarr;
            </Link>
          </div>

          <div className="rounded-3xl border border-line bg-bg p-6 space-y-4 text-xs text-muted">
            <h3 className="text-sm font-semibold text-ink tracking-tight">Direct Channels</h3>
            <div>
              <span className="font-semibold text-ink block">Support &amp; Inquiries:</span>
              <a href="mailto:support@mypeptok.com" className="hover:underline">
                support@mypeptok.com
              </a>
            </div>
            <div>
              <span className="font-semibold text-ink block">Developer Discord &amp; Community:</span>
              <span>discord.gg/pamha-devs</span>
            </div>
            <div>
              <span className="font-semibold text-ink block">Security &amp; Vulnerability Reporting:</span>
              <span>security@pamha.example</span>
            </div>
            <div>
              <span className="font-semibold text-ink block">Clinical Advisory Board:</span>
              <span>clinical-affairs@pamha.example</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactPage;
