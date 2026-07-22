/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MainPage } from "./pages/MainPage";

const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then((m) => ({ default: m.TermsPage })));

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
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            {/* 블로그는 Gnuboard column (/blog → board.php) */}
            <Route path="blog" element={<Navigate to="/" replace />} />
            <Route path="blog/:id" element={<Navigate to="/" replace />} />
            <Route path="admin/blog" element={<Navigate to="/" replace />} />
            {/* 구 분리 페이지 → 홈 섹션 북마크 */}
            <Route path="cases" element={<Navigate to="/#case-seo" replace />} />
            <Route path="services" element={<Navigate to="/#case-keyword" replace />} />
            <Route path="guide" element={<Navigate to="/#guide" replace />} />
            <Route path="contact" element={<Navigate to="/#closing" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
