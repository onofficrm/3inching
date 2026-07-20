import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Maximize2, Search, PlayCircle, X, Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { SeoHead } from "../components/SeoHead";
import { useCases } from "../lib/content";

const CASES_DATA = [
  { id: "all", label: "전체" },
  { id: "seo", label: "SEO·GEO" },
  { id: "media", label: "미디어" },
  { id: "community", label: "커뮤니티" },
  { id: "geo", label: "지역 키워드" }
];

export function SuccessCasesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const { items: cmsCases, loading } = useCases();

  const openLightbox = (src: string) => setLightboxImg(src);
  const closeLightbox = () => setLightboxImg(null);

  const filteredCms = useMemo(() => {
    if (activeFilter === "all") return cmsCases;
    const map: Record<string, string[]> = {
      seo: ["SEO·GEO", "AI 검색"],
      media: ["미디어"],
      community: ["커뮤니티"],
      geo: ["지역키워드", "지역 키워드"],
    };
    const keys = map[activeFilter] || [];
    return cmsCases.filter((c) => (c.tags || []).some((t) => keys.includes(t)));
  }, [cmsCases, activeFilter]);

  return (
    <div className="w-full flex flex-col bg-white">
      <SeoHead title="성공 사례" description="병마장 병원 마케팅 실제 성공 사례" path="/cases" />
      {/* 1. 페이지 상단 */}
      <section className="w-full pt-16 md:pt-24 pb-12 md:pb-16 flex justify-center bg-[#102B4E] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
            <svg width="100%" height="100%">
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
        </div>

        <div className="w-full max-w-[1000px] px-5 md:px-8 z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1 px-3 bg-white/10 border border-white/20 text-white text-[11px] font-bold rounded mb-4 tracking-wider">
            REAL CLIENT CASES
          </span>
          <h1 className="text-[32px] md:text-[48px] font-[800] mb-6 leading-tight tracking-tight">
            말이 아니라,<br />
            실제 화면으로 확인하세요
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-2xl mb-12">
            검색 노출, AI 추천, 영상 문의, 커뮤니티 예약까지<br className="hidden md:block" />
            병마장이 실제 클라이언트와 만든 변화를 보여드립니다.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-[8px] text-[13px] md:text-[14px] font-medium text-white/90">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
             모든 병원명, 질환명과 개인정보는 클라이언트 보호를 위해 비공개 처리되었습니다.
          </div>
        </div>
      </section>

      {/* 2. 사례 필터 */}
      <section className="w-full border-b border-border bg-white sticky top-[76px] md:top-[82px] z-40">
        <div className="w-full max-w-[1240px] mx-auto px-0 md:px-8">
           <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-5 md:px-0">
             <div className="flex gap-2 py-4">
                {CASES_DATA.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] md:text-[15px] font-bold transition-colors border",
                      activeFilter === filter.id 
                        ? "bg-[#102B4E] text-white border-[#102B4E]" 
                        : "bg-white text-text-sub border-border hover:border-[#102B4E] hover:text-[#102B4E]"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
             </div>
           </div>
        </div>
      </section>

      {/* CMS 사례 카드 */}
      <section className="w-full max-w-[1000px] mx-auto px-5 md:px-8 pt-14 md:pt-16">
        {loading ? (
          <div className="flex justify-center py-10"><Loader2 className="h-7 w-7 animate-spin text-[#B48752]" /></div>
        ) : filteredCms.length > 0 && (
          <div className="mb-16 grid gap-5 md:grid-cols-2">
            {filteredCms.map((c) => (
              <article key={c.id} className="overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm">
                {c.image && <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />}
                <div className="p-5">
                  <p className="mb-1 text-xs font-bold text-[#B48752]">{c.department}</p>
                  <h3 className="mb-2 text-lg font-bold text-[#0A192F]">{c.title}</h3>
                  <p className="mb-3 text-sm font-bold text-[#102B4E]">{c.metric}</p>
                  <p className="text-sm text-[#4B5563]">{c.summary}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="w-full max-w-[1000px] mx-auto px-5 md:px-8 pb-16 md:pb-24 flex flex-col gap-24">
        
        {/* CASE 01 */}
        {(activeFilter === "all" || activeFilter === "seo") && (
          <Case01 openLightbox={openLightbox} />
        )}

        {/* CASE 02 */}
        {(activeFilter === "all" || activeFilter === "media") && (
          <Case02 openLightbox={openLightbox} />
        )}

        {/* CASE 03 */}
        {(activeFilter === "all" || activeFilter === "community") && (
          <Case03 openLightbox={openLightbox} />
        )}

        {/* CASE 04 */}
        {(activeFilter === "all" || activeFilter === "geo") && (
          <Case04 openLightbox={openLightbox} />
        )}

      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeLightbox}>
           <button className="absolute top-6 right-6 text-white hover:text-gray-300" onClick={closeLightbox}>
             <X className="w-8 h-8" />
           </button>
           <img src={lightboxImg} alt="확대된 이미지" className="max-w-full max-h-[90vh] object-contain rounded-md" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTS
// ----------------------------------------------------

function SectionCTA() {
  return (
    <div className="mt-16 pt-10 border-t border-border flex flex-col items-center text-center">
      <h4 className="text-[20px] md:text-[24px] font-bold text-[#102B4E] mb-6">우리 병원에도 적용할 수 있을까요?</h4>
      <div className="flex flex-col sm:flex-row gap-3">
        <a href="/contact" className="flex items-center justify-center h-[52px] px-8 bg-[#102B4E] text-white font-bold text-[15px] rounded-[8px] hover:bg-[#1A3F6F] transition-colors shadow-sm">
          진행 가능 여부 확인
        </a>
        <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-[52px] px-8 bg-[#FEE500] text-[#371D1E] font-bold text-[15px] rounded-[8px] hover:bg-[#FEE500]/90 transition-colors shadow-sm">
          <MessageCircle className="w-5 h-5" fill="#371D1E" />
          카카오톡 문의
        </a>
      </div>
    </div>
  );
}

function ExpandableImage({ src, alt, caption, onClick }: { src: string; alt: string; caption: string; onClick: () => void }) {
  return (
    <div className="group relative rounded-[12px] border border-border overflow-hidden bg-gray-50 cursor-pointer" onClick={onClick}>
      <img src={src} alt={alt} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
         <div className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
           <Maximize2 className="w-5 h-5" />
         </div>
      </div>
      {caption && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <p className="text-white text-[13px] font-medium">{caption}</p>
        </div>
      )}
    </div>
  );
}

function Case01({ openLightbox }: { openLightbox: (s: string) => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [showMore, setShowMore] = useState(false);

  return (
    <article id="case-seo" className="scroll-mt-32">
      <div className="mb-4">
        <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 01 SEO·GEO</span>
      </div>
      <h2 className="text-[28px] md:text-[36px] font-bold text-text-main mb-10 leading-tight">
        검색하면 없던 병원이,<br/>네이버와 AI 첫 줄에 오기까지
      </h2>

      {/* 도입 배경 요약 박스 */}
      <div className="bg-[#F7F9FC] border border-border rounded-[12px] p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
           <h3 className="text-[15px] font-bold text-text-sub mb-4 uppercase tracking-wider flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-gray-400"></div> 기존 상태
           </h3>
           <ul className="space-y-3">
             <li className="flex items-start gap-2 text-[15px] text-text-main"><span className="text-gray-400">-</span> 매출 월 2,000만원대 정체</li>
             <li className="flex items-start gap-2 text-[15px] text-text-main"><span className="text-gray-400">-</span> 높은 고정비</li>
             <li className="flex items-start gap-2 text-[15px] text-text-main"><span className="text-gray-400">-</span> 검색에서 병원을 발견하기 어려움</li>
           </ul>
        </div>
        <div className="hidden md:block w-px bg-border"></div>
        <div className="flex-1">
           <h3 className="text-[15px] font-bold text-[#102B4E] mb-4 uppercase tracking-wider flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-[#102B4E]"></div> 도입 후
           </h3>
           <ul className="space-y-3">
             <li className="flex items-start gap-2 text-[15px] font-bold text-text-main"><Check className="w-5 h-5 text-primary shrink-0" /> 네이버 웹영역 노출</li>
             <li className="flex items-start gap-2 text-[15px] font-bold text-text-main"><Check className="w-5 h-5 text-primary shrink-0" /> AI 답변 추천</li>
             <li className="flex items-start gap-2 text-[15px] font-bold text-text-main"><Check className="w-5 h-5 text-primary shrink-0" /> 환자 수 증가</li>
             <li className="flex items-start gap-2 text-[15px] font-bold text-text-main"><Check className="w-5 h-5 text-primary shrink-0" /> 매출 변화</li>
           </ul>
        </div>
      </div>

      {/* 대표 화면 우선 노출 */}
      <div className="mb-8">
         <ExpandableImage 
           src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
           alt="네이버 1페이지 노출 사례" 
           caption="지역 키워드 검색 시 상단 영역 전체를 점유한 결과"
           onClick={() => openLightbox("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200")} 
         />
      </div>

      {!showMore ? (
        <div className="text-center">
          <button onClick={() => setShowMore(true)} className="inline-flex items-center gap-2 text-[15px] font-bold text-[#102B4E] bg-gray-50 border border-border px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
            사례 더 보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Tabs */}
          <div className="flex border-b border-border mb-6">
            {[ {id:1, label: "네이버 노출 결과"}, {id:2, label: "AI 추천 결과"}, {id:3, label: "환자·매출 변화"} ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-3 text-[14px] md:text-[15px] font-bold text-center border-b-2 transition-colors",
                  activeTab === tab.id ? "border-[#102B4E] text-[#102B4E]" : "border-transparent text-text-sub hover:text-text-main"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
             {activeTab === 1 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ExpandableImage 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" 
                    alt="웹사이트 탭 장악" 
                    caption="블로그와 웹사이트 탭을 동시 장악한 모습"
                    onClick={() => openLightbox("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800")}
                 />
                 <div className="p-6 bg-gray-50 rounded-[12px] flex flex-col justify-center">
                    <h4 className="text-[18px] font-bold text-text-main mb-3">지역 키워드 완벽 장악</h4>
                    <p className="text-[15px] text-text-sub leading-relaxed">경쟁이 치열한 메인 키워드뿐만 아니라, 실제 환자들이 검색하는 세부 지역/증상 키워드 50여 개에서 상위 노출을 달성했습니다.</p>
                 </div>
               </div>
             )}
             {activeTab === 2 && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <ExpandableImage 
                    src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800" 
                    alt="AI 답변 화면" 
                    caption="클로바X 및 ChatGPT 답변 내 병원 추천"
                    onClick={() => openLightbox("https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800")}
                 />
                 <div className="p-6 bg-gray-50 rounded-[12px] flex flex-col justify-center">
                    <h4 className="text-[18px] font-bold text-text-main mb-3">AI가 추천하는 병원</h4>
                    <p className="text-[15px] text-text-sub leading-relaxed">최신 검색 트렌드인 AI 검색에서 해당 지역 우수 병원으로 자연스럽게 추천되도록 문서 구조를 최적화했습니다.</p>
                 </div>
               </div>
             )}
             {activeTab === 3 && (
               <div className="bg-[#102B4E] rounded-[12px] p-8 text-white text-center">
                  <p className="text-[18px] font-bold mb-2 text-blue-400">도입 3개월 후</p>
                  <p className="text-[28px] md:text-[36px] font-[800] mb-4">월 신환 2.5배 증가</p>
                  <p className="text-[15px] text-white/80">정체되어 있던 매출 곡선이 우상향으로 전환되며 안정적인 고정 수익 기반을 확보했습니다.</p>
               </div>
             )}
          </div>
          
          <div className="text-center mt-6">
            <button onClick={() => setShowMore(false)} className="text-[14px] text-text-sub underline underline-offset-4">
              접기
            </button>
          </div>
        </div>
      )}

      <SectionCTA />
    </article>
  );
}

function Case02({ openLightbox }: { openLightbox: (s: string) => void }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <article id="case-media" className="scroll-mt-32">
      <div className="mb-4">
        <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 02 미디어</span>
      </div>
      <h2 className="text-[28px] md:text-[36px] font-bold text-text-main mb-6 leading-tight">
        영상 한 편이,<br/>전국에서 환자를 데려오기까지
      </h2>
      
      <div className="mb-12">
         <p className="text-[18px] md:text-[20px] font-bold text-[#102B4E]">
            "영상 올려보셨습니까. 환자 왔습니까."
         </p>
         <p className="text-[15px] text-text-sub mt-2">
            단순히 예쁜 영상, 의미 없는 조회수 1만 회는 중요하지 않습니다.
         </p>
      </div>

      <div className="mb-8">
         <ExpandableImage 
           src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200" 
           alt="13.5K 조회수 영상 화면" 
           caption="실제 환자들의 깊은 공감을 이끌어낸 13.5K 조회수 메인 영상"
           onClick={() => openLightbox("https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200")} 
         />
      </div>

      {!showMore ? (
        <div className="text-center">
          <button onClick={() => setShowMore(true)} className="inline-flex items-center gap-2 text-[15px] font-bold text-[#102B4E] bg-gray-50 border border-border px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
            사례 더 보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
           {/* Timeline Flow */}
           <div className="relative pl-6 md:pl-0 mt-12 mb-10">
              <div className="hidden md:block absolute top-[40px] left-0 w-full h-1 bg-gray-100 z-0"></div>
              <div className="md:hidden absolute top-0 left-[23px] w-1 h-full bg-gray-100 z-0"></div>

              <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
                 {[
                   { step: 1, title: "영상 시청", desc: "진정성 있는 스토리텔링" },
                   { step: 2, title: "댓글·메시지", desc: "공감과 질문 폭주" },
                   { step: 3, title: "위치 문의", desc: "병원의 위치를 적극적으로 탐색" },
                   { step: 4, title: "예약", desc: "먼 거리라도 방문 결심" },
                   { step: 5, title: "실제 방문", desc: "전국구 병원으로 성장" }
                 ].map((item, i) => (
                   <div key={i} className="flex md:flex-col items-start md:items-center gap-4 md:gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-white border-[3px] border-[#102B4E] text-[#102B4E] font-bold flex items-center justify-center shrink-0 z-10 shadow-sm bg-white">
                        {item.step}
                      </div>
                      <div className="pt-2 md:pt-0 md:text-center">
                         <h4 className="text-[16px] font-bold text-text-main mb-1">{item.title}</h4>
                         <p className="text-[13px] text-text-sub">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Mobile UI Chat Simulation Image */}
           <div className="bg-[#F7F9FC] rounded-[12px] p-6 md:p-10 flex flex-col items-center">
              <p className="text-[16px] font-bold text-text-main mb-6 text-center">
                 "원장님 영상 보고 부산에서 올라갑니다."<br/>실제 쏟아진 카카오톡 예약 문의
              </p>
              <div className="w-full max-w-[300px]">
                 <ExpandableImage 
                    src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600" 
                    alt="실제 메시지 화면" 
                    caption="카카오톡 채널 실제 예약 문의 내역"
                    onClick={() => openLightbox("https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=600")}
                 />
              </div>
           </div>
           
           <div className="text-center mt-6">
            <button onClick={() => setShowMore(false)} className="text-[14px] text-text-sub underline underline-offset-4">
              접기
            </button>
          </div>
        </div>
      )}

      <SectionCTA />
    </article>
  );
}

function Case03({ openLightbox }: { openLightbox: (s: string) => void }) {
  const [activeTab, setActiveTab] = useState(1);
  const [showMore, setShowMore] = useState(false);

  return (
    <article id="case-community" className="scroll-mt-32">
      <div className="mb-4">
        <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 03 커뮤니티</span>
      </div>
      <h2 className="text-[28px] md:text-[36px] font-bold text-text-main mb-10 leading-tight">
        처음 보는 병원을,<br/>환자가 믿고 찾아오기까지
      </h2>

      <div className="mb-8">
         <ExpandableImage 
           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
           alt="커뮤니티 활동 사례" 
           caption="지역 맘카페 및 주요 커뮤니티 내 원장님 직접 소통 사례"
           onClick={() => openLightbox("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200")} 
         />
      </div>

      {!showMore ? (
        <div className="text-center">
          <button onClick={() => setShowMore(true)} className="inline-flex items-center gap-2 text-[15px] font-bold text-[#102B4E] bg-gray-50 border border-border px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
            사례 더 보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          {/* Tabs */}
          <div className="flex border-b border-border mb-6 overflow-x-auto no-scrollbar">
            {[ {id:1, label: "원장이 직접 답합니다"}, {id:2, label: "후기가 신뢰를 만듭니다"}, {id:3, label: "네이버가 직접 노출합니다"} ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "whitespace-nowrap px-4 py-3 text-[14px] md:text-[15px] font-bold text-center border-b-2 transition-colors",
                  activeTab === tab.id ? "border-[#102B4E] text-[#102B4E]" : "border-transparent text-text-sub hover:text-text-main"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[300px]">
             {activeTab === 1 && (
               <div className="bg-gray-50 p-6 md:p-10 rounded-[12px] flex flex-col gap-6">
                  <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
                     <div className="bg-white p-4 border border-border rounded-lg shadow-sm">
                        <span className="text-xs font-bold text-primary mb-1 block">질문</span>
                        <p className="text-[14px] text-text-main font-medium">"근처에 야간 진료 하는 소아과 괜찮은 곳 있을까요? 아이가 열이 안 떨어져요ㅠ"</p>
                     </div>
                     <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-gray-300 transform rotate-90" /></div>
                     <div className="bg-[#102B4E]/5 p-4 border border-[#102B4E]/20 rounded-lg shadow-sm ml-4">
                        <span className="text-xs font-bold text-[#102B4E] mb-1 block">원장 직접 답변</span>
                        <p className="text-[14px] text-text-main font-medium">"안녕하세요 어머님, 00소아과 원장입니다. 열이 안 떨어지면 많이 걱정되시죠. 저희 병원은 밤 9시까지..."</p>
                     </div>
                     <div className="flex justify-center"><ArrowRight className="w-5 h-5 text-gray-300 transform rotate-90" /></div>
                     <div className="bg-white p-4 border border-border rounded-lg shadow-sm">
                        <span className="text-xs font-bold text-blue-600 mb-1 block">신뢰 및 예약</span>
                        <p className="text-[14px] text-text-main font-medium">"원장님 직접 댓글 달아주셔서 감동이네요ㅠㅠ 당장 출발할게요 감사합니다!"</p>
                     </div>
                  </div>
               </div>
             )}
             
             {activeTab === 2 && (
               <div className="flex flex-col md:flex-row gap-6">
                 <div className="flex-1">
                   <ExpandableImage 
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" 
                      alt="치료 후기" 
                      caption="실제 커뮤니티 내 치료 후기 모음"
                      onClick={() => openLightbox("https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800")}
                   />
                 </div>
                 <div className="flex-1 flex flex-col justify-center bg-gray-50 p-6 rounded-[12px]">
                    <h4 className="text-[18px] font-bold text-text-main mb-3">압도적인 후기의 힘</h4>
                    <p className="text-[15px] text-text-sub leading-relaxed">
                      병마장은 환자들이 자발적으로 긍정적인 경험을 공유할 수 있는 환경을 조성합니다. 
                      한 명의 만족한 환자가 작성한 정성스러운 후기는 열 편의 광고보다 강한 예약 유도 효과를 가집니다.
                    </p>
                 </div>
               </div>
             )}

             {activeTab === 3 && (
               <div>
                  <h4 className="text-[16px] font-bold text-center mb-6 text-text-main">검색어가 달라져도 같은 카페(커뮤니티) 게시물이 반복 노출됩니다</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                        <p className="text-[13px] font-bold text-primary mb-2">증상 검색 (예: 허리 통증)</p>
                        <p className="text-[14px] text-text-sub">네이버 스마트블록에 해당 카페 글 최상단 노출</p>
                     </div>
                     <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                        <p className="text-[13px] font-bold text-primary mb-2">원인 검색 (예: 디스크 원인)</p>
                        <p className="text-[14px] text-text-sub">지식iN 및 VIEW 영역에서 자연스럽게 병원 언급</p>
                     </div>
                     <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                        <p className="text-[13px] font-bold text-primary mb-2">다른 증상 검색 (예: 목 통증)</p>
                        <p className="text-[14px] text-text-sub">동일한 커뮤니티의 연관 후기 글이 추가로 노출</p>
                     </div>
                     <div className="bg-white border border-border p-5 rounded-lg shadow-sm">
                        <p className="text-[13px] font-bold text-primary mb-2">치료 방법 검색</p>
                        <p className="text-[14px] text-text-sub">원장님이 직접 작성한 전문 답변이 상위권 장악</p>
                     </div>
                  </div>
               </div>
             )}
          </div>
          
          <div className="text-center mt-6">
            <button onClick={() => setShowMore(false)} className="text-[14px] text-text-sub underline underline-offset-4">
              접기
            </button>
          </div>
        </div>
      )}

      <SectionCTA />
    </article>
  );
}

function Case04({ openLightbox }: { openLightbox: (s: string) => void }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <article id="case-geo" className="scroll-mt-32">
      <div className="mb-4">
        <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 04 지역 키워드</span>
      </div>
      <h2 className="text-[28px] md:text-[36px] font-bold text-text-main mb-6 leading-tight">
        지역·동·증상 키워드로<br/>병원 주변 검색을 넓히는 전략
      </h2>

      <div className="mb-8">
         <div className="relative group rounded-[12px] border border-border overflow-hidden bg-gray-50 cursor-pointer" onClick={() => openLightbox("https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200")}>
            <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200" alt="키워드 확장 전략" className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
               <div className="w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                 <Maximize2 className="w-5 h-5" />
               </div>
            </div>
            
            {/* 태그 오버레이 */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
               <span className="bg-white/95 text-[#102B4E] font-bold text-[11px] px-2 py-1 rounded shadow-sm">#강남구 (지역명)</span>
               <span className="bg-white/95 text-[#102B4E] font-bold text-[11px] px-2 py-1 rounded shadow-sm">#역삼동 (동 단위)</span>
               <span className="bg-white/95 text-primary font-bold text-[11px] px-2 py-1 rounded shadow-sm">#일자목 (증상)</span>
               <span className="bg-white/95 text-[#102B4E] font-bold text-[11px] px-2 py-1 rounded shadow-sm">#정형외과 (진료과목)</span>
            </div>
         </div>
      </div>

      {!showMore ? (
        <div className="text-center">
          <button onClick={() => setShowMore(true)} className="inline-flex items-center gap-2 text-[15px] font-bold text-[#102B4E] bg-gray-50 border border-border px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
            사례 더 보기 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="bg-[#F7F9FC] p-8 rounded-[12px] border border-border mb-8">
              <h3 className="text-[18px] font-bold text-[#102B4E] mb-4">단독 운영 안내</h3>
              <p className="text-[15px] text-text-sub leading-relaxed mb-6">
                병마장은 검색 결과 독점을 위해 <strong className="text-text-main">동일 지역, 동일 진료과목을 단 한 곳만 계약</strong>하여 진행합니다. 
                원장님의 병원이 해당 지역의 모든 세부 키워드를 점유할 수 있도록 장기적인 자산 구축을 돕습니다.
              </p>
              
              <div className="bg-white p-5 rounded-lg border border-border">
                 <h4 className="text-[15px] font-bold text-text-main mb-3">장기 계약 혜택</h4>
                 <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-[14px] text-text-sub"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 지역 내 독점권 영구 유지</li>
                    <li className="flex items-start gap-2 text-[14px] text-text-sub"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 신규 플랫폼(AI 등) 등장 시 무상 대응 설계</li>
                    <li className="flex items-start gap-2 text-[14px] text-text-sub"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 분기별 성과 리포트 및 방문 컨설팅</li>
                 </ul>
              </div>
           </div>

           <div className="text-center mt-6">
            <button onClick={() => setShowMore(false)} className="text-[14px] text-text-sub underline underline-offset-4">
              접기
            </button>
          </div>
        </div>
      )}

      <SectionCTA />
    </article>
  );
}

// ArrowRight 
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
