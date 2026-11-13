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
import { DocsPage } from "@/src/pages/DocsPage";
import { QuickstartPage } from "@/src/pages/QuickstartPage";
import { DemoPage } from "@/src/pages/DemoPage";
import { AboutPage } from "@/src/pages/AboutPage";
import { ContactPage } from "@/src/pages/ContactPage";
import { ConsolePage } from "@/src/pages/ConsolePage";
import { ConsoleSignInPage } from "@/src/pages/ConsoleSignInPage";
import { IdePage } from "@/src/pages/IdePage";
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
  if (path === "/docs") {
    return <DocsPage />;
  }
  if (path === "/docs/quickstart") {
    return <QuickstartPage />;
  }
  if (path === "/demo") {
    return <DemoPage />;
  }
  if (path === "/about") {
    return <AboutPage />;
  }
  if (path === "/contact") {
    return <ContactPage />;
  }
  if (path === "/console") {
    return <ConsolePage />;
  }
  if (path === "/console/signin") {
    return <ConsoleSignInPage />;
  }
  if (path === "/ide") {
    return <IdePage />;
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
