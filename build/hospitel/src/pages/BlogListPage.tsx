import { Link } from "react-router-dom";
import { Search, ArrowRight, Clock, MessageCircle, FileText, ChevronDown, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

const CATEGORIES = ["전체", "SEO·GEO", "AI 검색", "병원 영상", "커뮤니티", "지역 키워드", "성공 사례"];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FEATURED_POST = {
  id: 1,
  category: "AI 검색",
  type: "가이드",
  title: "생성형 AI 시대, 우리 병원은 어떻게 검색될 것인가",
  summary: "네이버 큐(CUE:)와 챗GPT 시대에 대응하는 병원 마케팅의 새로운 기준. 변화하는 검색 환경에서 살아남기 위해 지금 당장 시작해야 할 디지털 자산 구축 전략과 AI가 선호하는 콘텐츠 구조화 방법을 심층적으로 알아봅니다.",
  date: "2024. 06. 15",
  readTime: "7분",
  image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200"
};

const BLOG_POSTS = [
  {
    id: 2,
    category: "SEO·GEO",
    type: "인사이트",
    title: "병원 마케팅, 이제는 상위노출이 정답이 아닌 이유",
    summary: "많은 원장님들이 검색 상위노출에만 집착하지만, 실제 환자들의 예약으로 이어지기 위해서는 브랜드 신뢰도를 구축하는 과정이 반드시 필요합니다.",
    date: "2024. 06. 10",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1551076805-e18690c5e451?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    category: "병원 영상",
    type: "체크리스트",
    title: "조회수가 예약으로 이어지는 숏폼 기획법",
    summary: "무의미한 트렌드 따라가기가 아닌, 진짜 환자를 설득하는 병원 숏폼 콘텐츠의 3가지 핵심 요소를 점검하세요.",
    date: "2024. 06. 05",
    readTime: "4분",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    category: "커뮤니티",
    type: "성공 사례",
    title: "카페 커뮤니티로 신규 환자 유입 300% 증가한 사례",
    summary: "일회성 광고가 아닌 자산으로 남는 커뮤니티 운영의 실제. 환자가 먼저 묻고 원장이 답하는 신뢰의 공간 만들기.",
    date: "2024. 05. 28",
    readTime: "6분",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    category: "지역 키워드",
    type: "인사이트",
    title: "동네 상권을 장악하는 세부 키워드 전략",
    summary: "경쟁이 치열한 대표 키워드 대신, 전환율이 높은 지역 기반 세부 증상 키워드로 승부하는 실전 가이드를 공유합니다.",
    date: "2024. 05. 20",
    readTime: "5분",
    image: null // Test fallback image
  },
  {
    id: 6,
    category: "성공 사례",
    type: "뉴스",
    title: "월 매출 2천에서 1억으로: 어느 한의원의 6개월 기록",
    summary: "입지적 불리함을 극복하고 디지털 마케팅의 정석을 밟아 성공한 병원의 실제 사례 심층 분석 리포트.",
    date: "2024. 05. 12",
    readTime: "8분",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    category: "AI 검색",
    type: "인사이트",
    title: "구글 SGE 도입에 따른 병원 웹사이트 개편 방안",
    summary: "새로운 검색 생성 경험(SGE)에 맞춰 우리 병원 웹사이트가 준비해야 할 기술적 요소와 콘텐츠 구조화 가이드.",
    date: "2024. 05. 05",
    readTime: "6분",
    image: "https://images.unsplash.com/photo-1531297172867-4f541336c17d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    category: "SEO·GEO",
    type: "가이드",
    title: "네이버 플레이스 최적화, 2024년 변경된 로직 분석",
    summary: "최근 업데이트된 네이버 스마트플레이스 노출 로직을 분석하고, 지도 검색에서 살아남기 위한 필수 체크리스트.",
    date: "2024. 04. 28",
    readTime: "7분",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    category: "병원 영상",
    type: "인사이트",
    title: "유튜브 알고리즘을 타는 병원 채널의 공통점",
    summary: "빠르게 성장하는 병원 유튜브 채널들을 분석하여 발견한 시청 지속 시간 증가와 구독 전환의 비밀.",
    date: "2024. 04. 15",
    readTime: "5분",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  }
];

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSort, setActiveSort] = useState("최신순");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Simple client-side filtering for demonstration
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = activeCategory === "전체" || post.category === activeCategory;
    const matchesSearch = post.title.includes(searchQuery) || post.summary.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case '인사이트': return 'bg-blue-50 text-blue-700 border-blue-200';
      case '성공 사례': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '체크리스트': return 'bg-orange-50 text-orange-700 border-orange-200';
      case '가이드': return 'bg-purple-50 text-purple-700 border-purple-200';
      case '뉴스': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white">
      {/* 1. 페이지 상단 */}
      <section className="w-full pt-16 md:pt-24 pb-16 md:pb-24 flex justify-center border-b border-gray-100 bg-[#FAFAFA]">
        <div className="w-full max-w-[1240px] px-5 md:px-8 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1">
            <span className="inline-block py-1.5 px-3 bg-[#102B4E]/5 border border-[#102B4E]/10 text-[#102B4E] text-[12px] font-bold rounded mb-6 tracking-wider">
               BMAJANG INSIGHT
            </span>
            <h1 className="text-[36px] md:text-[44px] lg:text-[52px] font-[800] leading-[1.15] text-[#102B4E] mb-6 tracking-tight">
               병원 마케팅의 기준이<br/>바뀌고 있습니다
            </h1>
            <p className="text-[16px] md:text-[18px] text-text-sub leading-relaxed max-w-xl font-medium">
               네이버 검색, AI 검색, 영상, 커뮤니티와 지역 키워드에 관한<br className="hidden md:block" />
               병마장의 실전 인사이트를 제공합니다.
            </p>
          </div>
          
          <div className="w-full md:w-[45%] lg:w-[40%] relative">
             <div className="relative rounded-[16px] overflow-hidden shadow-xl aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" alt="병원 마케팅 인사이트" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B4E]/80 via-[#102B4E]/20 to-transparent flex flex-col justify-end p-6 md:p-8">
                   <span className="text-white/90 font-bold text-[13px] mb-2">최근 인기 콘텐츠</span>
                   <h3 className="text-white font-bold text-[20px] md:text-[24px] leading-tight">
                      2024년 하반기 병원 마케팅 필수 점검 리스트
                   </h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 flex justify-center bg-white">
        <div className="w-full max-w-[1240px] px-5 md:px-8">
          
          {/* 2. 추천 콘텐츠 (Featured Post) - Only show when on "전체" category and no search */}
          {activeCategory === "전체" && searchQuery === "" && (
            <div className="mb-20">
               <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-[24px] font-bold text-text-main">추천 콘텐츠</h2>
                  <div className="h-px bg-border flex-1"></div>
               </div>
               
               <Link to={`/blog/${FEATURED_POST.id}`} className="group flex flex-col lg:flex-row bg-white border border-gray-100 hover:border-[#102B4E]/30 rounded-[20px] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="w-full lg:w-3/5 h-[300px] lg:h-[400px] relative overflow-hidden bg-gray-100">
                     <img src={FEATURED_POST.image} alt={FEATURED_POST.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="w-full lg:w-2/5 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                     <div className="flex items-center gap-2 mb-4">
                        <span className="text-[13px] font-bold text-[#102B4E] tracking-wide">{FEATURED_POST.category}</span>
                        <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold border", getBadgeColor(FEATURED_POST.type))}>
                           {FEATURED_POST.type}
                        </span>
                     </div>
                     <h3 className="text-[28px] md:text-[32px] font-bold text-text-main leading-[1.3] mb-4 group-hover:text-[#1A3F6F] transition-colors tracking-tight">
                        {FEATURED_POST.title}
                     </h3>
                     <p className="text-[16px] text-text-sub leading-relaxed mb-8 line-clamp-3">
                        {FEATURED_POST.summary}
                     </p>
                     
                     <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 text-text-caption text-[13px] font-medium">
                           <span>{FEATURED_POST.date}</span>
                           <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {FEATURED_POST.readTime} 읽기</span>
                        </div>
                        <span className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-text-sub group-hover:bg-[#102B4E] group-hover:text-white group-hover:border-[#102B4E] transition-all duration-300">
                           <ArrowRight className="w-5 h-5" />
                        </span>
                     </div>
                  </div>
               </Link>
            </div>
          )}

          {/* 3. 카테고리 & 4. 검색과 정렬 */}
          <div className="flex flex-col gap-6 mb-12 sticky top-[60px] md:top-[80px] z-30 bg-white/95 backdrop-blur-md pt-4 pb-4 border-b border-gray-100">
             
             {/* Search and Sort Row */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-[360px]">
                   <input 
                     type="text" 
                     placeholder="병원 마케팅 정보를 검색하세요" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-gray-50 border border-gray-200 rounded-[12px] pl-5 pr-12 py-3.5 text-[15px] focus:outline-none focus:border-[#102B4E] focus:bg-white transition-colors font-medium placeholder-gray-400"
                   />
                   <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#102B4E] transition-colors">
                     <Search className="w-5 h-5" />
                   </button>
                </div>

                <div className="relative z-10 w-full md:w-auto flex justify-end">
                   <button 
                     onClick={() => setIsSortOpen(!isSortOpen)}
                     className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-[8px] text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                   >
                     {activeSort} <ChevronDown className={cn("w-4 h-4 transition-transform", isSortOpen && "rotate-180")} />
                   </button>
                   
                   {isSortOpen && (
                      <div className="absolute top-full right-0 mt-2 w-36 bg-white border border-gray-200 rounded-[10px] shadow-lg py-2">
                         {["최신순", "인기순", "추천순"].map(sort => (
                            <button
                              key={sort}
                              onClick={() => { setActiveSort(sort); setIsSortOpen(false); }}
                              className={cn(
                                 "w-full text-left px-4 py-2 text-[14px] font-medium hover:bg-gray-50 transition-colors",
                                 activeSort === sort ? "text-[#102B4E] font-bold" : "text-gray-600"
                              )}
                            >
                               {sort}
                            </button>
                         ))}
                      </div>
                   )}
                </div>
             </div>

             {/* Categories Tab */}
             <div className="flex overflow-x-auto pb-1 scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0 gap-8 border-b border-transparent relative">
                {CATEGORIES.map(category => (
                   <button
                     key={category}
                     onClick={() => setActiveCategory(category)}
                     className={cn(
                        "whitespace-nowrap pb-4 text-[16px] font-bold transition-colors relative",
                        activeCategory === category 
                           ? "text-[#102B4E]" 
                           : "text-gray-400 hover:text-gray-700"
                     )}
                   >
                     {category}
                     {activeCategory === category && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#102B4E]"></div>
                     )}
                   </button>
                ))}
             </div>
          </div>

          {/* Blog List & CTA */}
          {filteredPosts.length > 0 ? (
             <div className="flex flex-col gap-12 md:gap-16">
                
                {/* First Batch of Posts (up to 6) */}
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12"
                >
                   {filteredPosts.slice(0, 6).map((post) => (
                      <motion.div key={post.id} variants={fadeUpVariant} className="h-full">
                        <BlogCard post={post} getBadgeColor={getBadgeColor} />
                      </motion.div>
                   ))}
                </motion.div>

                {/* 7. 중간 CTA (Editorial style banner) */}
                {filteredPosts.length >= 6 && (
                   <div className="w-full bg-[#102B4E] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl my-4 border border-[#1A3F6F]">
                      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                         <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-3 tracking-tight leading-tight">
                            읽어도 우리 병원에<br className="md:hidden" /> 무엇이 필요한지 모르겠다면
                         </h3>
                         <p className="text-white/80 font-medium text-[15px] md:text-[16px]">
                            현재 병원의 상황과 목표를 알려주세요. 가장 적합한 전략을 제안해 드립니다.
                         </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                         <a href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header" target="_blank" rel="noreferrer" className="flex items-center justify-center h-[52px] px-8 bg-white text-[#102B4E] font-bold text-[15px] rounded-[10px] hover:bg-gray-50 transition-colors">
                            상담 신청
                         </a>
                         <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-[52px] px-8 bg-[#FEE500] text-[#371D1E] font-bold text-[15px] rounded-[10px] hover:bg-[#FEE500]/90 transition-colors">
                            <MessageCircle className="w-5 h-5" fill="#371D1E" />
                            카카오톡 문의
                         </a>
                      </div>
                   </div>
                )}

                {/* Second Batch of Posts */}
                {filteredPosts.slice(6).length > 0 && (
                   <motion.div 
                     initial="hidden" 
                     whileInView="visible" 
                     viewport={{ once: true, margin: "-100px" }}
                     variants={staggerContainer}
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12"
                   >
                      {filteredPosts.slice(6).map((post) => (
                         <motion.div key={post.id} variants={fadeUpVariant} className="h-full">
                           <BlogCard post={post} getBadgeColor={getBadgeColor} />
                         </motion.div>
                      ))}
                   </motion.div>
                )}
             </div>
          ) : (
             /* 8. 빈 결과 화면 */
             <div className="w-full py-32 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                   <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-[24px] font-bold text-gray-900 mb-3">검색 결과가 없습니다</h3>
                <p className="text-gray-500 font-medium mb-8">다른 키워드로 검색하거나 전체 콘텐츠를 확인해보세요.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("전체"); }}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-[8px] hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                   전체 콘텐츠 보기
                </button>
             </div>
          )}

          {/* Pagination */}
          {filteredPosts.length > 0 && (
             <div className="mt-20 flex justify-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-100 border border-transparent transition-colors text-[14px] font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-[#102B4E] text-white font-bold shadow-sm text-[14px]">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-[8px] text-gray-500 hover:bg-gray-100 border border-transparent transition-colors text-[14px] font-bold">3</button>
             </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post, getBadgeColor }: { post: any, getBadgeColor: (type: string) => string, key?: any }) {
  return (
    <Link to={`/blog/${post.id}`} className="group flex flex-col h-full bg-white rounded-[20px] overflow-hidden transition-all duration-300">
      <div className="relative aspect-[1.5/1] overflow-hidden bg-[#FAFAFA] rounded-[20px] border border-gray-100 mb-6 flex items-center justify-center">
        {post.image ? (
           <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
           <div className="flex flex-col items-center justify-center text-gray-300">
              <FileText className="w-10 h-10 mb-3" />
              <span className="font-bold text-[13px] uppercase tracking-widest">{post.category}</span>
           </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-2">
        <div className="flex items-center gap-2 mb-4">
           <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-wider">{post.category}</span>
           <span className={cn("px-2 py-0.5 rounded text-[11px] font-bold border", getBadgeColor(post.type))}>
              {post.type}
           </span>
        </div>
        <h3 className="mb-3 text-[20px] font-bold text-[#111827] group-hover:text-[#0A192F] transition-colors line-clamp-2 leading-[1.4] tracking-tight">
          {post.title}
        </h3>
        <p className="text-[#4B5563] text-[15px] mb-6 flex-1 line-clamp-2 leading-relaxed">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
          <div className="flex items-center gap-3 text-[#9CA3AF] text-[13px] font-medium">
            <span>{post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime} 읽기</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0A192F] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

