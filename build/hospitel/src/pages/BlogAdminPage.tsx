import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { SeoHead } from "../components/SeoHead";

const TOKEN_KEY = "hospitel_admin_token";

export function BlogAdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("SEO·GEO");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(TOKEN_KEY, token);
  }, [token]);

  const onSave = async () => {
    setSaving(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/content?type=blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Hospitel-Token": token,
        },
        body: JSON.stringify({
          action: "upsert",
          token,
          item: {
            id: slug || String(Date.now()),
            slug: slug || undefined,
            title,
            summary,
            category,
            body,
            image,
            date: new Date().toLocaleDateString("ko-KR"),
            type: "인사이트",
            featured: false,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "저장 실패");
      setMessage("저장되었습니다. /blog 에서 확인할 수 있습니다.");
      setTitle("");
      setSlug("");
      setSummary("");
      setBody("");
      setImage("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA]">
      <SeoHead title="블로그 관리" path="/admin/blog" noindex />
      <section className="w-full bg-[#102B4E] py-10 text-white">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          <div className="mb-2 text-sm text-white/60">
            <Link to="/" className="hover:text-white">홈</Link> / <Link to="/blog" className="hover:text-white">블로그</Link> / 관리
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">블로그 글쓰기</h1>
          <p className="mt-2 text-sm text-white/70">관리 토큰은 data/onoff-builder.config.php 의 ONOFF_BUILDER_HOSPITEL_ADMIN_TOKEN 입니다.</p>
        </div>
      </section>

      <div className="mx-auto max-w-[900px] space-y-5 px-5 py-10 md:px-8">
        <label className="block rounded-[12px] border border-gray-100 bg-white p-4 text-sm font-semibold">
          관리 토큰
          <input value={token} onChange={(e) => setToken(e.target.value)} type="password" className="mt-2 w-full rounded-[8px] border border-gray-200 px-3 py-2.5 font-medium" placeholder="HOSPITEL_ADMIN_TOKEN" />
        </label>
        <div className="space-y-4 rounded-[12px] border border-gray-100 bg-white p-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" className="w-full rounded-[8px] border border-gray-200 px-3 py-3 text-lg font-bold" />
          <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="URL 슬러그 (예: hospital-seo-guide)" className="w-full rounded-[8px] border border-gray-200 px-3 py-2.5" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-[8px] border border-gray-200 px-3 py-2.5">
            {["SEO·GEO", "AI 검색", "병원 영상", "커뮤니티", "지역 키워드", "성공 사례"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} placeholder="요약" className="w-full rounded-[8px] border border-gray-200 px-3 py-2.5" />
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="이미지 URL (선택)" className="w-full rounded-[8px] border border-gray-200 px-3 py-2.5" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} placeholder="본문" className="w-full rounded-[8px] border border-gray-200 px-3 py-2.5" />
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {message && <p className="flex items-center gap-2 text-sm font-medium text-green-700"><CheckCircle2 className="h-4 w-4" />{message}</p>}
          <button type="button" onClick={onSave} disabled={saving || !title || !summary || !token} className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#0A192F] px-6 font-bold text-white disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
