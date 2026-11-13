import { useState, useEffect } from "react";
import { Link, useRouter } from "@/src/lib/router";
import {
  getStoredApiKeys,
  saveApiKey,
  revokeApiKey,
  ApiKeyItem,
} from "@/src/lib/sandbox-api";

export function ConsolePage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyTier, setNewKeyTier] = useState<"sandbox" | "production">("sandbox");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  useEffect(() => {
    setKeys(getStoredApiKeys());
  }, []);

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    const token =
      newKeyTier === "sandbox"
        ? `pamha_sb_live_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 10)}`
        : `pamha_live_${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 10)}`;

    const newKey: ApiKeyItem = {
      id: "key_" + Math.random().toString(36).substring(2, 9),
      name: newKeyName || (newKeyTier === "sandbox" ? "New Sandbox Key" : "Production App Key"),
      prefix: newKeyTier === "sandbox" ? "pamha_sb_live_" : "pamha_live_",
      token,
      tier: newKeyTier,
      createdAt: new Date().toISOString(),
      requestsCount: 0,
    };

    saveApiKey(newKey);
    setKeys(getStoredApiKeys());
    setShowCreateModal(false);
    setNewKeyName("");
  };

  const handleRevoke = (id: string) => {
    if (confirm("Are you sure you want to revoke this API key? Applications using it will receive HTTP 401.")) {
      revokeApiKey(id);
      setKeys(getStoredApiKeys());
    }
  };

  const handleCopy = (id: string, token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-line">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Control-Plane &bull; Developer Console
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
            API Keys &amp; Ingestion Governance
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-muted">
            Manage your cryptographic access credentials, rate limits, and live telemetry quota.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-full bg-ink text-bg px-4 py-2 text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            + Create New API Key
          </button>
          <Link
            href="/platform"
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold hover:bg-line/60 transition-colors"
          >
            Platform Capabilities &rarr;
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-line bg-bg p-6">
          <span className="text-xs font-medium text-muted">Sandbox Monthly Usage</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">1,240</span>
            <span className="text-xs text-muted">/ 10,000 events</span>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-line/60 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: "12.4%" }}></div>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-6">
          <span className="text-xs font-medium text-muted">Data-Plane Latency (p99)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">18.4</span>
            <span className="text-xs text-muted">ms</span>
          </div>
          <p className="mt-2 text-xs text-muted">Cluster: Europe-West1 (Operational)</p>
        </div>

        <div className="rounded-3xl border border-line bg-bg p-6">
          <span className="text-xs font-medium text-muted">Active Keys</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">{keys.length}</span>
            <span className="text-xs text-muted">registered</span>
          </div>
          <p className="mt-2 text-xs text-muted">Zero-PII Gateway Enforcement Active</p>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="mt-10 rounded-3xl border border-line bg-bg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-line flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight">Active API Credentials</h2>
          <span className="text-xs text-muted">Showing {keys.length} key(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-line/20 text-muted uppercase tracking-wider font-mono text-[11px]">
              <tr>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Key Token</th>
                <th className="px-6 py-3.5">Environment</th>
                <th className="px-6 py-3.5">Created</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-mono">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-line/10 transition-colors">
                  <td className="px-6 py-4 font-sans font-medium text-ink">
                    {k.name}
                  </td>
                  <td className="px-6 py-4 text-muted">
                    <div className="flex items-center gap-2">
                      <span>{k.token.substring(0, 18)}•••••••••••••</span>
                      <button
                        onClick={() => handleCopy(k.id, k.token)}
                        className="rounded border border-line px-2 py-0.5 text-[11px] text-ink hover:bg-line/40 transition-colors"
                      >
                        {copiedKeyId === k.id ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase ${
                        k.tier === "sandbox"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {k.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted text-[11px]">
                    {new Date(k.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleRevoke(k.id)}
                      className="text-rose-500 hover:text-rose-700 hover:underline transition-colors"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Key */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-line bg-bg p-6 shadow-2xl">
            <h3 className="text-lg font-semibold tracking-tight">Provision New API Key</h3>
            <p className="mt-1 text-xs text-muted">
              Keys are generated instantly and will be stored locally in your browser sandbox environment.
            </p>

            <form onSubmit={handleCreateKey} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Key Label / Identifier
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Staging Mobile App Ingestion"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Environment Tier
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewKeyTier("sandbox")}
                    className={`rounded-2xl border p-3 text-left transition-colors ${
                      newKeyTier === "sandbox"
                        ? "border-ink bg-line/40 font-semibold"
                        : "border-line text-muted"
                    }`}
                  >
                    <div className="text-xs font-semibold">Sandbox</div>
                    <div className="text-[10px] text-muted">Synthetic data testing</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewKeyTier("production")}
                    className={`rounded-2xl border p-3 text-left transition-colors ${
                      newKeyTier === "production"
                        ? "border-ink bg-line/40 font-semibold"
                        : "border-line text-muted"
                    }`}
                  >
                    <div className="text-xs font-semibold">Production</div>
                    <div className="text-[10px] text-muted">Live user telemetry</div>
                  </button>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-full border border-line py-2.5 text-xs font-medium hover:bg-line/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-ink text-bg py-2.5 text-xs font-semibold hover:opacity-90"
                >
                  Generate Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default ConsolePage;
