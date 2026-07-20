import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-20">
      {/* Mini CTA Area */}
      <div className="w-full bg-[#FAFAFA] py-16 md:py-20 flex justify-center border-b border-gray-100">
         <div className="w-full max-w-[1240px] px-5 md:px-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-[#102B4E]/5 rounded-full flex items-center justify-center mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B48752]"></span>
            </div>
            <h2 className="text-[26px] md:text-[34px] font-bold text-[#111827] mb-8 tracking-tight">
               우리 병원에 맞는 시작점을 확인해보세요
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
               <a href="/contact" className="inline-flex h-[54px] items-center justify-center rounded-[8px] bg-[#0A192F] px-8 text-[15px] font-bold text-white transition-all hover:bg-[#111827] hover:shadow-md hover:-translate-y-0.5 w-full sm:w-auto">
                  상담 신청
               </a>
               <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="inline-flex h-[54px] items-center justify-center rounded-[8px] bg-[#FEE500] px-8 text-[15px] font-bold text-[#371D1E] transition-all hover:bg-[#FEE500]/90 hover:shadow-md hover:-translate-y-0.5 w-full sm:w-auto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#371D1E" className="mr-2"><path d="M12 3c-5.52 0-10 3.58-10 8 0 2.53 1.34 4.77 3.42 6.22l-1.04 3.96c-.08.31.22.58.5.42l4.57-3.03c.82.23 1.68.35 2.55.35 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/></svg>
                  카카오톡 문의
               </a>
            </div>
         </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#102B4E] rounded flex items-center justify-center">
                <span className="text-white font-bold text-[12px]">B</span>
              </div>
              <h2 className="text-[20px] font-[900] text-[#0A192F] tracking-tighter">병마장</h2>
            </div>
            <p className="text-[#4B5563] text-[15px] leading-relaxed max-w-sm mb-6">
              병원 마케팅 전문 서비스. 검색, AI, 영상, 커뮤니티를 연결하여
              병원의 장기적인 디지털 자산을 구축합니다.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-text-main mb-5 text-base">서비스</h3>
            <ul className="flex flex-col gap-3 text-text-sub text-sm font-medium">
              <li>
                <Link to="/#service-overview" className="hover:text-primary transition-colors">
                  핵심 솔루션
                </Link>
              </li>
              <li>
                <Link to="/#product-table" className="hover:text-primary transition-colors">
                  상품 선택 가이드
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-text-main mb-5 text-base">인사이트</h3>
            <ul className="flex flex-col gap-3 text-text-sub text-sm font-medium">
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  블로그 홈
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  병원 마케팅 사례
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="font-bold text-text-main mb-5 text-base">문의 및 정책</h3>
            <ul className="flex flex-col gap-3 text-text-sub text-sm font-medium mb-6">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  온라인 문의폼
                </Link>
              </li>
              <li>
                <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  카카오톡 문의
                </a>
              </li>
            </ul>
            <div className="flex gap-4 text-xs text-text-caption font-medium">
               <Link to="/privacy" className="hover:text-text-main transition-colors">개인정보처리방침</Link>
               <Link to="/terms" className="hover:text-text-main transition-colors">이용약관</Link>
            </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-caption text-xs md:text-sm text-center md:text-left font-medium">
            © {new Date().getFullYear()} 병마장. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
