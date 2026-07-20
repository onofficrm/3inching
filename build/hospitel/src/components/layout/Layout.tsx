import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AIChatbot } from "../AIChatbot";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col relative pb-20 md:pb-0">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
      {/* 모바일 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-3 md:hidden z-50 flex gap-3 shadow-[0_-8px_20px_-1px_rgba(0,0,0,0.05)] pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
         <a href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header" target="_blank" rel="noreferrer" className="flex-1 bg-[#0A192F] text-white font-bold text-[15px] text-center py-3.5 rounded-[10px] transition-all hover:bg-[#111827] active:scale-95 shadow-md flex items-center justify-center gap-1.5">
            상담 신청
         </a>
         <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="flex-1 bg-[#FEE500] text-[#371D1E] font-bold text-[15px] text-center py-3.5 rounded-[10px] transition-all hover:bg-[#FEE500]/90 active:scale-95 shadow-md flex items-center justify-center gap-1.5">
            카톡 문의
         </a>
      </div>
    </div>
  );
}
