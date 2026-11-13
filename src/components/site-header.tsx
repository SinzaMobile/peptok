import { useState } from "react";
import { Link, useRouter } from "@/src/lib/router";
import { NAV } from "@/src/lib/nav";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full bg-bg/90 backdrop-blur-md">
      <div className="mx-auto w-full max-w-page px-6">
        <div className="flex items-center justify-between gap-6 border-b border-line py-5">
          {/* Left-aligned PAMHA Logo */}
          <Link
            href="/"
            aria-label="PAMHA home"
            className="flex items-center hover:opacity-85 transition-opacity shrink-0"
          >
            <Logo />
          </Link>

          {/* Desktop Navigation: Platform · Developers · Company */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center text-sm text-muted font-normal"
          >
            {NAV.map((g, idx) => (
              <div key={g.label} className="flex items-center">
                {idx > 0 && (
                  <span className="mx-2.5 select-none text-muted" aria-hidden="true">
                    &middot;
                  </span>
                )}
                <div className="group relative">
                  <button
                    type="button"
                    className="py-1 text-sm text-muted hover:text-ink transition-colors group-focus-within:text-ink focus:outline-none cursor-pointer"
                  >
                    {g.label}
                  </button>
                  <ul className="invisible absolute right-0 top-full z-30 min-w-56 rounded-2xl border border-line bg-bg p-2 opacity-0 shadow-xl transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 mt-2 before:content-[''] before:absolute before:-top-2 before:inset-x-0 before:h-2">
                    {g.items.map((i) => {
                      const isActive = path === i.href;
                      return (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm transition-colors ${
                              isActive
                                ? "bg-line/80 font-medium text-ink"
                                : "text-muted hover:text-ink hover:bg-line/50"
                            }`}
                          >
                            <span>{i.label}</span>
                            {i.badge && (
                              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold">
                                {i.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                    {g.label === "Company" && (
                      <li className="pt-2 mt-2 border-t border-line flex items-center justify-between px-3 py-1.5 text-xs text-muted">
                        <span>Appearance</span>
                        <ThemeToggle />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(!open)}
              className="h-9 rounded-full border border-line px-4 text-sm"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="max-h-[calc(100vh-5rem)] overflow-y-auto space-y-5 border-b border-line py-5 md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="pb-3 border-b border-line flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label="PAMHA home">
                <Logo />
              </Link>
              <span className="text-xs text-muted font-mono uppercase tracking-wider">
                Navigation
              </span>
            </div>

            {NAV.map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">
                  {g.label}
                </p>
                <ul className="space-y-1">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between py-1.5 text-sm ${
                          path === i.href ? "font-semibold text-ink" : "text-muted"
                        }`}
                      >
                        <span>{i.label}</span>
                        {i.badge && (
                          <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">
                            {i.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
export default SiteHeader;
