import { useState } from "react";
import { Link } from "@/src/lib/router";
import { API_ENDPOINTS } from "@/src/lib/openapi-data";

export function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Events", "Recommendations", "Safety", "System"];

  const filteredEndpoints =
    selectedCategory === "All"
      ? API_ENDPOINTS
      : API_ENDPOINTS.filter((ep) => ep.category === selectedCategory);

  return (
    <div className="mx-auto max-w-page px-6 py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-line">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Developer Documentation
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            PAMHA API Reference &amp; Guides
          </h1>
          <p className="mt-2 text-base text-muted max-w-2xl">
            Everything you need to integrate adaptive mental health intelligence into your mobile, web, or clinical applications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/docs/quickstart"
            className="rounded-full bg-ink text-bg px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            5-Minute Quickstart &rarr;
          </Link>
          <Link
            href="/ide"
            className="rounded-full border border-line px-5 py-2.5 text-xs font-semibold hover:bg-line/60 transition-colors"
          >
            Launch IDE
          </Link>
        </div>
      </div>

      {/* Docs Body Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar Nav */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              Getting Started
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/quickstart" className="text-muted hover:text-ink transition-colors">
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <a href="#authentication" className="text-muted hover:text-ink transition-colors">
                  Authentication &amp; API Keys
                </a>
              </li>
              <li>
                <a href="#zero-pii" className="text-muted hover:text-ink transition-colors">
                  Zero-PII &amp; Subject IDs
                </a>
              </li>
              <li>
                <a href="#error-codes" className="text-muted hover:text-ink transition-colors">
                  Error Codes &amp; Rate Limits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
              API Endpoints
            </h3>
            <div className="flex flex-wrap gap-1">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`rounded-full px-3 py-1 text-xs transition-colors ${
                    selectedCategory === c
                      ? "bg-ink text-bg font-medium"
                      : "border border-line text-muted hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-12">
          {/* Section: Overview */}
          <section id="authentication" className="rounded-3xl border border-line p-8 bg-bg">
            <h2 className="text-xl font-semibold tracking-tight">Authentication</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              All requests to PAMHA endpoints require a Bearer token in the <code className="font-mono text-xs bg-line/80 px-1.5 py-0.5 rounded">Authorization</code> HTTP header.
              For testing, use your Sandbox key which starts with <code className="font-mono text-xs bg-line/80 px-1.5 py-0.5 rounded">pamha_sb_live_</code>.
            </p>
            <div className="mt-4 rounded-2xl bg-panel text-panel-ink p-4 font-mono text-xs overflow-x-auto">
              Authorization: Bearer pamha_sb_live_49f82bc190a6e7d8c41
            </div>
            <p className="mt-3 text-xs text-muted">
              Need a key? Visit the <Link href="/console" className="text-ink font-semibold underline">Developer Console</Link> to generate instant sandbox tokens.
            </p>
          </section>

          {/* Section: Zero PII */}
          <section id="zero-pii" className="rounded-3xl border border-line p-8 bg-bg">
            <h2 className="text-xl font-semibold tracking-tight">Zero-PII Subject Format</h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              To ensure compliance with GDPR, HIPAA, and medical privacy standards, the PAMHA edge router automatically rejects any payload containing direct personal identifiers (emails, phone numbers, real names).
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Every subject must be identified by an opaque cryptographically pseudonymous hash:
            </p>
            <div className="mt-4 rounded-2xl bg-line/30 border border-line p-4 font-mono text-xs">
              Pattern: ^sub_[A-Za-z0-9]{'{8,64}'}$ &nbsp;&nbsp;// e.g., &quot;sub_7f3a9c21b8&quot;
            </div>
          </section>

          {/* Section: Endpoints */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                Endpoints ({filteredEndpoints.length})
              </h2>
              <span className="text-xs text-muted">Data-Plane v0.1.0</span>
            </div>

            <div className="space-y-6">
              {filteredEndpoints.map((ep) => (
                <div key={ep.id} className="rounded-3xl border border-line bg-bg p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded bg-ink text-bg font-mono text-xs px-2.5 py-1 font-bold">
                        {ep.method}
                      </span>
                      <span className="font-mono text-base font-semibold">{ep.path}</span>
                    </div>
                    <Link
                      href="/ide"
                      className="self-start sm:self-auto rounded-full bg-line/60 hover:bg-line px-3 py-1 text-xs font-medium text-ink transition-colors"
                    >
                      Test in IDE &rarr;
                    </Link>
                  </div>

                  <p className="text-sm text-muted leading-relaxed">{ep.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted block mb-1.5">
                        Sample Request Payload
                      </span>
                      <pre className="rounded-2xl bg-panel text-panel-ink p-4 font-mono text-xs overflow-x-auto text-emerald-200/90 max-h-56">
                        <code>{JSON.stringify(ep.sampleRequest, null, 2)}</code>
                      </pre>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-muted block mb-1.5">
                        Sample Response (202 / 200)
                      </span>
                      <pre className="rounded-2xl bg-panel text-panel-ink p-4 font-mono text-xs overflow-x-auto text-sky-200/90 max-h-56">
                        <code>{JSON.stringify(ep.sampleResponse, null, 2)}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Error codes */}
          <section id="error-codes" className="rounded-3xl border border-line p-8 bg-bg">
            <h2 className="text-xl font-semibold tracking-tight">Status Codes &amp; Errors</h2>
            <div className="mt-4 divide-y divide-line text-xs font-mono">
              <div className="py-2.5 flex justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">202 Accepted</span>
                <span className="text-muted">Event successfully ingested and queued for adaptive inference.</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-bold text-emerald-600 dark:text-emerald-400">200 OK</span>
                <span className="text-muted">Direct recommendation or health check query returned successfully.</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-bold text-amber-600 dark:text-amber-400">400 Bad Request</span>
                <span className="text-muted">Missing required property (e.g. subject_id or event type).</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-bold text-amber-600 dark:text-amber-400">401 Unauthorized</span>
                <span className="text-muted">Missing or invalid Bearer API key.</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="font-bold text-rose-600 dark:text-rose-400">422 Unprocessable Entity</span>
                <span className="text-muted">Strict Zero-PII violation or invalid subject_id hash pattern.</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default DocsPage;
