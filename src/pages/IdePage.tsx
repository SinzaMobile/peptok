import { useState, useEffect } from "react";
import { Link } from "@/src/lib/router";
import {
  API_ENDPOINTS,
  OPENAPI_SPEC,
  ApiEndpoint,
} from "@/src/lib/openapi-data";
import {
  executeSandboxRequest,
  getStoredEvents,
  getStoredApiKeys,
  clearEventHistory,
  IngestedEvent,
  ExecutionResult,
} from "@/src/lib/sandbox-api";

const PRESETS = [
  {
    name: "Standard Check-in",
    endpoint: "/v1/events",
    method: "POST",
    body: {
      subject_id: "sub_7f3a9c21b8",
      type: "checkin.completed",
      occurred_at: new Date().toISOString(),
      payload: {
        energy_rating: 4,
        stress_level: 2,
        mood_label: "calm",
        notes_sentiment: 0.74,
      },
    },
  },
  {
    name: "Sleep Biometrics Telemetry",
    endpoint: "/v1/events",
    method: "POST",
    body: {
      subject_id: "sub_a9b8c7d6e5",
      type: "biometrics.sleep_recorded",
      occurred_at: new Date().toISOString(),
      payload: {
        sleep_duration_minutes: 460,
        deep_sleep_minutes: 110,
        rem_sleep_minutes: 95,
        resting_hr: 54,
        hrv_rmssd: 68,
      },
    },
  },
  {
    name: "Crisis Guardrail Trigger (Safety Demo)",
    endpoint: "/v1/events",
    method: "POST",
    body: {
      subject_id: "sub_c3d4e5f6g7",
      type: "distress.urgent_spike",
      occurred_at: new Date().toISOString(),
      payload: {
        stress_level: 5,
        notes: "I want to end my life, I cannot take this pain anymore.",
      },
    },
  },
  {
    name: "Zero-PII Rejection Test",
    endpoint: "/v1/events",
    method: "POST",
    body: {
      subject_id: "john.doe@wellnessapp.com",
      type: "checkin.completed",
      occurred_at: new Date().toISOString(),
      payload: { mood: "anxious" },
    },
  },
  {
    name: "Query Recommendations",
    endpoint: "/v1/recommendations",
    method: "GET",
    body: {},
  },
  {
    name: "Data-Plane Health Check",
    endpoint: "/v1/health",
    method: "GET",
    body: {},
  },
];

export function IdePage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("/v1/events");
  const [method, setMethod] = useState<string>("POST");
  const [apiKey, setApiKey] = useState<string>("");
  const [apiKeys, setApiKeys] = useState(getStoredApiKeys());
  const [jsonBody, setJsonBody] = useState<string>(
    JSON.stringify(PRESETS[0].body, null, 2)
  );
  const [activeCodeTab, setActiveCodeTab] = useState<"json" | "curl" | "typescript" | "python">("json");
  const [activeResponseTab, setActiveResponseTab] = useState<"visual" | "json" | "headers">("visual");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [eventsHistory, setEventsHistory] = useState<IngestedEvent[]>([]);
  const [copiedResponse, setCopiedResponse] = useState<boolean>(false);
  const [showSpecModal, setShowSpecModal] = useState<boolean>(false);

  useEffect(() => {
    const keys = getStoredApiKeys();
    setApiKeys(keys);
    if (keys.length > 0) {
      setApiKey(keys[0].token);
    }
    setEventsHistory(getStoredEvents());
  }, []);

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSelectedEndpoint(preset.endpoint);
    setMethod(preset.method);
    setJsonBody(JSON.stringify(preset.body, null, 2));
  };

  const generateRandomSubjectId = () => {
    const randomHex = Math.random().toString(36).substring(2, 12);
    const newId = `sub_${randomHex}`;
    try {
      const parsed = JSON.parse(jsonBody);
      parsed.subject_id = newId;
      parsed.occurred_at = new Date().toISOString();
      setJsonBody(JSON.stringify(parsed, null, 2));
    } catch {
      // ignore
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonBody);
      setJsonBody(JSON.stringify(parsed, null, 2));
    } catch (e) {
      alert("Invalid JSON syntax: cannot format");
    }
  };

  const handleRunRequest = async () => {
    setIsLoading(true);
    try {
      const result = await executeSandboxRequest(
        selectedEndpoint,
        method,
        jsonBody,
        apiKey
      );
      setExecutionResult(result);
      setEventsHistory(getStoredEvents());
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyResponse = () => {
    if (executionResult?.rawText) {
      navigator.clipboard.writeText(executionResult.rawText);
      setCopiedResponse(true);
      setTimeout(() => setCopiedResponse(false), 2000);
    }
  };

  const handleReplayEvent = (ev: IngestedEvent) => {
    setSelectedEndpoint(ev.endpoint);
    setMethod(ev.method);
    setJsonBody(JSON.stringify(ev.requestBody, null, 2));
    handleRunRequest();
  };

  const getCurlSnippet = () => {
    const isGet = method === "GET";
    return `curl -X ${method} https://sandbox.api.pamha.example${selectedEndpoint} \\
  -H "Authorization: Bearer ${apiKey || "$PAMHA_SANDBOX_KEY"}" \\
  -H "Content-Type: application/json"${
    !isGet ? ` \\\n  -d '${jsonBody.replace(/'/g, "\\'")}'` : ""
  }`;
  };

  const getTypeScriptSnippet = () => {
    const isGet = method === "GET";
    return `const res = await fetch("https://sandbox.api.pamha.example${selectedEndpoint}", {
  method: "${method}",
  headers: {
    Authorization: "Bearer ${apiKey || "PAMHA_SANDBOX_KEY"}",
    "Content-Type": "application/json",
  },${!isGet ? `\n  body: JSON.stringify(${jsonBody}),` : ""}
});

const data = await res.json();
console.log(data);`;
  };

  const getPythonSnippet = () => {
    const isGet = method === "GET";
    return `import requests

res = requests.${method.toLowerCase()}(
    "https://sandbox.api.pamha.example${selectedEndpoint}",
    headers={
        "Authorization": "Bearer ${apiKey || "PAMHA_SANDBOX_KEY"}",
        "Content-Type": "application/json",
    },${!isGet ? `\n    json=${jsonBody}` : ""}
)

print(res.status_code, res.json())`;
  };

  return (
    <div className="mx-auto max-w-page px-6 py-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              PAMHA Data-Plane IDE
            </h1>
            <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-mono font-medium">
              v0.1.0 Sandbox
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Interactive developer workbench for event ingestion, adaptive state inference, and clinical guardrails.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSpecModal(true)}
            className="flex items-center gap-1.5 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-medium text-ink hover:bg-line/50 transition-colors"
          >
            <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>OpenAPI 3.1 Spec</span>
          </button>
          <Link
            href="/docs"
            className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted hover:text-ink transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="/console"
            className="rounded-full bg-ink text-bg px-3.5 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
          >
            Manage Keys &rarr;
          </Link>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-medium text-muted whitespace-nowrap mr-1">
          Scenarios:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => handleApplyPreset(p)}
            className="rounded-full border border-line/80 bg-line/20 hover:bg-line/60 px-3 py-1 text-xs text-ink whitespace-nowrap transition-colors"
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Control Request Bar */}
      <div className="mt-4 rounded-2xl border border-line bg-bg p-3 shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5">
          {/* Method selector */}
          <div className="flex items-center gap-1">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="rounded-xl border border-line bg-bg px-3 py-2 text-xs font-mono font-bold text-ink focus:outline-none focus:ring-1 focus:ring-ink"
            >
              <option value="POST">POST</option>
              <option value="GET">GET</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Endpoint selector / input */}
          <div className="flex-1 flex items-center rounded-xl border border-line bg-line/20 px-3 py-2">
            <span className="text-xs font-mono text-muted select-none">
              https://sandbox.api.pamha.example
            </span>
            <select
              value={selectedEndpoint}
              onChange={(e) => {
                const ep = e.target.value;
                setSelectedEndpoint(ep);
                if (ep === "/v1/recommendations" || ep === "/v1/health") {
                  setMethod("GET");
                } else {
                  setMethod("POST");
                }
              }}
              className="ml-1 bg-transparent font-mono text-xs text-ink font-semibold focus:outline-none flex-1"
            >
              <option value="/v1/events">/v1/events</option>
              <option value="/v1/recommendations">/v1/recommendations</option>
              <option value="/v1/safety-eval">/v1/safety-eval</option>
              <option value="/v1/health">/v1/health</option>
            </select>
          </div>

          {/* API Key selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-line bg-line/10 px-3 py-2 text-xs">
            <span className="text-muted font-mono">Key:</span>
            <select
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-transparent font-mono text-xs text-ink focus:outline-none"
            >
              {apiKeys.map((k) => (
                <option key={k.id} value={k.token}>
                  {k.name} ({k.token.substring(0, 16)}...)
                </option>
              ))}
              <option value="pamha_invalid_sample_key">Invalid Key (Test 401)</option>
            </select>
          </div>

          {/* Run button */}
          <button
            onClick={handleRunRequest}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-2.5 text-xs font-semibold text-bg shadow hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" strokeDasharray="30 60" />
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
            <span>Send Request</span>
          </button>
        </div>
      </div>

      {/* Main Workbench Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Request Editor & Code Generator */}
        <div className="flex flex-col rounded-3xl border border-line bg-panel text-panel-ink shadow-lg overflow-hidden">
          {/* Header tabs */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/40">
            <div className="flex gap-1">
              {(["json", "curl", "typescript", "python"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors ${
                    activeCodeTab === tab
                      ? "bg-white/15 text-white font-medium"
                      : "text-panel-ink/60 hover:text-panel-ink"
                  }`}
                >
                  {tab === "json" ? "Body (JSON)" : tab.toUpperCase()}
                </button>
              ))}
            </div>

            {activeCodeTab === "json" && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={generateRandomSubjectId}
                  title="Generate pseudonymous subject ID (^sub_[A-Za-z0-9]{8,64}$)"
                  className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] font-mono text-panel-ink/80 transition-colors"
                >
                  + New Subject ID
                </button>
                <button
                  onClick={handleFormatJson}
                  title="Format JSON payload"
                  className="rounded-lg bg-white/5 hover:bg-white/10 px-2 py-1 text-[11px] font-mono text-panel-ink/80 transition-colors"
                >
                  Format
                </button>
              </div>
            )}
          </div>

          {/* Editor content */}
          <div className="p-4 flex-1 min-h-[380px] flex flex-col font-mono text-xs">
            {activeCodeTab === "json" ? (
              <textarea
                value={jsonBody}
                onChange={(e) => setJsonBody(e.target.value)}
                disabled={method === "GET"}
                className="w-full flex-1 bg-transparent text-emerald-200/90 focus:outline-none resize-none leading-relaxed font-mono text-xs placeholder:text-muted disabled:opacity-40"
                placeholder={method === "GET" ? "// No request body required for GET request" : "{ ... }"}
                spellCheck={false}
              />
            ) : (
              <pre className="overflow-x-auto text-sky-200/90 leading-relaxed font-mono text-xs whitespace-pre-wrap">
                <code>
                  {activeCodeTab === "curl"
                    ? getCurlSnippet()
                    : activeCodeTab === "typescript"
                    ? getTypeScriptSnippet()
                    : getPythonSnippet()}
                </code>
              </pre>
            )}
          </div>

          {/* Editor Footer / Info */}
          <div className="border-t border-white/10 px-4 py-2.5 bg-black/60 flex items-center justify-between text-[11px] text-panel-ink/60 font-mono">
            <span>Security: Bearer $PAMHA_SANDBOX_KEY</span>
            <span>Zero-PII Filter: ACTIVE</span>
          </div>
        </div>

        {/* Right: Response Inspector & Visual Output */}
        <div className="flex flex-col rounded-3xl border border-line bg-panel text-panel-ink shadow-lg overflow-hidden">
          {/* Response Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-black/40">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white">Response</span>
              {executionResult && (
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold ${
                      executionResult.status >= 200 && executionResult.status < 300
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : executionResult.status === 422
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {executionResult.status} {executionResult.statusText}
                  </span>
                  <span className="text-[11px] font-mono text-panel-ink/60">
                    {executionResult.latencyMs}ms
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex gap-1">
                {(["visual", "json", "headers"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveResponseTab(tab)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                      activeResponseTab === tab
                        ? "bg-white/15 text-white font-medium"
                        : "text-panel-ink/60 hover:text-panel-ink"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {executionResult && (
                <button
                  onClick={handleCopyResponse}
                  className="rounded-lg bg-white/5 hover:bg-white/10 px-2 py-1 text-[11px] font-mono text-panel-ink/80 transition-colors"
                >
                  {copiedResponse ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          </div>

          {/* Response Content */}
          <div className="p-4 flex-1 min-h-[380px] flex flex-col font-mono text-xs overflow-y-auto">
            {!executionResult ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 text-panel-ink/50 my-auto">
                <div className="w-12 h-12 rounded-2xl bg-white/5 grid place-items-center mb-3">
                  <svg className="w-6 h-6 text-panel-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-panel-ink/80 font-medium">Ready to execute</p>
                <p className="mt-1 font-sans text-xs max-w-xs text-panel-ink/50">
                  Hit &quot;Send Request&quot; or choose a scenario above to inspect synthetic inference and guardrail output.
                </p>
              </div>
            ) : activeResponseTab === "visual" ? (
              <div className="font-sans space-y-4">
                {/* Safety Alert (if any) */}
                {executionResult.data?.safety_flags && executionResult.data.safety_flags.length > 0 && (
                  <div className="rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-rose-200">
                    <div className="flex items-center gap-2 font-semibold text-rose-300 text-sm">
                      <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>Clinical Safety Guardrail Activated</span>
                    </div>
                    <p className="mt-1 text-xs text-rose-300/80">
                      The safety model identified acute distress indicators. Escalation protocol initiated.
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {executionResult.data.safety_flags.map((flag: string) => (
                        <span
                          key={flag}
                          className="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-rose-200 border border-rose-500/30"
                        >
                          {flag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Score & Confidence Gauge */}
                {typeof executionResult.data?.wellbeing_score === "number" && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-panel-ink/60 font-semibold">
                        Adaptive Wellbeing Score
                      </span>
                      <span className="text-xs font-mono text-emerald-400">
                        Confidence: {Math.round(executionResult.data.confidence * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="text-3xl font-semibold text-white tracking-tight">
                        {(executionResult.data.wellbeing_score * 100).toFixed(0)}
                      </span>
                      <span className="text-xs text-panel-ink/50">/ 100 scale</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="mt-2.5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          executionResult.data.wellbeing_score > 0.6
                            ? "bg-emerald-400"
                            : executionResult.data.wellbeing_score > 0.35
                            ? "bg-amber-400"
                            : "bg-rose-400"
                        }`}
                        style={{ width: `${executionResult.data.wellbeing_score * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Inferred Reasons */}
                {executionResult.data?.reasons && executionResult.data.reasons.length > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-panel-ink/60 font-semibold mb-2">
                      Inference Reasoning Factors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {executionResult.data.reasons.map((r: string) => (
                        <span
                          key={r}
                          className="rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-200 px-2.5 py-1 text-xs font-mono"
                        >
                          &bull; {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendation IDs / Full Recommendations */}
                {executionResult.data?.recommendation_ids && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-wider text-panel-ink/60 font-semibold mb-2">
                      Recommended Micro-Interventions
                    </p>
                    <div className="space-y-2">
                      {executionResult.data.recommendation_ids.map((id: string) => (
                        <div
                          key={id}
                          className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-3 py-2 text-xs"
                        >
                          <span className="font-mono text-emerald-300">{id}</span>
                          <span className="text-[11px] text-panel-ink/60">Delivered via SDK</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations List from /recommendations */}
                {executionResult.data?.recommendations && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-panel-ink/60 font-semibold mb-2">
                      Prescribed Interventions ({executionResult.data.recommendations.length})
                    </p>
                    {executionResult.data.recommendations.map((rec: any) => (
                      <div
                        key={rec.id}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white text-sm">{rec.title}</span>
                          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-mono text-panel-ink/70">
                            {rec.duration_seconds}s
                          </span>
                        </div>
                        <p className="text-xs text-panel-ink/70">{rec.description}</p>
                        <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-panel-ink/50">
                          <span>Evidence: {rec.evidence_tier}</span>
                          <span className="text-emerald-400">Score: {rec.priority_score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* System Health Output */}
                {executionResult.data?.status && executionResult.data?.cluster_region && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="font-semibold text-white text-sm">Cluster Status: Healthy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-panel-ink/50">Region:</span>
                        <p className="font-mono text-white">{executionResult.data.cluster_region}</p>
                      </div>
                      <div>
                        <span className="text-panel-ink/50">p99 Latency:</span>
                        <p className="font-mono text-white">{executionResult.data.latency_p99_ms} ms</p>
                      </div>
                      <div>
                        <span className="text-panel-ink/50">Active Ingestion Nodes:</span>
                        <p className="font-mono text-white">{executionResult.data.active_nodes}</p>
                      </div>
                      <div>
                        <span className="text-panel-ink/50">SLA Uptime:</span>
                        <p className="font-mono text-emerald-400">{executionResult.data.uptime_percentage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Box (if 4xx/5xx) */}
                {executionResult.data?.error && (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 text-amber-200">
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>Execution Notice</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-amber-300/90">
                      {executionResult.data.error}
                    </p>
                    {executionResult.data.safety_code && (
                      <span className="mt-2 inline-block rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] text-amber-200">
                        {executionResult.data.safety_code}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : activeResponseTab === "json" ? (
              <pre className="overflow-x-auto text-emerald-300 font-mono text-xs leading-relaxed">
                <code>{executionResult.rawText}</code>
              </pre>
            ) : (
              <div className="space-y-1.5 font-mono text-xs">
                {Object.entries(executionResult.headers).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-panel-ink/80">
                    <span className="text-panel-ink/40">{k}:</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Footer */}
          <div className="border-t border-white/10 px-4 py-2.5 bg-black/60 flex items-center justify-between text-[11px] text-panel-ink/60 font-mono">
            <span>Synthetic Data Isolation: SECURE</span>
            <span>Cluster: Europe-West1</span>
          </div>
        </div>
      </div>

      {/* Live Event Stream / Audit Log */}
      <div className="mt-8 rounded-3xl border border-line bg-bg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Ingested Event Stream (Audit Log)
            </h2>
            <p className="text-xs text-muted">
              Live telemetry ingested into the sandbox during this session.
            </p>
          </div>
          {eventsHistory.length > 0 && (
            <button
              onClick={() => {
                clearEventHistory();
                setEventsHistory([]);
              }}
              className="text-xs text-muted hover:text-ink hover:underline transition-colors self-start sm:self-auto"
            >
              Clear event log
            </button>
          )}
        </div>

        {eventsHistory.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted">
            No events ingested yet in this session. Run a request above to see live stream records.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-line overflow-x-auto">
            {eventsHistory.map((ev) => (
              <div
                key={ev.id}
                className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded bg-line/80 px-2 py-0.5 font-mono font-medium text-ink">
                    {ev.method}
                  </span>
                  <span className="font-mono text-muted">{ev.endpoint}</span>
                  <span className="font-mono text-ink font-semibold">
                    {ev.subject_id}
                  </span>
                  <span className="rounded-full bg-line/50 px-2 py-0.5 text-[11px] text-muted">
                    {ev.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-muted font-mono text-[11px]">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    HTTP {ev.status} ({ev.durationMs}ms)
                  </span>
                  <span>{new Date(ev.timestamp).toLocaleTimeString()}</span>
                  <button
                    onClick={() => handleReplayEvent(ev)}
                    className="rounded border border-line px-2 py-0.5 text-xs text-ink hover:bg-line/60 transition-colors"
                  >
                    Replay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* OpenAPI Specification Modal */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-3xl border border-line bg-bg shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-line p-5">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {OPENAPI_SPEC.info.title} v{OPENAPI_SPEC.info.version}
                </h3>
                <p className="text-xs text-muted">OpenAPI 3.1.0 specification</p>
              </div>
              <button
                onClick={() => setShowSpecModal(false)}
                className="rounded-full p-2 text-muted hover:text-ink hover:bg-line/40 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Available Endpoints</h4>
                <div className="space-y-3">
                  {API_ENDPOINTS.map((ep) => (
                    <div key={ep.id} className="rounded-2xl border border-line p-4 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="rounded bg-ink text-bg font-mono text-xs px-2 py-0.5 font-bold">
                          {ep.method}
                        </span>
                        <span className="font-mono text-sm font-semibold">{ep.path}</span>
                        <span className="text-xs text-muted ml-auto">{ep.category}</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{ep.description}</p>
                      <button
                        onClick={() => {
                          setSelectedEndpoint(ep.path);
                          setMethod(ep.method);
                          setJsonBody(JSON.stringify(ep.sampleRequest, null, 2));
                          setShowSpecModal(false);
                        }}
                        className="text-xs font-semibold text-ink underline hover:opacity-80 pt-1"
                      >
                        Load this endpoint into IDE &rarr;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-line p-4 bg-line/20 flex justify-end">
              <button
                onClick={() => setShowSpecModal(false)}
                className="rounded-full bg-ink text-bg px-5 py-2 text-xs font-medium"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default IdePage;
