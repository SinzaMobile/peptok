export type NavStatus = "live" | "soon";

export type NavLink = {
  label: string;
  href: string;
  status: NavStatus;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

/** Single source of truth for header, footer and navigation. */
export const NAV: NavGroup[] = [
  {
    label: "Platform",
    items: [
      { label: "Capabilities", href: "/platform", status: "live" },
      { label: "Safety & Privacy", href: "/safety", status: "live" },
      { label: "Pricing", href: "/pricing", status: "live" },
    ],
  },
  {
    label: "Developers",
    items: [
      { label: "Interactive IDE", href: "/ide", status: "live", badge: "Live Sandbox" },
      { label: "Documentation", href: "/docs", status: "live" },
      { label: "Quickstart", href: "/docs/quickstart", status: "live" },
      { label: "Try Peptok AI Demo", href: "/demo", status: "live" },
      { label: "Developer Console", href: "/console", status: "live" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", status: "live" },
      { label: "Contact", href: "/contact", status: "live" },
      { label: "Sign in", href: "/console/signin", status: "live" },
    ],
  },
];

export const SIGN_IN: NavLink = { label: "Console", href: "/console", status: "live" };

export const allLinks = (): NavLink[] => [...NAV.flatMap((g) => g.items), SIGN_IN];
