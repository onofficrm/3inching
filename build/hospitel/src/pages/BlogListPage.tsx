import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { SeoHead } from "../components/SeoHead";
import { useBlogPosts } from "../lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BlogListPage() {
  const { items, loading } = useBlogPosts();
  const featured = items.find((p) => p.featured) || items[0];
  const rest = items.filter((p) => p.id !== featured?.id);

  return (
    <div className="w-full bg-white">
      <SeoHead title="인사이트 블로그" description="병원 마케팅 SEO, AI 검색, 영상, 커뮤니티 인사이트" path="/blog" />
      <section className="w-full bg-[#102B4E] py-14 text-white md:py-20">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <p className="mb-3 text-sm font-bold tracking-wide text-[#B48752]">INSIGHT</p>
          <h1 className="text-[32px] font-bold tracking-tight md:text-[44px]">병원 마케팅 인사이트</h1>
          <p className="mt-3 max-w-2xl text-white/75">검색·AI·영상·커뮤니티 전략을 실무 기준으로 정리합니다.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-8 md:py-20">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#B48752]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-[#6B7280]">등록된 글이 없습니다.</p>
        ) : (
          <>
            {featured && (
              <Link to={`/blog/${featured.slug || featured.id}`} className="group mb-14 grid gap-8 overflow-hidden rounded-[20px] border border-gray-100 bg-[#FAFAFA] md:grid-cols-2">
                {featured.image && (
                  <div className="min-h-[240px] bg-cover bg-center" style={{ backgroundImage: `url(${featured.image})` }} />
                )}
                <div className="flex flex-col justify-center p-8 md:p-10">
                  <span className="mb-3 text-xs font-bold text-[#B48752]">{featured.category}</span>
                  <h2 className="mb-3 text-[24px] font-bold tracking-tight text-[#0A192F] group-hover:text-[#102B4E] md:text-[30px]">{featured.title}</h2>
                  <p className="mb-6 text-[#4B5563]">{featured.summary}</p>
                  <span className="inline-flex items-center gap-2 font-bold text-[#102B4E]">읽기 <ArrowRight className="h-4 w-4" /></span>
                </div>
              </Link>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {rest.map((post) => (
                <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link to={`/blog/${post.slug || post.id}`} className="flex h-full flex-col overflow-hidden rounded-[16px] border border-gray-100 transition hover:shadow-md">
                    {post.image && <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />}
                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-2 text-xs font-bold text-[#B48752]">{post.category}</span>
                      <h3 className="mb-2 text-[18px] font-bold text-[#111827]">{post.title}</h3>
                      <p className="mb-4 flex-1 text-sm text-[#6B7280]">{post.summary}</p>
                      <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                        <span>{post.date}</span>
                        {post.readTime && <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
