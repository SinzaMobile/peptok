import { useState } from "react";
import { Link, useRouter } from "@/src/lib/router";

export function ConsoleSignInPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate("/console");
    }, 600);
  };

  const handleInstantDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/console");
    }, 400);
  };

  return (
    <div className="mx-auto max-w-page px-6 py-16 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md rounded-3xl border border-line bg-bg p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-ink text-bg grid place-items-center mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M9 4c-3 0-5 2-5 5 0 2 1 3 2 4-1 1-2 2-2 4 0 3 2 4 5 4M9 4v16M9 9h4M9 15h6M13 9V6M15 15v-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to PAMHA Console</h1>
          <p className="mt-2 text-xs text-muted">
            Access developer credentials, audit trails, and data-plane control settings.
          </p>
        </div>

        {/* Instant Sandbox Login CTA */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleInstantDemoLogin}
            disabled={loading}
            className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Instant Developer Access (No password required)</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-line"></div>
          <span className="text-[11px] font-mono text-muted uppercase">or continue with work email</span>
          <div className="h-px flex-1 bg-line"></div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Work Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="developer@yourcompany.com"
              className="w-full rounded-xl border border-line bg-line/10 px-3.5 py-2.5 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink text-bg py-3 text-xs font-semibold hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Send Magic Link"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <Link
            href="/"
            className="text-xs text-muted hover:text-ink hover:underline transition-colors"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ConsoleSignInPage;
