import { ArrowRight, Maximize2, Search, PlayCircle, MessageCircle, MapPin, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import CountUp from "react-countup";
import { AIRecommend } from "../components/AIRecommend";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function MainPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* 2. 히어로 영역 & 3. 히어로 CTA */}
      <section className="w-full pt-20 md:pt-[110px] pb-24 flex justify-center bg-white relative overflow-hidden border-b border-gray-100">
        <div className="w-full max-w-[1240px] px-5 md:px-8 z-10 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer} 
            className="flex flex-col gap-8 w-full lg:w-[45%] order-2 lg:order-1"
          >
            <motion.div variants={fadeUpVariant}>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#B48752]"></span>
                <span className="text-[#0A192F] text-[13px] font-bold tracking-widest uppercase">실제 클라이언트 사례 기반</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] lg:text-[68px] font-[900] text-[#0A192F] leading-[1.15] tracking-tighter">
                환자가 제 발로<br />
                <span className="text-[#B48752]">찾아오는 시스템</span>
              </h1>
            </motion.div>
            
            <motion.div variants={fadeUpVariant} className="text-[#4B5563] text-[17px] md:text-[19px] leading-[1.7] font-medium">
              <p>
                네이버 검색, AI 추천, 영상, 커뮤니티를 하나의 구조로 연결해<br className="hidden md:block" />
                광고가 멈춰도 환자가 계속 찾아오는 병원의 <span className="font-bold text-[#0A192F]">디지털 자산</span>을 만듭니다.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-[#FAFAFA] border-l-[3px] border-[#B48752] p-6 rounded-r-[12px] shadow-sm">
              <p className="text-[#111827] font-medium text-[15px] md:text-[16px] leading-relaxed mb-2">
                전과 다르다는 걸 이미 느끼고 계셨을 겁니다.
              </p>
              <p className="text-[#111827] font-bold text-[16px] md:text-[17px]">
                그 어느 화면에도, <span className="text-[#B48752]">우리 병원은 없습니다.</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-[56px] flex items-center justify-center gap-2 rounded-[8px] bg-[#0A192F] text-[16px] font-bold text-white transition-all hover:bg-[#111827] hover:shadow-lg hover:-translate-y-0.5"
              >
                문의폼 작성하기
              </a>
              <a
                href="http://pf.kakao.com/_APxbgb/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-[56px] flex items-center justify-center gap-2 rounded-[8px] bg-[#FEE500] text-[#371D1E] text-[16px] font-bold transition-all hover:bg-[#FEE500]/90 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5" fill="#371D1E" />
                카카오톡 채널 문의
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[55%] order-1 lg:order-2 relative aspect-square md:aspect-[4/3] lg:aspect-square"
          >
             {/* Background Decor */}
             <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[80%] rounded-full bg-[#102B4E]/[0.03] blur-3xl absolute"></div>
                <svg width="100%" height="100%" className="absolute opacity-[0.03]">
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#102B4E" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
             </div>

             <div className="absolute inset-0 z-10 w-full h-full">
                {/* Image 1: Naver Search */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-[8%] left-[5%] w-[55%] h-[45%] bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden z-30 transition-transform hover:z-50 hover:scale-105 duration-300"
                >
                  <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#03C75A]"></span>
                     <span className="text-[11px] font-bold text-text-main">네이버 검색</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="네이버 검색" className="w-full h-full object-cover pt-8" />
                </motion.div>

                {/* Image 2: AI Recommendation */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute top-[20%] right-[5%] w-[45%] h-[40%] bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden z-40 transition-transform hover:z-50 hover:scale-105 duration-300"
                >
                  <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                     <span className="text-[11px] font-bold text-text-main">AI 추천</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600" alt="AI 추천" className="w-full h-full object-cover pt-8" />
                </motion.div>

                {/* Image 3: Video */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute bottom-[8%] left-[10%] w-[45%] h-[40%] bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden z-20 transition-transform hover:z-50 hover:scale-105 duration-300"
                >
                  <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500"></span>
                     <span className="text-[11px] font-bold text-text-main">영상 문의</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" alt="영상 문의" className="w-full h-full object-cover pt-8" />
                </motion.div>

                {/* Image 4: Community */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="absolute bottom-[15%] right-[10%] w-[45%] h-[35%] bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden z-50 transition-transform hover:z-50 hover:scale-105 duration-300"
                >
                  <div className="absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 py-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                     <span className="text-[11px] font-bold text-text-main">커뮤니티 신뢰</span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="커뮤니티 신뢰" className="w-full h-full object-cover pt-8" />
                </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* 4. 핵심 서비스 미리보기 */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={staggerContainer}
        className="w-full py-24 flex justify-center bg-[#FAFAFA] border-b border-gray-100"
      >
        <div className="w-full max-w-[1240px] px-5 md:px-8">
           <div className="flex justify-between items-end mb-12">
             <motion.h2 variants={fadeUpVariant} className="text-[28px] md:text-[36px] font-bold text-[#0A192F] tracking-tight">
               지속 가능한 병원 마케팅 구조
             </motion.h2>
             <Link to="/services" className="hidden md:flex items-center gap-1 text-[#4B5563] font-medium hover:text-[#0A192F] transition-colors">
               전체 서비스 보기 <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 01 */}
              <motion.div variants={fadeUpVariant}>
                <Link to="/blog" className="group flex flex-col h-full bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#102B4E]/30 transition-all duration-300">
                   <div className="p-8 pb-6 flex flex-col items-start border-b border-gray-50">
                      <div className="w-12 h-12 bg-[#FAFAFA] rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-[#102B4E] transition-colors duration-300">
                         <Search className="w-5 h-5 text-[#102B4E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[#B48752] font-bold text-[13px] mb-2 tracking-widest uppercase">01</span>
                      <h3 className="text-[22px] font-bold text-[#111827] mb-2 tracking-tight">SEO·GEO</h3>
                      <p className="text-[#4B5563] text-[15px] leading-relaxed line-clamp-2">네이버와 AI에서 발견되는 병원</p>
                   </div>
                   <div className="bg-gray-50 h-[140px] relative overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400" alt="SEO" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-5 flex items-center justify-between text-[#102B4E] font-bold text-[14px] mt-auto border-t border-gray-50">
                      자세히 보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              </motion.div>

              {/* Card 02 */}
              <motion.div variants={fadeUpVariant}>
                <Link to="/blog" className="group flex flex-col h-full bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#102B4E]/30 transition-all duration-300">
                   <div className="p-8 pb-6 flex flex-col items-start border-b border-gray-50">
                      <div className="w-12 h-12 bg-[#FAFAFA] rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-[#102B4E] transition-colors duration-300">
                         <PlayCircle className="w-5 h-5 text-[#102B4E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[#B48752] font-bold text-[13px] mb-2 tracking-widest uppercase">02</span>
                      <h3 className="text-[22px] font-bold text-[#111827] mb-2 tracking-tight">미디어</h3>
                      <p className="text-[#4B5563] text-[15px] leading-relaxed line-clamp-2">영상을 실제 문의와 예약으로 연결</p>
                   </div>
                   <div className="bg-gray-50 h-[140px] relative overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400" alt="Media" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-5 flex items-center justify-between text-[#102B4E] font-bold text-[14px] mt-auto border-t border-gray-50">
                      자세히 보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              </motion.div>

              {/* Card 03 */}
              <motion.div variants={fadeUpVariant}>
                <Link to="/blog" className="group flex flex-col h-full bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#102B4E]/30 transition-all duration-300">
                   <div className="p-8 pb-6 flex flex-col items-start border-b border-gray-50">
                      <div className="w-12 h-12 bg-[#FAFAFA] rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-[#102B4E] transition-colors duration-300">
                         <MessageCircle className="w-5 h-5 text-[#102B4E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[#B48752] font-bold text-[13px] mb-2 tracking-widest uppercase">03</span>
                      <h3 className="text-[22px] font-bold text-[#111827] mb-2 tracking-tight">커뮤니티</h3>
                      <p className="text-[#4B5563] text-[15px] leading-relaxed line-clamp-2">환자가 신뢰하고 머무는 공간</p>
                   </div>
                   <div className="bg-gray-50 h-[140px] relative overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400" alt="Community" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-5 flex items-center justify-between text-[#102B4E] font-bold text-[14px] mt-auto border-t border-gray-50">
                      자세히 보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              </motion.div>

              {/* Card 04 */}
              <motion.div variants={fadeUpVariant}>
                <Link to="/blog" className="group flex flex-col h-full bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#102B4E]/30 transition-all duration-300">
                   <div className="p-8 pb-6 flex flex-col items-start border-b border-gray-50">
                      <div className="w-12 h-12 bg-[#FAFAFA] rounded-[10px] flex items-center justify-center mb-6 group-hover:bg-[#102B4E] transition-colors duration-300">
                         <MapPin className="w-5 h-5 text-[#102B4E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-[#B48752] font-bold text-[13px] mb-2 tracking-widest uppercase">04</span>
                      <h3 className="text-[22px] font-bold text-[#111827] mb-2 tracking-tight">지역 키워드</h3>
                      <p className="text-[#4B5563] text-[15px] leading-relaxed line-clamp-2">병원 주변 검색 범위를 확장</p>
                   </div>
                   <div className="bg-gray-50 h-[140px] relative overflow-hidden flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=400" alt="GEO" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-5 flex items-center justify-between text-[#102B4E] font-bold text-[14px] mt-auto border-t border-gray-50">
                      자세히 보기 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              </motion.div>

           </div>
        </div>
      </motion.section>

      {/* 5. 문제 제기 영역 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-24 md:py-32 flex justify-center bg-white border-b border-gray-100"
      >
        <div className="w-full max-w-[1000px] px-5 md:px-8 text-center">
           <motion.h2 variants={fadeUpVariant} className="text-[32px] md:text-[42px] font-bold text-[#111827] mb-16 tracking-tight">
              지금까지의 병원 광고는 무엇을 남겼습니까?
           </motion.h2>

           <motion.div variants={fadeUpVariant} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left mb-24">
              <div className="bg-[#FAFAFA] border border-gray-100 p-8 md:p-10 rounded-[16px] flex items-start gap-4 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#E5E7EB] transition-all duration-300">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B48752] shrink-0"></div>
                 <p className="text-[17px] md:text-[18px] font-medium text-[#4B5563] leading-relaxed">
                    광고를 멈추면 노출도 멈춥니다.
                 </p>
              </div>
              <div className="bg-[#FAFAFA] border border-gray-100 p-8 md:p-10 rounded-[16px] flex items-start gap-4 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#E5E7EB] transition-all duration-300">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B48752] shrink-0"></div>
                 <p className="text-[17px] md:text-[18px] font-medium text-[#4B5563] leading-relaxed">
                    발주한 콘텐츠는 시간이 지나면 사라집니다.
                 </p>
              </div>
              <div className="bg-[#FAFAFA] border border-gray-100 p-8 md:p-10 rounded-[16px] flex items-start gap-4 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#E5E7EB] transition-all duration-300">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B48752] shrink-0"></div>
                 <p className="text-[17px] md:text-[18px] font-medium text-[#4B5563] leading-relaxed">
                    영상 조회수가 예약을 보장하지 않습니다.
                 </p>
              </div>
              <div className="bg-[#FAFAFA] border border-gray-100 p-8 md:p-10 rounded-[16px] flex items-start gap-4 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[#E5E7EB] transition-all duration-300">
                 <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B48752] shrink-0"></div>
                 <p className="text-[17px] md:text-[18px] font-medium text-[#4B5563] leading-relaxed">
                    검색되지 않는 병원은 선택지에 들어가지 못합니다.
                 </p>
              </div>
           </motion.div>

           <motion.div variants={fadeUpVariant}>
              <h3 className="text-[36px] md:text-[48px] lg:text-[56px] font-[900] text-[#0A192F] leading-tight tracking-tighter">
                 기준이 바뀌면,<br />
                 방식도 바뀌어야 합니다.
              </h3>
           </motion.div>
        </div>
      </motion.section>

      {/* 6. 병마장 시스템 다이어그램 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-24 md:py-32 flex justify-center bg-[#FAFAFA] border-b border-gray-100 overflow-hidden"
      >
         <div className="w-full max-w-[1240px] px-5 md:px-8 text-center">
            <motion.h2 variants={fadeUpVariant} className="text-[32px] md:text-[40px] font-bold text-text-main mb-6 tracking-tight">
               병마장 시스템
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-[16px] md:text-[18px] text-text-sub mb-20 font-medium">
               각 단계가 단절되지 않고 순환하며 병원의 자산을 만듭니다.
            </motion.p>

            {/* Desktop Diagram (Horizontal Loop style) */}
            <motion.div variants={fadeUpVariant} className="hidden lg:block relative max-w-[1000px] mx-auto px-10">
               <div className="absolute top-1/2 left-20 right-20 h-0.5 bg-border -translate-y-1/2 z-0"></div>
               
               <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center group w-48">
                     <div className="w-24 h-24 rounded-full bg-white border-[4px] border-[#102B4E]/10 group-hover:border-[#102B4E] transition-colors flex items-center justify-center text-[#102B4E] shadow-sm mb-4">
                        <Search className="w-8 h-8" />
                     </div>
                     <span className="font-bold text-[18px] text-text-main mb-2">검색·AI 노출</span>
                     <p className="text-[14px] text-text-sub font-medium leading-relaxed">
                        지역 키워드 점유 및<br/>AI 추천 랭킹 확보
                     </p>
                  </div>

                  <div className="flex flex-col items-center justify-center w-12 text-[#102B4E]/30">
                     <ArrowRight className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-center group w-48">
                     <div className="w-24 h-24 rounded-full bg-white border-[4px] border-[#102B4E]/10 group-hover:border-[#102B4E] transition-colors flex items-center justify-center text-[#102B4E] shadow-sm mb-4">
                        <PlayCircle className="w-8 h-8" />
                     </div>
                     <span className="font-bold text-[18px] text-text-main mb-2">영상 콘텐츠 유입</span>
                     <p className="text-[14px] text-text-sub font-medium leading-relaxed">
                        원장님 철학 전달 및<br/>전국구 인지도 형성
                     </p>
                  </div>

                  <div className="flex flex-col items-center justify-center w-12 text-[#102B4E]/30">
                     <ArrowRight className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-center group w-48">
                     <div className="w-24 h-24 rounded-full bg-white border-[4px] border-[#102B4E]/10 group-hover:border-[#102B4E] transition-colors flex items-center justify-center text-[#102B4E] shadow-sm mb-4">
                        <MessageCircle className="w-8 h-8" />
                     </div>
                     <span className="font-bold text-[18px] text-text-main mb-2">커뮤니티 신뢰</span>
                     <p className="text-[14px] text-text-sub font-medium leading-relaxed">
                        긍정적인 여론 형성 및<br/>환자들 간의 자발적 공유
                     </p>
                  </div>

                  <div className="flex flex-col items-center justify-center w-12 text-[#102B4E]/30">
                     <ArrowRight className="w-6 h-6" />
                  </div>

                  <div className="flex flex-col items-center group w-48">
                     <div className="w-24 h-24 rounded-full bg-[#102B4E] border-[4px] border-[#102B4E] flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-105 transition-transform">
                        <CheckCircle2 className="w-8 h-8" />
                     </div>
                     <span className="font-bold text-[18px] text-[#102B4E] mb-2">상담·예약</span>
                     <p className="text-[14px] text-text-sub font-medium leading-relaxed">
                        검증을 마친 환자의<br/>방문 확률 극대화
                     </p>
                  </div>
               </div>

               {/* Feedback Loop line */}
               <div className="mt-12 flex justify-center">
                  <div className="bg-white border border-gray-100 px-8 py-4 rounded-full flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                     <ArrowRight className="w-4 h-4 text-primary" />
                     <span className="text-[15px] font-bold text-text-main">
                        후기와 콘텐츠 축적 → 검색·AI 노출 강화로 이어지는 선순환
                     </span>
                  </div>
               </div>
            </motion.div>

            {/* Mobile Diagram (Vertical) */}
            <motion.div variants={fadeUpVariant} className="lg:hidden flex flex-col items-center relative">
               <div className="absolute top-10 bottom-10 left-[48px] w-0.5 bg-border z-0"></div>
               
               <div className="flex items-center w-full max-w-[320px] mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#102B4E]/10 flex items-center justify-center text-[#102B4E] shadow-sm shrink-0">
                     <Search className="w-6 h-6" />
                  </div>
                  <div className="ml-6 text-left">
                     <span className="font-bold text-[18px] text-text-main block mb-1">검색·AI 노출</span>
                     <p className="text-[13px] text-text-sub">지역 키워드 및 AI 랭킹 확보</p>
                  </div>
               </div>

               <div className="flex items-center w-full max-w-[320px] mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#102B4E]/10 flex items-center justify-center text-[#102B4E] shadow-sm shrink-0">
                     <PlayCircle className="w-6 h-6" />
                  </div>
                  <div className="ml-6 text-left">
                     <span className="font-bold text-[18px] text-text-main block mb-1">영상 콘텐츠 유입</span>
                     <p className="text-[13px] text-text-sub">원장님 철학 전달 및 인지도 형성</p>
                  </div>
               </div>

               <div className="flex items-center w-full max-w-[320px] mb-10 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-[#102B4E]/10 flex items-center justify-center text-[#102B4E] shadow-sm shrink-0">
                     <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="ml-6 text-left">
                     <span className="font-bold text-[18px] text-text-main block mb-1">커뮤니티 신뢰</span>
                     <p className="text-[13px] text-text-sub">긍정 여론 및 자발적 공유</p>
                  </div>
               </div>

               <div className="flex items-center w-full max-w-[320px] relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#102B4E] border-[3px] border-[#102B4E] flex items-center justify-center text-white shadow-sm shrink-0">
                     <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="ml-6 text-left">
                     <span className="font-bold text-[18px] text-[#102B4E] block mb-1">상담·예약</span>
                     <p className="text-[13px] text-text-sub">검증된 환자의 방문 극대화</p>
                  </div>
               </div>
               
               <div className="mt-12 bg-white border border-gray-100 px-6 py-4 rounded-[12px] shadow-sm w-full max-w-[320px]">
                  <p className="text-[14px] font-bold text-text-main leading-relaxed text-left">
                     <span className="text-primary mr-1">✓</span> 후기와 콘텐츠 축적<br/>
                     <span className="text-primary mr-1">✓</span> 다시 검색과 AI 노출 강화
                  </p>
               </div>
            </motion.div>
         </div>
      </motion.section>

      {/* 마케팅 솔루션 진단 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full py-20 md:py-28 flex justify-center bg-[#FAFAFA] border-b border-gray-100"
      >
        <div className="w-full max-w-[1240px] px-5 md:px-8">
           <div className="text-center mb-12">
              <p className="text-[#B48752] font-bold text-[14px] md:text-[15px] mb-3 tracking-wide">
                 마케팅 솔루션 진단
              </p>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#111827] tracking-tight mb-4">
                 어떤 마케팅이 필요한지 모르시겠나요?
              </h2>
              <p className="text-[#4B5563] text-[16px] md:text-[18px]">
                 간단한 진단을 통해 AI가 원장님 병원에 가장 시급한 솔루션을 제안해 드립니다.
              </p>
           </div>
           <AIRecommend />
        </div>
      </motion.section>

      {/* 숫자로 증명하는 병마장 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="w-full py-20 md:py-28 flex justify-center bg-[#0A192F] relative border-b border-[#0A192F]"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="w-full max-w-[1240px] px-5 md:px-8 relative z-10">
           <motion.div variants={fadeUpVariant} className="text-center mb-14 md:mb-16">
              <h2 className="text-[28px] md:text-[40px] font-bold text-white tracking-tight mb-3">
                 숫자로 증명하는 병마장
              </h2>
              <p className="text-white/70 text-[15px] md:text-[17px]">
                 파트너 병원과 함께 쌓아온 성과입니다.
              </p>
           </motion.div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center">
                 <div className="text-[42px] md:text-[56px] font-[900] text-[#B48752] tracking-tighter mb-2 flex items-center">
                    <CountUp end={120} duration={2.5} enableScrollSpy scrollSpyOnce />
                    <span className="text-[32px] md:text-[40px] ml-1">+</span>
                 </div>
                 <div className="text-[15px] md:text-[17px] font-bold text-white/90">누적 파트너 병원</div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center">
                 <div className="text-[42px] md:text-[56px] font-[900] text-[#B48752] tracking-tighter mb-2 flex items-center">
                    <CountUp end={350} duration={2.5} enableScrollSpy scrollSpyOnce />
                    <span className="text-[32px] md:text-[40px] ml-1">%</span>
                 </div>
                 <div className="text-[15px] md:text-[17px] font-bold text-white/90">평균 문의 증가율</div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center">
                 <div className="text-[42px] md:text-[56px] font-[900] text-[#B48752] tracking-tighter mb-2 flex items-center">
                    <CountUp end={95} duration={2.5} enableScrollSpy scrollSpyOnce />
                    <span className="text-[32px] md:text-[40px] ml-1">%</span>
                 </div>
                 <div className="text-[15px] md:text-[17px] font-bold text-white/90">계약 연장률</div>
              </motion.div>
              <motion.div variants={fadeUpVariant} className="flex flex-col items-center text-center">
                 <div className="text-[42px] md:text-[56px] font-[900] text-[#B48752] tracking-tighter mb-2 flex items-center">
                    <CountUp end={3} duration={2.5} enableScrollSpy scrollSpyOnce />
                    <span className="text-[32px] md:text-[40px] ml-1">배</span>
                 </div>
                 <div className="text-[15px] md:text-[17px] font-bold text-white/90">검색 점유율 증가</div>
              </motion.div>
           </div>
        </div>
      </motion.section>

      {/* 7. 메인 성공 사례 미리보기 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-24 md:py-32 flex justify-center bg-white border-b border-gray-100"
      >
         <div className="w-full max-w-[1240px] px-5 md:px-8">
            <motion.div variants={fadeUpVariant} className="text-center mb-16">
               <h2 className="text-[32px] md:text-[40px] font-bold text-text-main mb-4 tracking-tight">
                  실제 성공 사례
               </h2>
               <p className="text-[16px] md:text-[18px] text-text-sub font-medium">
                  수치가 아닌 실제 변화로 증명합니다.
               </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Case 1 */}
               <motion.div variants={fadeUpVariant}>
                 <Link to="/blog" className="group flex flex-col h-full rounded-[16px] border border-gray-100 overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary transition-all duration-300">
                    <div className="h-[220px] bg-[#FAFAFA] relative overflow-hidden flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" alt="네이버 검색 사례" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                       <div className="mb-4">
                          <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 1</span>
                       </div>
                       <h3 className="text-[20px] font-bold text-text-main mb-4 leading-snug group-hover:text-[#102B4E] transition-colors">
                          검색에 없던 병원이 네이버와 AI 첫 줄에 노출된 사례
                       </h3>
                       <p className="text-[15px] text-text-sub font-medium flex-1 mb-8">
                          환자의 검색 여정을 선점하여 예약으로 연결했습니다.
                       </p>
                       <div className="flex items-center text-[#1A3F6F] font-bold text-[14px] mt-auto">
                          사례 자세히 보기 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 </Link>
               </motion.div>

               {/* Case 2 */}
               <motion.div variants={fadeUpVariant}>
                 <Link to="/blog" className="group flex flex-col h-full rounded-[16px] border border-gray-100 overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary transition-all duration-300">
                    <div className="h-[220px] bg-[#FAFAFA] relative overflow-hidden flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" alt="영상 문의 사례" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                       <div className="mb-4">
                          <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 2</span>
                       </div>
                       <h3 className="text-[20px] font-bold text-text-main mb-4 leading-snug group-hover:text-[#102B4E] transition-colors">
                          영상 한 편이 지방 환자를 실제 방문으로 연결한 사례
                       </h3>
                       <p className="text-[15px] text-text-sub font-medium flex-1 mb-8">
                          조회수를 넘어 실제 환자들의 문의를 만들었습니다.
                       </p>
                       <div className="flex items-center text-[#1A3F6F] font-bold text-[14px] mt-auto">
                          사례 자세히 보기 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 </Link>
               </motion.div>

               {/* Case 3 */}
               <motion.div variants={fadeUpVariant}>
                 <Link to="/blog" className="group flex flex-col h-full rounded-[16px] border border-gray-100 overflow-hidden bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-primary transition-all duration-300">
                    <div className="h-[220px] bg-[#FAFAFA] relative overflow-hidden flex-shrink-0">
                       <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" alt="커뮤니티 사례" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                       <div className="mb-4">
                          <span className="inline-block py-1 px-2.5 bg-[#1A3F6F]/10 text-[#1A3F6F] text-[12px] font-bold rounded tracking-wide">CASE 3</span>
                       </div>
                       <h3 className="text-[20px] font-bold text-text-main mb-4 leading-snug group-hover:text-[#102B4E] transition-colors">
                          커뮤니티에서 원장이 직접 답하고 환자가 예약한 사례
                       </h3>
                       <p className="text-[15px] text-text-sub font-medium flex-1 mb-8">
                          진정성 있는 소통으로 지역 내 신뢰도를 구축했습니다.
                       </p>
                       <div className="flex items-center text-[#1A3F6F] font-bold text-[14px] mt-auto">
                          사례 자세히 보기 <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                       </div>
                    </div>
                 </Link>
               </motion.div>
            </div>
         </div>
      </motion.section>

      {/* 8. 기존 광고와 병마장 비교 */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-24 md:py-32 flex justify-center bg-[#FAFAFA] border-b border-gray-100"
      >
         <div className="w-full max-w-[1000px] px-5 md:px-8">
            <motion.div variants={fadeUpVariant} className="text-center mb-16">
               <h2 className="text-[32px] md:text-[40px] font-bold text-[#111827] tracking-tight">
                  방식의 차이가 결과의 차이를 만듭니다
               </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 lg:gap-10">
               {/* 기존 광고 */}
               <motion.div variants={fadeUpVariant} className="flex-1 bg-white border border-gray-200 rounded-[20px] p-8 shadow-sm">
                  <h3 className="text-[20px] font-bold text-[#4B5563] mb-8 pb-4 border-b border-gray-100 text-center">
                     비용을 끊으면 사라지는 광고
                  </h3>
                  <ul className="space-y-6">
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest">노출</span>
                        <span className="text-[16px] font-medium text-[#4B5563]">입찰 경쟁, 비용 중단 시 즉시 사라짐</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest">콘텐츠</span>
                        <span className="text-[16px] font-medium text-[#4B5563]">단발성 발주, 공장형 원고 배포</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest">신뢰</span>
                        <span className="text-[16px] font-medium text-[#4B5563]">환자가 '광고'로 인지하여 신뢰도 낮음</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest">검색 효과</span>
                        <span className="text-[16px] font-medium text-[#4B5563]">주요 키워드 한두 개에만 의존</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#9CA3AF] uppercase tracking-widest">장기 가치</span>
                        <span className="text-[16px] font-medium text-[#4B5563]">매달 고정비 지출, 자산으로 남지 않음</span>
                     </li>
                  </ul>
               </motion.div>

               {/* 병마장 */}
               <motion.div variants={fadeUpVariant} className="flex-1 bg-[#0A192F] rounded-[20px] p-8 shadow-xl relative overflow-hidden group transition-colors">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#B48752]/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                  <h3 className="text-[22px] font-bold text-white mb-8 pb-4 border-b border-white/10 text-center">
                     시간이 갈수록 쌓이는 병원의 자산
                  </h3>
                  <ul className="space-y-6 relative z-10">
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-widest">노출</span>
                        <span className="text-[16px] font-bold text-white">플랫폼 생태계에 최적화된 오가닉 노출</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-widest">콘텐츠</span>
                        <span className="text-[16px] font-bold text-white">진정성을 담은 의료 전문 콘텐츠 축적</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-widest">신뢰</span>
                        <span className="text-[16px] font-bold text-white">정보와 소통으로 자연스러운 신뢰 구축</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-widest">검색 효과</span>
                        <span className="text-[16px] font-bold text-white">지역/증상 등 촘촘한 키워드 확장 구조</span>
                     </li>
                     <li className="flex flex-col gap-1">
                        <span className="text-[12px] font-bold text-[#B48752] uppercase tracking-widest">장기 가치</span>
                        <span className="text-[16px] font-bold text-white">비용 투자가 아닌 마케팅 자산의 축적</span>
                     </li>
                  </ul>
               </motion.div>
            </div>
         </div>
      </motion.section>

      {/* 9. 메인 최종 CTA */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUpVariant}
        className="w-full py-24 md:py-32 flex justify-center bg-[#0A192F] text-white relative overflow-hidden"
      >
         {/* Abstract BG Decor */}
         <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%">
               <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid-cta)" />
            </svg>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
         </div>

         <div className="w-full max-w-[800px] px-5 md:px-8 text-center relative z-10">
            <h2 className="text-[36px] md:text-[48px] lg:text-[56px] font-bold mb-6 !leading-[1.15] tracking-tighter">
               아직 이 자리가 비어 있을 때<br className="hidden md:block"/> 확인하세요
            </h2>
            <p className="text-[16px] md:text-[18px] text-white/70 font-medium mb-12 max-w-[500px] mx-auto leading-relaxed">
               병마장은 동일 지역·동일 진료과목을 단 한 곳만 진행합니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-[56px] px-8 bg-white text-[#0A192F] font-bold text-[16px] rounded-[8px] hover:bg-gray-100 transition-all shadow-sm hover:-translate-y-0.5 duration-200">
                  진행 가능 여부 확인
               </a>
               <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 h-[56px] px-8 bg-[#FEE500] text-[#371D1E] font-bold text-[16px] rounded-[8px] hover:bg-[#FEE500]/90 transition-all shadow-sm hover:-translate-y-0.5 duration-200">
                  <MessageCircle className="w-5 h-5" fill="#371D1E" />
                  카카오톡 문의
               </a>
            </div>
         </div>
      </motion.section>
    </div>
  );
}

