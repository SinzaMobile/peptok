/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RouterProvider, useRouter } from "@/src/lib/router";
import { SiteHeader } from "@/src/components/site-header";
import { SiteFooter } from "@/src/components/site-footer";
import { HomePage } from "@/src/pages/HomePage";
import { PlatformPage } from "@/src/pages/PlatformPage";
import { SafetyPage } from "@/src/pages/SafetyPage";
import { PricingPage } from "@/src/pages/PricingPage";
import { AboutPage } from "@/src/pages/AboutPage";
import { ContactPage } from "@/src/pages/ContactPage";
import { InvestorsPage } from "@/src/pages/InvestorsPage";
import { PartnerPage } from "@/src/pages/PartnerPage";
import { ComingSoon } from "@/src/components/coming-soon";

function PageRouter() {
  const { path } = useRouter();

  // Route matching
  if (path === "/" || path === "") {
    return <HomePage />;
  }
  if (path === "/platform") {
    return <PlatformPage />;
  }
  if (path === "/safety") {
    return <SafetyPage />;
  }
  if (path === "/pricing") {
    return <PricingPage />;
  }
  if (path === "/demo") {
    return (
      <ComingSoon
        title="Peptok AI Demo"
        note="Our team is working hard to bring this feature live."
      />
    );
  }
  if (path === "/about") {
    return <AboutPage />;
  }
  if (path === "/contact") {
    return <ContactPage />;
  }
  if (path === "/console") {
    return (
      <ComingSoon
        title="Developer Console"
        note="Our team is working hard to bring this feature live."
      />
    );
  }
  if (path === "/investors") {
    return <InvestorsPage />;
  }
  if (path === "/partner") {
    return <PartnerPage />;
  }

  return <ComingSoon title="Route Not Found" note={`The path '${path}' does not exist.`} />;
}

export default function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-bg text-ink selection:bg-ink selection:text-bg">
        <SiteHeader />
        <main className="flex-1">
          <PageRouter />
        </main>
        <SiteFooter />
      </div>
    </RouterProvider>
  );
}
