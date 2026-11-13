import { Link } from "@/src/lib/router";

export function ComingSoon({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-page px-6 py-24 text-center">
      <div className="mx-auto max-w-md">
        <div className="w-12 h-12 mx-auto mb-6 rounded-2xl bg-line/60 grid place-items-center text-muted">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-muted">
          Coming soon. {note ?? "This section is planned in our Phase 2-6 roadmap and is being finalized."}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="inline-block rounded-full border border-line px-5 py-2.5 text-sm hover:bg-line/60 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/ide"
            className="inline-block rounded-full bg-ink text-bg px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Open Interactive IDE
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ComingSoon;
