import { Link } from "react-router-dom";
import { Clock, Maximize2, Share2, Link as LinkIcon, ChevronDown, Check, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function BlogDetailPage() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center bg-white pb-24 relative">
      
      {/* Article Content Wrapper */}
      <div className="w-full max-w-[1240px] px-5 md:px-6 xl:px-8 mx-auto flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 pt-8 md:pt-16">
        
        {/* Main Column */}
        <main className="w-full max-w-[800px] mx-auto lg:mx-0 flex-1">
          
          {/* 1. Header */}
          <header className="mb-10 md:mb-12">
            <div className="flex items-center gap-2 mb-4">
               <span className="text-[12px] font-bold text-[#102B4E] uppercase tracking-wider">SEO·GEO</span>
               <span className="text-gray-300">|</span>
               <span className="text-[12px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">인사이트</span>
            </div>
            
            <h1 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-gray-900 leading-[1.3] mb-5 tracking-tight max-w-[720px]">
              병원 마케팅, 이제는 단순히 상위노출이 정답이 아닌 이유
            </h1>
            
            <p className="text-[16px] md:text-[18px] text-gray-600 leading-[1.6] mb-8 font-medium">
              많은 원장님들이 검색 상위노출에만 집착하지만, 실제 환자들의 예약으로 이어지기 위해서는 브랜드 신뢰도를 구축하는 과정이 반드시 필요합니다.
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#102B4E] text-white rounded-full flex items-center justify-center font-bold text-[15px]">
                  병
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-bold text-gray-900">병마장</span>
                  <div className="flex items-center text-[12px] text-gray-500 gap-2">
                    <span>2024. 05. 20</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5분 읽기</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#102B4E] hover:text-white hover:border-[#102B4E] transition-colors shadow-sm">
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#102B4E] hover:text-white hover:border-[#102B4E] transition-colors shadow-sm">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-gray-100 rounded-[16px] overflow-hidden mb-12 border border-gray-100">
             <img src="https://images.unsplash.com/photo-1551076805-e18690c5e451?auto=format&fit=crop&q=80&w=1200" alt="병원 마케팅 상위노출의 한계" className="w-full h-full object-cover" />
          </div>

          {/* Mobile TOC */}
          <div className="lg:hidden mb-10 border border-gray-200 rounded-[12px] bg-gray-50 overflow-hidden">
             <button onClick={() => setTocOpen(!tocOpen)} className="w-full px-5 py-4 flex items-center justify-between font-bold text-gray-900 text-[15px]">
                목차
                <ChevronDown className={cn("w-5 h-5 text-gray-500 transition-transform", tocOpen && "rotate-180")} />
             </button>
             {tocOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-200">
                   <ul className="flex flex-col gap-3 text-[14px] font-medium text-gray-600">
                      <li><a href="#section-1" className="text-[#102B4E] font-bold">1. 검색 결과만으로 환자가 오지 않는 이유</a></li>
                      <li><a href="#section-2" className="hover:text-[#102B4E] transition-colors">2. 환자의 실제 검색 여정 분석</a></li>
                      <li><a href="#section-3" className="hover:text-[#102B4E] transition-colors">3. 디지털 자산을 구축해야 하는 진짜 이유</a></li>
                   </ul>
                </div>
             )}
          </div>
          
          {/* Article Body */}
          <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight prose-p:text-gray-700 prose-p:leading-[1.85] prose-a:text-[#102B4E] prose-a:font-bold prose-a:no-underline hover:prose-a:underline prose-img:rounded-[12px] prose-strong:text-gray-900 prose-li:text-gray-700 prose-li:leading-[1.85]">
             
             <h2 id="section-1" className="text-[24px] md:text-[28px] mt-12 mb-6 pt-8 border-t border-gray-100 first:mt-0 first:pt-0 first:border-0">1. 검색 결과만으로 환자가 오지 않는 이유</h2>
             
             <p>
               과거에는 단순히 주요 키워드를 검색했을 때 상단에 노출되는 것만으로도 충분한 신환 문의를 기대할 수 있었습니다. 하지만 지금은 다릅니다. 환자들은 검색 결과에서 병원 이름을 확인한 후, 곧바로 해당 병원의 <strong>블로그, 유튜브, 커뮤니티 평판을 크로스 체크</strong>합니다.
             </p>
             
             <p>
               아무리 값비싼 파워링크나 상위노출 광고를 진행하더라도, 최종적으로 랜딩되는 페이지에서 원장님의 철학이나 환자들의 실제 후기를 찾을 수 없다면 이탈률은 기하급수적으로 높아집니다.
             </p>

             {/* Highlight Box */}
             <div className="bg-[#102B4E]/5 border-l-4 border-[#102B4E] p-6 md:p-8 my-10 not-prose rounded-r-[12px]">
               <p className="text-[16px] text-gray-800 font-bold leading-[1.7]">
                 상위 노출은 환자 여정의 '시작'일 뿐입니다. 진짜 마케팅은 유입된 환자가 우리 병원을 신뢰하게 만드는 과정입니다.
               </p>
             </div>

             {/* 5. 본문 중간 CTA */}
             <div className="my-12 p-8 md:p-10 bg-[#F7F9FC] border border-gray-200 rounded-[16px] flex flex-col items-center text-center not-prose shadow-sm">
               <h4 className="text-[20px] md:text-[24px] font-bold text-gray-900 mb-3 tracking-tight">이 내용이 우리 병원에도 해당될까요?</h4>
               <p className="text-gray-600 mb-8 text-[15px] font-medium leading-relaxed">지역과 진료과목을 알려주시면<br className="md:hidden" /> 현재 적용 가능한 전략을 확인해드립니다.</p>
               <a href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header" target="_blank" rel="noreferrer" className="inline-flex h-[56px] w-full md:w-auto items-center justify-center bg-[#102B4E] text-white font-bold px-10 rounded-[10px] hover:bg-[#1A3F6F] transition-colors text-[16px] shadow-sm">
                 진행 가능 여부 확인
               </a>
             </div>

             <h2 id="section-2" className="text-[24px] md:text-[28px] mt-16 mb-6 pt-8 border-t border-gray-100">2. 환자의 실제 검색 여정 분석</h2>
             
             <p>
               데이터를 통해 환자들이 실제로 어떻게 병원을 선택하는지 확인해 보겠습니다.
             </p>

             {/* Image with Caption */}
             <figure className="my-10 not-prose">
               <div className="relative group rounded-[16px] overflow-hidden bg-gray-50 border border-gray-200 aspect-[4/3] md:aspect-auto md:h-auto">
                 <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="환자 검색 여정 데이터 분석" className="w-full h-full object-cover md:h-auto" />
                 <button className="absolute bottom-4 right-4 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-lg">
                   <Maximize2 className="w-5 h-5" />
                 </button>
               </div>
               <figcaption className="text-center text-[13px] text-gray-500 mt-4 font-medium">데이터 출처: 병마장 내부 컨설팅 통계 자료 (2024)</figcaption>
             </figure>

             <h3 className="text-[20px] md:text-[22px] mt-12 mb-4">환자의 3단계 검증 프로세스</h3>
             
             {/* Numbered List */}
             <ol className="pl-5 space-y-2">
                <li><strong>1단계 (인지):</strong> 지역명 + 진료과목 검색을 통한 병원 리스트 확보</li>
                <li><strong>2단계 (탐색):</strong> 특정 병원명 검색을 통한 블로그, 후기, 원장 이력 확인</li>
                <li><strong>3단계 (결정):</strong> 커뮤니티나 지도 리뷰에서 실제 환자들의 긍/부정 반응 크로스 체크</li>
             </ol>

             {/* Related Links */}
             <div className="my-10 not-prose">
               <div className="flex flex-col gap-2">
                 <Link to="/blog/3" className="flex items-center gap-3 p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-[12px] hover:bg-white hover:border-[#102B4E] transition-colors group">
                   <LinkIcon className="w-5 h-5 text-gray-400 group-hover:text-[#102B4E] shrink-0" />
                   <span className="text-[15px] font-bold text-gray-700 group-hover:text-[#102B4E] leading-[1.5]">함께 읽으면 좋은 글: 유튜브 알고리즘을 타는 병원 채널의 공통점</span>
                 </Link>
               </div>
             </div>

             {/* Checklist */}
             <div className="bg-[#F7F9FC] border border-gray-200 rounded-[16px] p-6 md:p-8 my-10 not-prose">
               <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-5">우리 병원의 상태를 점검해 보세요!</h4>
               <ul className="flex flex-col gap-4">
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#102B4E] text-white flex items-center justify-center shrink-0 mt-0.5">
                     <Check className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-[1.6]">병원 이름 검색 시 네이버 플레이스가 깔끔하게 정돈되어 있나요?</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#102B4E] text-white flex items-center justify-center shrink-0 mt-0.5">
                     <Check className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-[1.6]">원장님이 직접 작성한 (또는 그렇게 보이는) 진정성 있는 블로그 글이 있나요?</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full bg-[#102B4E] text-white flex items-center justify-center shrink-0 mt-0.5">
                     <Check className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-[1.6]">지역 커뮤니티에 부정적인 여론이 방치되어 있지 않나요?</span>
                 </li>
               </ul>
             </div>

             <h2 id="section-3" className="text-[24px] md:text-[28px] mt-16 mb-6 pt-8 border-t border-gray-100">3. 디지털 자산을 구축해야 하는 진짜 이유</h2>
             
             <p>
               따라서 이제 병원 마케팅은 단편적인 '광고 노출'에서 벗어나, 환자가 어떤 경로로 유입되더라도 신뢰를 느낄 수 있는 <strong>'디지털 자산(Digital Asset)'</strong>을 구축하는 방향으로 나아가야 합니다. 
             </p>
             
             {/* Table */}
             <div className="my-10 not-prose">
               <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                 <table className="w-full min-w-[640px] border-collapse bg-white m-0 border border-gray-200">
                   <thead>
                     <tr>
                       <th className="bg-[#102B4E] text-white p-4 font-bold text-[15px] border-r border-[#1A3F6F] w-1/3">구분</th>
                       <th className="bg-[#102B4E] text-white p-4 font-bold text-[15px] border-r border-[#1A3F6F] w-1/3">단순 상위노출 광고</th>
                       <th className="bg-blue-600 text-white p-4 font-bold text-[15px] w-1/3">디지털 자산 구축</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="bg-white">
                       <td className="p-4 border border-gray-200 text-[14px] font-bold text-gray-700 text-center">지속성</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-gray-600 text-center">비용 중단 시 즉각 효과 소멸</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-[#102B4E] font-bold text-center">콘텐츠가 누적되어 장기적 효과</td>
                     </tr>
                     <tr className="bg-gray-50">
                       <td className="p-4 border border-gray-200 text-[14px] font-bold text-gray-700 text-center">신뢰도</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-gray-600 text-center">환자가 '광고'로 인식하여 낮음</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-[#102B4E] font-bold text-center">정보와 스토리로 진정성 형성</td>
                     </tr>
                     <tr className="bg-white">
                       <td className="p-4 border border-gray-200 text-[14px] font-bold text-gray-700 text-center">전환율</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-gray-600 text-center">노출 대비 낮음</td>
                       <td className="p-4 border border-gray-200 text-[14px] text-[#102B4E] font-bold text-center">검증을 마친 유입으로 매우 높음</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
               <p className="text-[12px] text-gray-400 text-right mt-1 md:hidden font-medium">← 표를 좌우로 스크롤하세요 →</p>
             </div>

             <p>
               잘 구축된 브랜드 블로그, 원장님의 철학이 담긴 인터뷰 영상, 긍정적인 커뮤니티 리뷰는 시간이 지날수록 누적되며 강력한 마케팅 해자가 됩니다.
             </p>

             {/* Warning Box */}
             <div className="bg-red-50 border border-red-200 rounded-[12px] p-6 my-10 not-prose flex items-start gap-4">
               <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
               <div>
                 <h4 className="text-[16px] font-bold text-red-900 mb-2">주의하세요</h4>
                 <p className="text-[14px] text-red-800 leading-[1.6] font-medium">
                   의료법 위반 소지가 있는 과장된 후기를 작성하거나 불법적인 어뷰징을 통해 순위를 올리는 행위는 병원의 존립 자체를 위협할 수 있습니다. 정공법이 가장 빠른 길입니다.
                 </p>
               </div>
             </div>

             {/* Quote */}
             <blockquote className="border-l-[4px] border-[#CC2222] pl-6 md:pl-8 py-2 my-12 bg-white italic text-[#102B4E] font-bold text-[22px] md:text-[26px] leading-[1.6] not-prose tracking-tight">
               "마케팅 비용을 소비하는 것이 아니라,<br className="hidden md:block"/> 병원의 자산을 투자하는 관점으로 접근해야 합니다."
             </blockquote>

          </article>
          
          {/* 6. 글 하단 요소 */}
          <div className="mt-16 pt-10 border-t border-gray-200">
             
             {/* Core Summary */}
             <div className="bg-gray-50 p-6 md:p-8 rounded-[16px] mb-12 border border-gray-200">
               <h3 className="text-[16px] font-bold text-gray-900 mb-5 flex items-center gap-2"><Check className="w-5 h-5 text-[#102B4E]" /> 이 글의 핵심 요약</h3>
               <ul className="flex flex-col gap-3 text-[14px] md:text-[15px] text-gray-700 font-medium">
                 <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 검색 상위 노출만으로는 실제 환자 유입을 보장할 수 없습니다.</li>
                 <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 환자는 인지-탐색-결정의 3단계를 거치며 병원을 꼼꼼히 검증합니다.</li>
                 <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 블로그, 영상, 커뮤니티 평판을 아우르는 '디지털 자산' 구축이 필수입니다.</li>
               </ul>
             </div>

             {/* Share Buttons */}
             <div className="flex flex-col items-center gap-4 mb-16">
                <span className="text-[14px] font-bold text-gray-500">이 콘텐츠가 유용했다면 공유해주세요</span>
                <div className="flex items-center gap-3">
                   <button className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#102B4E] hover:text-white hover:border-[#102B4E] transition-all shadow-sm">
                      <LinkIcon className="w-5 h-5" />
                   </button>
                   <button className="w-12 h-12 rounded-full bg-[#FEE500] text-[#371D1E] flex items-center justify-center hover:bg-[#FEE500]/90 transition-all shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 4C5.9 4 1 7.9 1 12.8c0 3.2 2 6.1 5.2 7.7-.2.6-1 3.2-1 3.4 0 .3.4.4.6.3 1.2-.8 3.5-2.4 4.5-3.1.5.1 1.1.1 1.7.1 6.1 0 11-3.9 11-8.8S18.1 4 12 4z"/>
                      </svg>
                   </button>
                </div>
             </div>
             
             {/* 7. 작성자/병마장 소개 */}
             <div className="bg-white border-y border-gray-200 py-10 md:py-12 mb-16 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
               <div className="w-20 h-20 bg-[#102B4E] text-white rounded-full flex items-center justify-center font-bold text-[24px] shrink-0">
                 병
               </div>
               <div className="flex-1">
                 <h3 className="text-[20px] font-bold text-gray-900 mb-3 tracking-tight">병마장은 병원의 디지털 자산을 만듭니다</h3>
                 <p className="text-[15px] text-gray-600 mb-6 leading-relaxed font-medium">
                   검색, AI, 영상과 커뮤니티를 연결해<br className="md:hidden" /> 환자가 병원을 발견하고 신뢰하는 구조를 설계합니다.
                 </p>
                 <Link to="/about" className="inline-flex h-[44px] items-center justify-center bg-white border border-gray-300 text-gray-700 font-bold px-6 rounded-[8px] hover:bg-gray-50 transition-colors text-[14px]">
                   병마장 소개 보기
                 </Link>
               </div>
             </div>

             {/* Prev/Next */}
             <div className="flex flex-col md:flex-row justify-between gap-4 mb-20">
               <Link to="#" className="flex-1 border border-gray-200 p-6 rounded-[16px] hover:border-[#102B4E] transition-colors group bg-white shadow-sm hover:shadow-md flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#102B4E]/5 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#102B4E]" />
                 </div>
                 <div className="overflow-hidden">
                    <span className="block text-gray-400 text-[12px] mb-1 font-bold">이전 글</span>
                    <span className="block font-bold text-[15px] text-gray-900 group-hover:text-[#102B4E] truncate">신환 문의를 2배 늘리는 홈페이지 구성 전략</span>
                 </div>
               </Link>
               <Link to="#" className="flex-1 border border-gray-200 p-6 rounded-[16px] hover:border-[#102B4E] transition-colors text-right group bg-white shadow-sm hover:shadow-md flex items-center justify-end gap-4">
                 <div className="overflow-hidden">
                    <span className="block text-gray-400 text-[12px] mb-1 font-bold">다음 글</span>
                    <span className="block font-bold text-[15px] text-gray-900 group-hover:text-[#102B4E] truncate">맘카페 여론 관리, 어떻게 시작해야 할까?</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-[#102B4E]/5 transition-colors">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#102B4E]" />
                 </div>
               </Link>
             </div>

             {/* Related Posts */}
             <div className="mb-20">
               <h3 className="text-[22px] font-bold text-gray-900 mb-8">비슷한 주제의 글</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Related Post 1 */}
                  <Link to="#" className="group flex flex-col bg-white border border-gray-200 rounded-[16px] overflow-hidden hover:shadow-md transition-all">
                     <div className="aspect-[1.6/1] bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1523726495923-2082725c1598?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="관련글" />
                     </div>
                     <div className="p-5">
                        <span className="text-[11px] font-bold text-[#102B4E] mb-2 block">SEO·GEO</span>
                        <h4 className="font-bold text-[16px] text-gray-900 line-clamp-2 leading-[1.4] group-hover:text-[#102B4E] transition-colors">동네 상권을 장악하는 세부 키워드 전략</h4>
                     </div>
                  </Link>
                  {/* Related Post 2 */}
                  <Link to="#" className="group flex flex-col bg-white border border-gray-200 rounded-[16px] overflow-hidden hover:shadow-md transition-all">
                     <div className="aspect-[1.6/1] bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="관련글" />
                     </div>
                     <div className="p-5">
                        <span className="text-[11px] font-bold text-[#102B4E] mb-2 block">SEO·GEO</span>
                        <h4 className="font-bold text-[16px] text-gray-900 line-clamp-2 leading-[1.4] group-hover:text-[#102B4E] transition-colors">네이버 플레이스 최적화, 2024년 변경된 로직 분석</h4>
                     </div>
                  </Link>
                  {/* Related Post 3 */}
                  <Link to="#" className="group flex flex-col bg-white border border-gray-200 rounded-[16px] overflow-hidden hover:shadow-md transition-all">
                     <div className="aspect-[1.6/1] bg-gray-100 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="관련글" />
                     </div>
                     <div className="p-5">
                        <span className="text-[11px] font-bold text-[#102B4E] mb-2 block">커뮤니티</span>
                        <h4 className="font-bold text-[16px] text-gray-900 line-clamp-2 leading-[1.4] group-hover:text-[#102B4E] transition-colors">카페 커뮤니티로 신규 환자 유입 300% 증가한 사례</h4>
                     </div>
                  </Link>
               </div>
             </div>

             {/* Categories */}
             <div className="mb-20">
               <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                 {['전체 콘텐츠', 'SEO·GEO', 'AI 검색', '병원 영상', '커뮤니티', '지역 키워드', '성공 사례'].map(cat => (
                   <Link to="/blog" key={cat} className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-bold rounded-full text-[13px] hover:bg-white hover:border-[#102B4E] hover:text-[#102B4E] transition-colors">
                      {cat}
                   </Link>
                 ))}
               </div>
             </div>

             {/* Final CTA */}
             <div className="w-full bg-[#102B4E] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-[#1A3F6F]">
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
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 4C5.9 4 1 7.9 1 12.8c0 3.2 2 6.1 5.2 7.7-.2.6-1 3.2-1 3.4 0 .3.4.4.6.3 1.2-.8 3.5-2.4 4.5-3.1.5.1 1.1.1 1.7.1 6.1 0 11-3.9 11-8.8S18.1 4 12 4z"/>
                      </svg>
                      카카오톡 문의
                   </a>
                </div>
             </div>

          </div>
        </main>
        
        {/* PC Sidebar TOC */}
        <aside className="hidden lg:block w-[260px] shrink-0 sticky top-[100px] h-fit">
           <div className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm">
              <h3 className="text-[15px] font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100 flex items-center gap-2">
                 <div className="w-1.5 h-4 bg-[#102B4E] rounded-full"></div>
                 목차
              </h3>
              <ul className="flex flex-col gap-3 text-[14px] font-medium text-gray-500">
                 <li>
                    <a href="#section-1" className="text-[#102B4E] font-bold block leading-[1.4]">
                       1. 검색 결과만으로 환자가 오지 않는 이유
                    </a>
                 </li>
                 <li>
                    <a href="#section-2" className="hover:text-[#102B4E] transition-colors block leading-[1.4]">
                       2. 환자의 실제 검색 여정 분석
                    </a>
                 </li>
                 <li>
                    <a href="#section-3" className="hover:text-[#102B4E] transition-colors block leading-[1.4]">
                       3. 디지털 자산을 구축해야 하는 진짜 이유
                    </a>
                 </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <div className="text-[12px] font-bold text-gray-400 mb-2">공유하기</div>
                 <div className="flex gap-2">
                   <button className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#102B4E] hover:text-white hover:border-[#102B4E] transition-colors shadow-sm">
                     <LinkIcon className="w-4 h-4" />
                   </button>
                   <button className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#102B4E] hover:text-white hover:border-[#102B4E] transition-colors shadow-sm">
                     <Share2 className="w-4 h-4" />
                   </button>
                 </div>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}
