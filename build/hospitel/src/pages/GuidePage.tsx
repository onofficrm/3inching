import React, { useState } from "react";
import { MessageCircle, Check, ArrowRight, Info, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

const QUESTIONS = [
  "네이버에서 병원명이 아닌 증상과 지역명으로 검색하면 나오지 않는다.",
  "AI 검색에서 병원이 추천되지 않는다.",
  "영상은 올리고 있지만 문의가 없다.",
  "환자가 병원을 처음 보고 신뢰하기 어렵다.",
  "후기와 커뮤니티가 쌓이지 않는다.",
  "주변 동과 지하철역 검색 노출이 부족하다.",
  "어떤 마케팅부터 시작해야 할지 모르겠다.",
];

const COMPARISON_DATA = [
  { label: "주요 목적", s1: "네이버 및 AI 검색 추천", s2: "영상 콘텐츠 통한 유입 유도", s3: "환자와의 소통 및 신뢰 구축", s4: "세부 지역 및 증상 검색 장악" },
  { label: "적용 채널", s1: "웹사이트, 네이버, AI 검색", s2: "유튜브, 인스타그램, 틱톡", s3: "네이버 카페, 커뮤니티", s4: "네이버 플레이스, 블로그" },
  { label: "해결하는 문제", s1: "온라인 검색 시 병원 미노출", s2: "조회수는 높으나 전환 부재", s3: "방문 전 환자의 의구심", s4: "경쟁이 치열한 메인 키워드" },
  { label: "추천 상황", s1: "기본적인 검색 기반이 없을 때", s2: "빠른 인지도 확산이 필요할 때", s3: "후기와 재방문율을 높이고 싶을 때", s4: "주변 상권부터 확실히 잡고 싶을 때" },
  { label: "단독 운영 가능 여부", s1: "가능", s2: "가능", s3: "가능", s4: "가능" },
  { label: "다른 서비스와의 연결", s1: "기반 구축 후 미디어/커뮤니티 연계", s2: "관심 환자를 커뮤니티로 안내", s3: "모든 검색 유입의 최종 신뢰 장치", s4: "SEO 확장의 첫 단계로 활용" },
];

export function GuidePage() {
  const [selectedChecks, setSelectedChecks] = useState<number[]>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleCheck = (idx: number) => {
    if (selectedChecks.includes(idx)) {
      setSelectedChecks(selectedChecks.filter(i => i !== idx));
    } else {
      setSelectedChecks([...selectedChecks, idx]);
    }
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. 페이지 상단 */}
      <section className="w-full pt-20 md:pt-28 pb-16 md:pb-24 flex justify-center bg-[#F7F9FC] border-b border-border">
        <div className="w-full max-w-[1000px] px-5 md:px-8 text-center flex flex-col items-center">
            <span className="inline-block py-1.5 px-3 bg-[#102B4E]/10 border border-[#102B4E]/20 text-[#102B4E] text-[12px] font-bold rounded mb-6 tracking-wider">
               SERVICE GUIDE
            </span>
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-[800] leading-tight tracking-tight text-[#102B4E] mb-6">
               우리 병원은<br/>무엇부터 시작해야 할까요?
            </h1>
            <p className="text-[16px] md:text-[18px] text-text-sub font-medium max-w-2xl leading-relaxed">
               병원의 현재 검색 상태, 인지도, 환자 신뢰도와 목표에 따라<br className="hidden md:block" />
               적합한 시작점이 달라집니다.
            </p>
        </div>
      </section>

      {/* 2. 빠른 자가진단 & 3. 진단 결과 디자인 */}
      <section className="w-full py-20 md:py-24 flex justify-center bg-white border-b border-border">
        <div className="w-full max-w-[1000px] px-5 md:px-8 flex flex-col items-center">
           <div className="text-center mb-12">
               <h2 className="text-[28px] md:text-[36px] font-bold text-text-main tracking-tight mb-4">현재 상황 진단하기</h2>
               <p className="text-text-sub font-medium">해당하는 항목을 모두 선택해 보세요.</p>
           </div>

           <div className="w-full max-w-[700px] flex flex-col gap-3 mb-16">
              {QUESTIONS.map((q, idx) => {
                 const isSelected = selectedChecks.includes(idx);
                 return (
                    <button
                       key={idx}
                       onClick={() => toggleCheck(idx)}
                       className={cn(
                          "flex items-center text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer",
                          isSelected ? "border-[#102B4E] bg-[#102B4E]/5" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                       )}
                    >
                       <div className={cn(
                          "w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mr-4 transition-colors",
                          isSelected ? "bg-[#102B4E] border-[#102B4E] text-white" : "border-gray-300 bg-white text-transparent"
                       )}>
                          <Check className="w-4 h-4" />
                       </div>
                       <span className={cn(
                          "font-bold text-[15px] md:text-[16px]",
                          isSelected ? "text-[#102B4E]" : "text-gray-600"
                       )}>{q}</span>
                    </button>
                 );
              })}
           </div>

           {/* 결과 카드 UI (UI Preview Only) */}
           <div className="w-full relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#102B4E] text-white text-[12px] font-bold px-4 py-1.5 rounded-full z-10 shadow-md">
                 진단 결과 프리뷰
              </div>
              <div className="bg-white border-2 border-[#102B4E] rounded-2xl p-6 md:p-10 shadow-xl w-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#102B4E]/5 rounded-bl-[100px] z-0"></div>
                 
                 <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 mb-8">
                       <div>
                          <h3 className="text-[14px] font-bold text-[#1A3F6F] uppercase tracking-wider mb-2">추천 시작점</h3>
                          <div className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight">
                             SEO·GEO + 지역 키워드 전략
                          </div>
                       </div>
                       <div className="mt-4 md:mt-0 flex gap-2">
                          <span className="px-3 py-1 bg-[#102B4E]/10 text-[#102B4E] font-bold rounded-lg text-[13px]"># 01</span>
                          <span className="px-3 py-1 bg-[#102B4E]/10 text-[#102B4E] font-bold rounded-lg text-[13px]"># 04</span>
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                       <div>
                          <div className="flex items-center gap-2 mb-3">
                             <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <Info className="w-4 h-4" />
                             </div>
                             <h4 className="text-[15px] font-bold text-gray-800">추천 이유</h4>
                          </div>
                          <p className="text-gray-600 font-medium text-[15px] leading-relaxed pl-8">
                             현재 검색 기반이 부족하기 때문에 네이버와 AI 노출 구조를 먼저 만드는 것이 가장 시급합니다.
                          </p>
                       </div>
                       <div>
                          <div className="flex items-center gap-2 mb-3">
                             <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4" />
                             </div>
                             <h4 className="text-[15px] font-bold text-gray-800">예상 역할 및 다음 단계</h4>
                          </div>
                          <p className="text-gray-600 font-medium text-[15px] leading-relaxed pl-8">
                             검색 기반이 갖춰지면 환자의 관심이 유입되기 시작하며, 이후 미디어와 커뮤니티를 연결하여 신뢰를 강화할 수 있습니다.
                          </p>
                       </div>
                    </div>

                    <div className="flex justify-end">
                       <button className="bg-gray-900 text-white px-6 py-3.5 rounded-lg font-bold text-[15px] hover:bg-black transition-colors shadow-sm">
                          이 조합으로 상담하기
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. 4개 상품 비교 */}
      <section className="w-full py-20 md:py-24 flex justify-center bg-[#F7F9FC] border-b border-border">
         <div className="w-full max-w-[1240px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[28px] md:text-[36px] font-bold text-text-main tracking-tight mb-4">서비스 한눈에 비교하기</h2>
               <p className="text-text-sub font-medium">각 서비스의 특징과 목적을 비교하여 확인해보세요.</p>
            </div>

            {/* PC: Table */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr>
                        <th className="py-6 px-6 bg-gray-50 border-b-2 border-gray-200 font-bold text-gray-500 w-[15%]">비교 항목</th>
                        <th className="py-6 px-6 bg-white border-b-2 border-[#102B4E] font-bold text-[#102B4E] text-[18px]">01. SEO·GEO</th>
                        <th className="py-6 px-6 bg-white border-b-2 border-[#102B4E] font-bold text-[#102B4E] text-[18px]">02. 미디어</th>
                        <th className="py-6 px-6 bg-white border-b-2 border-[#102B4E] font-bold text-[#102B4E] text-[18px]">03. 커뮤니티</th>
                        <th className="py-6 px-6 bg-white border-b-2 border-[#102B4E] font-bold text-[#102B4E] text-[18px]">04. 병원 중심 키워드</th>
                     </tr>
                  </thead>
                  <tbody>
                     {COMPARISON_DATA.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                           <td className="py-5 px-6 font-bold text-gray-700 bg-gray-50">{row.label}</td>
                           <td className="py-5 px-6 font-medium text-gray-700">{row.s1}</td>
                           <td className="py-5 px-6 font-medium text-gray-700">{row.s2}</td>
                           <td className="py-5 px-6 font-medium text-gray-700">{row.s3}</td>
                           <td className="py-5 px-6 font-medium text-gray-700">{row.s4}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Mobile/Tablet: Accordion */}
            <div className="lg:hidden flex flex-col gap-4">
               {["01. SEO·GEO", "02. 미디어", "03. 커뮤니티", "04. 병원 중심 키워드"].map((title, serviceIdx) => (
                  <div key={serviceIdx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                     <button 
                        onClick={() => setOpenAccordion(openAccordion === serviceIdx ? null : serviceIdx)}
                        className="w-full px-5 py-4 flex items-center justify-between font-bold text-[16px] text-[#102B4E] bg-gray-50/50"
                     >
                        {title}
                        <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300", openAccordion === serviceIdx && "transform rotate-180")} />
                     </button>
                     {openAccordion === serviceIdx && (
                        <div className="px-5 py-4 flex flex-col gap-4">
                           {COMPARISON_DATA.map((row, idx) => {
                              const value = serviceIdx === 0 ? row.s1 : serviceIdx === 1 ? row.s2 : serviceIdx === 2 ? row.s3 : row.s4;
                              return (
                                 <div key={idx}>
                                    <h5 className="text-[12px] font-bold text-gray-400 mb-1">{row.label}</h5>
                                    <p className="text-[14px] font-medium text-gray-800">{value}</p>
                                 </div>
                              )
                           })}
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. 상황별 추천표 */}
      <section className="w-full py-20 md:py-24 flex justify-center bg-white border-b border-border">
         <div className="w-full max-w-[1000px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[28px] md:text-[36px] font-bold text-text-main tracking-tight mb-4">상황별 추천 조합</h2>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
               <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_200px] items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="font-bold text-gray-500 text-[14px]">나의 상황</div>
                  <div className="font-bold text-gray-500 text-[14px] text-right md:text-center">추천 상품</div>
               </div>
               
               {[
                  { situation: "검색에 아무것도 안 뜬다", rec: "1 + 4" },
                  { situation: "AI가 목적이지만 SEO도 함께 가져가고 싶다", rec: "1" },
                  { situation: "병원을 알리는 것이 급하다", rec: "2 + 4" },
                  { situation: "환자 신뢰와 재방문이 약하다", rec: "3 + 4" },
                  { situation: "검색과 신뢰를 동시에 잡고 싶다", rec: "1 + 3 + 4" },
                  { situation: "서브키워드 범위를 넓히고 싶다", rec: "4 추가" }
               ].map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_200px] items-center px-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                     <div className="font-bold text-[15px] md:text-[16px] text-gray-800 pr-4">{item.situation}</div>
                     <div className="font-bold text-[15px] md:text-[16px] text-[#102B4E] bg-[#102B4E]/10 px-4 py-2 rounded-lg text-right md:text-center whitespace-nowrap">
                        {item.rec}
                     </div>
                  </div>
               ))}
               <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_200px] items-center px-6 py-6 bg-[#CC2222]/5">
                  <div className="font-bold text-[16px] md:text-[18px] text-gray-900 pr-4">무엇을 해야 할지 모르겠다</div>
                  <div className="font-[900] text-[16px] md:text-[18px] text-[#CC2222] text-right md:text-center">
                     상담
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. 시작 방식 */}
      <section className="w-full py-20 md:py-24 flex justify-center bg-[#F7F9FC] border-b border-border">
         <div className="w-full max-w-[1240px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[28px] md:text-[36px] font-bold text-text-main tracking-tight">처음부터 모든 서비스를<br className="md:hidden" /> 시작할 필요는 없습니다</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative max-w-[1000px] mx-auto">
               <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>
               
               {[
                  { step: "1단계", title: "가장 시급한 문제부터 시작" },
                  { step: "2단계", title: "기반이 만들어지면 다른 채널 연결" },
                  { step: "3단계", title: "검색·영상·커뮤니티를 하나의 자산으로 확장" }
               ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm relative z-10 flex flex-col items-center text-center">
                     <div className="w-10 h-10 rounded-full bg-[#102B4E] text-white font-bold flex items-center justify-center text-[14px] mb-6">
                        {idx + 1}
                     </div>
                     <span className="text-[13px] font-bold text-[#1A3F6F] uppercase tracking-wider mb-2">{item.step}</span>
                     <h4 className="text-[18px] md:text-[20px] font-bold text-gray-900 leading-tight">{item.title}</h4>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. 독점 운영 안내 & 8. 상담 영역 */}
      <section className="w-full py-20 md:py-24 flex flex-col items-center bg-white">
         <div className="w-full max-w-[800px] px-5 md:px-8 mb-16">
            <div className="border-[3px] border-[#102B4E] rounded-[20px] p-8 md:p-10 text-center bg-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-[#102B4E]"></div>
               <h3 className="text-[22px] md:text-[28px] font-bold text-[#102B4E] mb-4 tracking-tight">
                  동일 지역·동일 진료과목은<br className="md:hidden" /> 한 곳만 진행합니다
               </h3>
               <p className="text-[16px] md:text-[18px] text-gray-700 font-medium">
                  상담 전 해당 지역과 진료과목의 진행 가능 여부를 먼저 확인합니다.
               </p>
            </div>
         </div>

         <div className="w-full max-w-[800px] px-5 md:px-8">
            <div className="bg-[#F7F9FC] border border-border rounded-[24px] p-6 md:p-10 shadow-sm">
               <div className="text-center mb-8">
                  <h3 className="text-[24px] md:text-[28px] font-bold text-gray-900 mb-2">진행 가능 여부 확인하기</h3>
                  <p className="text-gray-600 font-medium text-[15px]">간단한 정보를 남겨주시면 확인 후 빠르게 연락드리겠습니다.</p>
               </div>

               <div className="flex flex-col gap-5 mb-8">
                  <div className="grid md:grid-cols-2 gap-5">
                     <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-gray-700">병원 지역 (예: 강남구 역삼동)</label>
                        <input type="text" className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:border-[#102B4E] focus:ring-1 focus:ring-[#102B4E] transition-shadow text-[15px]" placeholder="구/동 단위로 입력해주세요" />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-gray-700">진료과목 (예: 피부과, 치과)</label>
                        <input type="text" className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:border-[#102B4E] focus:ring-1 focus:ring-[#102B4E] transition-shadow text-[15px]" placeholder="핵심 진료과목을 적어주세요" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-gray-700">현재 가장 큰 고민</label>
                     <input type="text" className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:border-[#102B4E] focus:ring-1 focus:ring-[#102B4E] transition-shadow text-[15px]" placeholder="예: 검색에 병원이 안 나옵니다" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[14px] font-bold text-gray-700">관심 서비스 (선택)</label>
                     <select className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-[10px] focus:outline-none focus:border-[#102B4E] focus:ring-1 focus:ring-[#102B4E] transition-shadow text-[15px] appearance-none cursor-pointer">
                        <option value="">아직 잘 모르겠습니다 (추천 희망)</option>
                        <option value="1">SEO·GEO + 지역 키워드</option>
                        <option value="2">영상 미디어 마케팅</option>
                        <option value="3">병원 커뮤니티 구축</option>
                        <option value="all">전체 패키지 상담</option>
                     </select>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-[#102B4E] text-white font-bold py-4 rounded-[10px] text-[16px] hover:bg-[#1A3F6F] transition-colors shadow-sm">
                     진행 가능 여부 확인
                  </button>
                  <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex-1 bg-[#FEE500] text-[#371D1E] font-bold py-4 rounded-[10px] text-[16px] flex items-center justify-center gap-2 hover:bg-[#FEE500]/90 transition-colors shadow-sm">
                     <MessageCircle className="w-5 h-5" fill="#371D1E" /> 카카오톡으로 문의
                  </a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
