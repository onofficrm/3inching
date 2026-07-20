/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { MainPage } from "./pages/MainPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { BlogAdminPage } from "./pages/BlogAdminPage";
import { SuccessCasesPage } from "./pages/SuccessCasesPage";
import { ServicesPage } from "./pages/ServicesPage";
import { GuidePage } from "./pages/GuidePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="cases" element={<SuccessCasesPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/:id" element={<BlogDetailPage />} />
          <Route path="admin/blog" element={<BlogAdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
