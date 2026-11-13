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
      { label: "Try Peptok AI Demo", href: "/demo", status: "soon" },
      { label: "Developer Console", href: "/console", status: "soon" },
    ],
  },
  {
    label: "Support Us",
    items: [
      { label: "Investors", href: "/investors", status: "live" },
      { label: "Partner with us", href: "/partner", status: "live" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about", status: "live" },
      { label: "Contact", href: "/contact", status: "live" },
    ],
  },
];

export const allLinks = (): NavLink[] => NAV.flatMap((g) => g.items);
