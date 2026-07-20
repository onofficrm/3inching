import React, { useState } from "react";
import { MessageCircle, Search, PlayCircle, MapPin, ArrowRight, ChevronDown, Check, ArrowRightCircle } from "lucide-react";
import { cn } from "../lib/utils";

export function ServicesPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. 페이지 상단 */}
      <section className="w-full pt-16 md:pt-24 pb-20 md:pb-24 flex justify-center bg-[#102B4E] text-white relative overflow-hidden border-b border-gray-100">
        {/* Background Decor */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="grid-hero" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid-hero)" />
            </svg>
        </div>

        <div className="w-full max-w-[1240px] px-5 md:px-8 z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6 w-full lg:w-[50%]">
             <div className="self-start">
               <span className="inline-block py-1.5 px-3 bg-white/10 border border-white/20 text-white text-[12px] font-bold rounded mb-4 tracking-wider">
                 BMAJANG SERVICES
               </span>
             </div>
             <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-[800] leading-tight tracking-tight">
                환자가 병원을 발견하고,<br />
                신뢰하고, 찾아오는<br />
                전 과정을 설계합니다
             </h1>
             <p className="text-[16px] md:text-[18px] text-white/80 leading-relaxed font-medium max-w-lg mt-2">
                검색, AI, 영상, 커뮤니티와 지역 키워드는 각각의 상품이 아니라 하나의 환자 유입 시스템으로 연결됩니다.
             </p>
          </div>
          
          {/* Right Diagram (4 Services) */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
             <div className="bg-[#1A3F6F] p-8 rounded-[16px] border border-white/10 shadow-xl w-full max-w-[500px]">
                <div className="grid grid-cols-2 gap-4 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#102B4E] border border-white/10 z-10 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                   </div>
                   
                   <div className="bg-[#102B4E]/50 p-5 rounded-lg border border-white/5 flex flex-col items-center text-center">
                     <Search className="w-6 h-6 text-blue-400 mb-3" />
                     <span className="text-[15px] font-bold text-white">SEO·GEO</span>
                   </div>
                   <div className="bg-[#102B4E]/50 p-5 rounded-lg border border-white/5 flex flex-col items-center text-center">
                     <PlayCircle className="w-6 h-6 text-red-400 mb-3" />
                     <span className="text-[15px] font-bold text-white">미디어</span>
                   </div>
                   <div className="bg-[#102B4E]/50 p-5 rounded-lg border border-white/5 flex flex-col items-center text-center">
                     <MapPin className="w-6 h-6 text-green-400 mb-3" />
                     <span className="text-[15px] font-bold text-white">지역 키워드</span>
                   </div>
                   <div className="bg-[#102B4E]/50 p-5 rounded-lg border border-white/5 flex flex-col items-center text-center">
                     <MessageCircle className="w-6 h-6 text-orange-400 mb-3" />
                     <span className="text-[15px] font-bold text-white">커뮤니티</span>
                   </div>
                </div>
                <div className="mt-6 text-center text-[13px] text-white/60 font-medium">
                   단일 상품이 아닌 유기적인 환자 유입 시스템
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. 전체 서비스 구조 (환자 여정) */}
      <section className="w-full py-24 flex justify-center bg-[#FAFAFA] border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main tracking-tight mb-4">환자의 결정 여정</h2>
               <p className="text-[16px] md:text-[18px] text-text-sub font-medium">환자가 병원을 선택하는 4단계 흐름을 모두 커버합니다.</p>
            </div>

            {/* Desktop Horizontal Journey */}
            <div className="hidden md:flex justify-between items-start relative max-w-[1000px] mx-auto">
               <div className="absolute top-[48px] left-10 right-10 h-0.5 bg-border z-0"></div>
               
               {[
                 { step: "1단계", title: "발견", service: "SEO·GEO 및 지역 키워드", icon: Search },
                 { step: "2단계", title: "관심", service: "영상 콘텐츠", icon: PlayCircle },
                 { step: "3단계", title: "신뢰", service: "병원 커뮤니티", icon: MessageCircle },
                 { step: "4단계", title: "상담과 방문", service: "문의·예약 연결", icon: Check }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center w-56 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white border-[3px] border-[#102B4E]/10 flex items-center justify-center text-[#102B4E] shadow-sm mb-6">
                       <item.icon className="w-8 h-8" />
                    </div>
                    <span className="text-[13px] font-bold text-primary mb-1 uppercase tracking-wider">{item.step}</span>
                    <h3 className="text-[20px] font-bold text-text-main mb-2">{item.title}</h3>
                    <div className="bg-white border border-gray-100 px-4 py-2 rounded-full text-[13px] font-medium text-text-sub shadow-sm">
                       {item.service}
                    </div>
                 </div>
               ))}
            </div>

            {/* Mobile Vertical Journey */}
            <div className="md:hidden flex flex-col relative pl-6">
               <div className="absolute top-8 bottom-8 left-[44px] w-0.5 bg-border z-0"></div>
               
               {[
                 { step: "1단계", title: "발견", service: "SEO·GEO 및 지역 키워드", icon: Search },
                 { step: "2단계", title: "관심", service: "영상 콘텐츠", icon: PlayCircle },
                 { step: "3단계", title: "신뢰", service: "병원 커뮤니티", icon: MessageCircle },
                 { step: "4단계", title: "상담과 방문", service: "문의·예약 연결", icon: Check }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-start gap-6 mb-12 last:mb-0 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#102B4E]/10 flex items-center justify-center text-[#102B4E] shadow-sm shrink-0">
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div className="pt-1">
                       <span className="text-[12px] font-bold text-primary mb-1 block uppercase tracking-wider">{item.step}</span>
                       <h3 className="text-[18px] font-bold text-text-main mb-2">{item.title}</h3>
                       <div className="inline-block bg-white border border-gray-100 px-3 py-1.5 rounded-md text-[13px] font-medium text-text-sub shadow-sm">
                          {item.service}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. SEO·GEO 상세 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-white border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
               <div className="w-12 h-12 bg-[#1A3F6F]/10 rounded-[12px] flex items-center justify-center mb-6 text-[#1A3F6F]">
                  <Search className="w-6 h-6" />
               </div>
               <span className="text-[#102B4E] font-bold text-[14px] mb-3 uppercase tracking-wider">Service 01. SEO·GEO</span>
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main leading-tight mb-6">
                  네이버와 AI가<br/>함께 추천하는 병원
               </h2>
               
               <div className="flex flex-col gap-3 mb-10 w-full">
                  {["네이버 웹영역 노출", "지역·증상 키워드 대응", "AI 검색 답변 대응", "검색 콘텐츠 구조", "병원 디지털 자산 구축"].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-[16px] text-text-main font-medium">{item}</span>
                     </div>
                  ))}
               </div>

               <div className="bg-[#FAFAFA] p-6 rounded-[12px] border border-gray-100 w-full">
                  <h4 className="text-[14px] font-bold text-text-sub mb-3">추천 대상</h4>
                  <ul className="flex flex-col gap-2">
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 검색에 병원이 나오지 않는 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> AI 검색 대응이 필요한 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 장기적인 검색 기반을 만들고 싶은 경우</li>
                  </ul>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="bg-gray-100 rounded-[20px] p-4 md:p-8 relative">
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800" alt="SEO 및 AI 노출 화면" className="rounded-[12px] shadow-lg border border-gray-100 relative z-10" />
                  <div className="absolute top-12 -left-6 bg-white px-4 py-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 hidden md:flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     <span className="text-[14px] font-bold">AI 첫 번째 추천 확보</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. 미디어 상세 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-[#FAFAFA] border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8 flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
               <div className="w-12 h-12 bg-red-500/10 rounded-[12px] flex items-center justify-center mb-6 text-red-600">
                  <PlayCircle className="w-6 h-6" />
               </div>
               <span className="text-[#102B4E] font-bold text-[14px] mb-3 uppercase tracking-wider">Service 02. MEDIA</span>
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main leading-tight mb-6">
                  조회수가 아니라,<br/>환자를 움직이는 영상
               </h2>
               
               <div className="flex flex-col gap-3 mb-10 w-full">
                  {["환자가 궁금해하는 콘텐츠 기획", "유튜브·틱톡·인스타그램 발행", "댓글과 문의 연결", "장거리 환자 유입", "반복 활용 가능한 영상 자산"].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-red-600 shrink-0" />
                        <span className="text-[16px] text-text-main font-medium">{item}</span>
                     </div>
                  ))}
               </div>

               <div className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-sm w-full">
                  <h4 className="text-[14px] font-bold text-text-sub mb-3">추천 대상</h4>
                  <ul className="flex flex-col gap-2">
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 병원을 빠르게 알려야 하는 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 영상을 제작하지만 문의가 없는 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 원장의 전문성을 콘텐츠로 보여주고 싶은 경우</li>
                  </ul>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="bg-gray-100 rounded-[20px] p-4 md:p-8 relative">
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" alt="미디어 노출 화면" className="rounded-[12px] shadow-lg border border-gray-100 relative z-10" />
                  <div className="absolute bottom-12 -right-6 bg-white px-4 py-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 hidden md:flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-red-500"></div>
                     <span className="text-[14px] font-bold">실제 예약 문의 150건+</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. 커뮤니티 상세 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-white border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
               <div className="w-12 h-12 bg-orange-500/10 rounded-[12px] flex items-center justify-center mb-6 text-orange-600">
                  <MessageCircle className="w-6 h-6" />
               </div>
               <span className="text-[#102B4E] font-bold text-[14px] mb-3 uppercase tracking-wider">Service 03. COMMUNITY</span>
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main leading-tight mb-6">
                  원장이 직접 답하는 공간은<br/>광고로 보이지 않습니다
               </h2>
               
               <div className="flex flex-col gap-3 mb-10 w-full">
                  {["질환 중심 커뮤니티 구축", "원장 직접 답변", "상담과 예약 연결", "후기 축적", "네이버 관련 경험 카페글 노출"].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-orange-600 shrink-0" />
                        <span className="text-[16px] text-text-main font-medium">{item}</span>
                     </div>
                  ))}
               </div>

               <div className="bg-[#FAFAFA] p-6 rounded-[12px] border border-gray-100 w-full">
                  <h4 className="text-[14px] font-bold text-text-sub mb-3">추천 대상</h4>
                  <ul className="flex flex-col gap-2">
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 환자 신뢰가 부족한 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 후기와 재방문 기반이 필요한 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 장기적인 환자 관계를 만들고 싶은 경우</li>
                  </ul>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="bg-gray-100 rounded-[20px] p-4 md:p-8 relative">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="커뮤니티 활동 화면" className="rounded-[12px] shadow-lg border border-gray-100 relative z-10" />
                  <div className="absolute top-12 -left-6 bg-white px-4 py-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 hidden md:flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">원장</div>
                     <div className="flex flex-col">
                        <span className="text-[13px] font-bold">직접 소통을 통한 신뢰 확보</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. 병원 중심 키워드 상세 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-[#FAFAFA] border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8 flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2 flex flex-col items-start">
               <div className="w-12 h-12 bg-green-500/10 rounded-[12px] flex items-center justify-center mb-6 text-green-600">
                  <MapPin className="w-6 h-6" />
               </div>
               <span className="text-[#102B4E] font-bold text-[14px] mb-3 uppercase tracking-wider">Service 04. GEO KEYWORD</span>
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main leading-tight mb-6">
                  병원 주변의 모든 검색어를<br/>병원의 진입 경로로 만듭니다
               </h2>
               
               <div className="flex flex-col gap-3 mb-10 w-full">
                  {["동 단위 키워드", "지하철역 키워드", "지역명 키워드", "진료 증상 키워드", "월 100건~500건 이상 협의", "단독 운영 가능"].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-[16px] text-text-main font-medium">{item}</span>
                     </div>
                  ))}
               </div>

               <div className="bg-white p-6 rounded-[12px] border border-gray-100 shadow-sm w-full">
                  <h4 className="text-[14px] font-bold text-text-sub mb-3">추천 대상</h4>
                  <ul className="flex flex-col gap-2">
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 지역 검색 범위를 빠르게 넓히려는 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> 서브키워드 노출이 부족한 경우</li>
                     <li className="text-[14px] text-text-main flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> SEO를 단계적으로 시작하려는 경우</li>
                  </ul>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="bg-gray-100 rounded-[20px] p-4 md:p-8 relative">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="지역 키워드 노출 화면" className="rounded-[12px] shadow-lg border border-gray-100 relative z-10" />
                  <div className="absolute bottom-12 -right-6 bg-white px-4 py-3 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-20 hidden md:flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span className="text-[14px] font-bold">50+ 세부 지역 키워드 점유</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 7. 서비스 연결 다이어그램 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-[#102B4E] text-white border-b border-[#1A3F6F]">
         <div className="w-full max-w-[1240px] px-5 md:px-8 text-center">
            <h2 className="text-[28px] md:text-[36px] font-bold mb-4">서비스의 유기적 연결</h2>
            <p className="text-[16px] md:text-[18px] text-white/80 font-medium mb-16">
               각각의 서비스는 독립적으로 끝나지 않고, 다음 단계의 성과를 극대화합니다.
            </p>

            <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
               <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center font-bold">
                  지역·검색 노출
               </div>
               <ArrowRight className="w-5 h-5 text-white/40 hidden md:block" />
               <div className="w-px h-6 bg-white/20 md:hidden"></div>
               
               <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center font-bold">
                  영상으로 관심 유도
               </div>
               <ArrowRight className="w-5 h-5 text-white/40 hidden md:block" />
               <div className="w-px h-6 bg-white/20 md:hidden"></div>

               <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center font-bold">
                  커뮤니티에서 신뢰 형성
               </div>
            </div>
            
            <div className="flex flex-col items-center mt-6 mb-6">
               <div className="w-px h-10 bg-white/20 hidden md:block"></div>
               <ArrowRight className="w-5 h-5 text-white/40 transform rotate-90 md:block hidden my-2" />
               
               <div className="w-px h-6 bg-white/20 md:hidden"></div>
            </div>

            <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
               <div className="bg-[#FEE500] text-[#371D1E] rounded-lg px-8 py-4 flex items-center justify-center font-[900] text-[18px] shadow-lg">
                  상담·예약
               </div>
               <ArrowRight className="w-5 h-5 text-white/40 hidden md:block" />
               <div className="w-px h-6 bg-white/20 md:hidden"></div>
               
               <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center font-bold">
                  후기 축적
               </div>
               <ArrowRight className="w-5 h-5 text-white/40 hidden md:block" />
               <div className="w-px h-6 bg-white/20 md:hidden"></div>

               <div className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 flex items-center justify-center font-bold text-blue-300">
                  검색과 AI 신뢰 강화
               </div>
            </div>
         </div>
      </section>

      {/* 8. 진행 절차 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-white border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main tracking-tight">협업 진행 절차</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
               <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>
               
               {[
                 { no: "01", title: "현재 상태 상담", desc: "진료과목, 목표, 현재의 문제점 파악" },
                 { no: "02", title: "지역·진료과목 중복 확인", desc: "단독 운영을 위한 지역 상권 분석" },
                 { no: "03", title: "우선 적용 서비스 결정", desc: "예산과 상황에 맞는 맞춤형 전략 수립" },
                 { no: "04", title: "콘텐츠 및 채널 운영", desc: "전담팀 배정 및 콘텐츠 제작 시작" },
                 { no: "05", title: "결과 확인과 단계적 확장", desc: "주요 키워드 장악 후 다음 채널로 확장" }
               ].map((item, idx) => (
                 <div key={idx} className="flex flex-col items-center text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#102B4E] text-[#102B4E] font-bold text-[18px] flex items-center justify-center mb-6 shadow-sm">
                       {item.no}
                    </div>
                    <h4 className="text-[18px] font-bold text-text-main mb-3">{item.title}</h4>
                    <p className="text-[14px] text-text-sub font-medium leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 9. 자주 묻는 질문 */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-[#FAFAFA] border-b border-gray-100">
         <div className="w-full max-w-[800px] px-5 md:px-8">
            <div className="text-center mb-16">
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main tracking-tight">자주 묻는 질문</h2>
            </div>

            <div className="flex flex-col gap-4">
               <FaqItem 
                 q="네 가지 상품을 모두 시작해야 하나요?" 
                 a="아닙니다. 병원의 현재 상태와 예산, 목표에 따라 가장 효과적인 1~2가지 서비스부터 시작하여 단계적으로 확장하는 것을 권장합니다."
               />
               <FaqItem 
                 q="지역 키워드 상품만 신청할 수 있나요?" 
                 a="네, 가능합니다. 초기 진입 장벽을 낮추고 단기간에 지역 내 검색 노출량을 늘리고 싶다면 지역 키워드 상품을 단독으로 시작하실 수 있습니다."
               />
               <FaqItem 
                 q="얼마 동안 운영해야 하나요?" 
                 a="디지털 자산이 검색 결과에 안정적으로 정착하고 환자의 인지를 거쳐 실제 방문으로 이어지기까지 최소 3개월 이상의 연속적인 운영을 권장합니다."
               />
               <FaqItem 
                 q="병원명과 환자 정보는 어떻게 보호하나요?" 
                 a="병마장은 의료법을 철저히 준수합니다. 외부로 공개되는 포트폴리오나 성공 사례에서는 클라이언트의 병원명과 지역, 환자의 개인정보를 엄격하게 비공개 처리합니다."
               />
               <FaqItem 
                 q="기존 블로그나 유튜브가 있어도 가능한가요?" 
                 a="네, 기존 채널의 상태를 진단한 후 이를 기반으로 활성화하거나, 필요에 따라 병마장이 구축한 최적화 채널과 연계하여 노출 효과를 높이는 방향으로 설계합니다."
               />
               <FaqItem 
                 q="같은 지역의 경쟁 병원도 함께 진행하나요?" 
                 a="진행하지 않습니다. 검색 결과 노출 독점을 위해 동일 상권(동, 지역구 단위) 내 동일 진료과목은 원칙적으로 단 한 곳의 병원만 계약하여 관리합니다."
               />
            </div>
         </div>
      </section>

      {/* 10. 최종 CTA */}
      <section className="w-full py-24 md:py-32 flex justify-center bg-[#102B4E] text-white">
         <div className="w-full max-w-[800px] px-5 md:px-8 text-center">
            <h2 className="text-[32px] md:text-[44px] font-[800] mb-6 !leading-tight text-white tracking-tight">
               병원마다 시작점은 다릅니다
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/80 font-medium mb-12">
               현재 상황과 목표를 알려주시면<br/>무엇부터 시작해야 하는지 함께 정합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="/contact" className="flex items-center justify-center gap-2 h-[56px] px-8 bg-white text-[#102B4E] font-bold text-[16px] rounded-[8px] hover:bg-gray-100 transition-colors shadow-sm">
                  서비스 상담 신청
               </a>
               <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-[56px] px-8 bg-[#FEE500] text-[#371D1E] font-bold text-[16px] rounded-[8px] hover:bg-[#FEE500]/90 transition-colors shadow-sm">
                  <MessageCircle className="w-5 h-5" fill="#371D1E" />
                  카카오톡 문의
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-[12px] overflow-hidden">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
       >
         <span className="text-[16px] md:text-[17px] font-bold text-text-main pr-8">{q}</span>
         <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0", isOpen && "transform rotate-180")} />
       </button>
       {isOpen && (
         <div className="px-6 pb-6 pt-1">
           <p className="text-[15px] text-text-sub leading-relaxed">{a}</p>
         </div>
       )}
    </div>
  );
}
