import { Link } from "@/src/lib/router";
import { NAV } from "@/src/lib/nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-page px-6 pb-12">
      <div className="grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-bg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M9 4c-3 0-5 2-5 5 0 2 1 3 2 4-1 1-2 2-2 4 0 3 2 4 5 4M9 4v16M9 9h4M9 15h6M13 9V6M15 15v-3" />
              </svg>
            </span>
            <span className="font-semibold tracking-tight">PAMHA</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            The domain-specific foundational AI model powering the next generation of digital mental health platforms.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-line/60 text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Data-Plane v0.1.0 Active
            </span>
          </div>
        </div>

        {NAV.map((g) => (
          <div key={g.label}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{g.label}</p>
            <ul className="space-y-2 text-sm">
              {g.items.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-muted hover:text-ink hover:underline transition-colors flex items-center gap-2"
                  >
                    <span>{i.label}</span>
                    {i.badge && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                        {i.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="max-w-prose text-xs text-muted leading-relaxed">
          PAMHA is a domain-specific foundational AI model delivered as software infrastructure for platforms. It is not a clinical service, does not provide medical advice,
          and is not an emergency service. If someone is in immediate danger, contact local emergency services.
        </p>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="text-xs text-muted whitespace-nowrap">
            &copy; {new Date().getFullYear()} Peptok Technologies Limited. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
export default SiteFooter;
