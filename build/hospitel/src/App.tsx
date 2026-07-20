/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MainPage } from "./pages/MainPage";

const BlogListPage = lazy(() => import("./pages/BlogListPage").then((m) => ({ default: m.BlogListPage })));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage").then((m) => ({ default: m.BlogDetailPage })));
const BlogAdminPage = lazy(() => import("./pages/BlogAdminPage").then((m) => ({ default: m.BlogAdminPage })));
const SuccessCasesPage = lazy(() => import("./pages/SuccessCasesPage").then((m) => ({ default: m.SuccessCasesPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const GuidePage = lazy(() => import("./pages/GuidePage").then((m) => ({ default: m.GuidePage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then((m) => ({ default: m.TermsPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] w-full items-center justify-center text-sm font-medium text-[#6B7280]">
      불러오는 중...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="cases" element={<SuccessCasesPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="guide" element={<GuidePage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:id" element={<BlogDetailPage />} />
            <Route path="admin/blog" element={<BlogAdminPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
