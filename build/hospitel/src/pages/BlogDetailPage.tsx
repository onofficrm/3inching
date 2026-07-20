import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { useBlogPosts } from "../lib/content";

export function BlogDetailPage() {
  const { id } = useParams();
  const { items, loading } = useBlogPosts();
  const post = items.find((p) => p.id === id || p.slug === id);

  if (loading) {
    return <div className="flex min-h-[40vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#B48752]" /></div>;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
        <SeoHead title="글을 찾을 수 없습니다" path={`/blog/${id || ""}`} noindex />
        <h1 className="mb-4 text-2xl font-bold">글을 찾을 수 없습니다</h1>
        <Link to="/blog" className="font-bold text-[#102B4E]">블로그로 돌아가기</Link>
      </div>
    );
  }

  return (
    <article className="w-full bg-white">
      <SeoHead title={post.title} description={post.summary} path={`/blog/${post.slug || post.id}`} image={post.image} />
      <div className="bg-[#FAFAFA] border-b border-gray-100">
        <div className="mx-auto max-w-[800px] px-5 py-12 md:px-8 md:py-16">
          <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] hover:text-[#102B4E]">
            <ArrowLeft className="h-4 w-4" /> 목록
          </Link>
          <p className="mb-3 text-sm font-bold text-[#B48752]">{post.category}</p>
          <h1 className="mb-4 text-[28px] font-bold tracking-tight text-[#0A192F] md:text-[40px]">{post.title}</h1>
          <p className="text-sm text-[#9CA3AF]">{post.date}{post.readTime ? ` · ${post.readTime}` : ""}</p>
        </div>
      </div>
      {post.image && (
        <div className="mx-auto max-w-[960px] px-5 pt-8 md:px-8">
          <div className="h-[240px] rounded-[16px] bg-cover bg-center md:h-[360px]" style={{ backgroundImage: `url(${post.image})` }} />
        </div>
      )}
      <div className="mx-auto max-w-[800px] px-5 py-10 md:px-8 md:py-14">
        <div className="whitespace-pre-wrap text-[16px] leading-8 text-[#374151]">
          {post.body || post.summary}
        </div>
        <div className="mt-12 rounded-[16px] bg-[#0A192F] p-8 text-center text-white">
          <h2 className="mb-3 text-xl font-bold">우리 병원에도 적용할 수 있을까요?</h2>
          <Link to="/contact" className="inline-flex rounded-[10px] bg-[#B48752] px-6 py-3 font-bold text-white">상담 신청</Link>
        </div>
      </div>
    </article>
  );
}
