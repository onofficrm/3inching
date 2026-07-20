import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

const NAV_LINKS = [
  { name: "병마장", path: "/" },
  { name: "성공 사례", path: "/cases" },
  { name: "서비스", path: "/services" },
  { name: "상품 선택 가이드", path: "/guide" },
  { name: "블로그", path: "/blog" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      {/* 얇은 상단 안내 바 - 프리미엄 스타일 */}
      <div className="w-full bg-[#0A192F] h-9 flex items-center justify-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <span className="text-[#B48752] text-[11px] md:text-[12px] font-bold tracking-widest uppercase flex items-center gap-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B48752] animate-pulse"></span>
          동일 지역·동일 진료과목은 한 곳만 진행합니다
        </span>
      </div>
      
      {/* 메인 헤더 */}
      <header 
        className={cn(
          "w-full transition-all duration-500",
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border-b border-[#B48752]/20" 
            : "bg-white border-b border-gray-100"
        )}
      >
        <div className="mx-auto flex h-[72px] md:h-[80px] max-w-[1240px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-10 lg:gap-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0A192F] to-[#1A3F6F] rounded-[8px] flex items-center justify-center transition-transform group-hover:scale-105 duration-500 shadow-md border border-[#0A192F]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="text-white font-[900] text-[15px] relative z-10">B</span>
              </div>
              <span className="text-[22px] font-[900] text-[#0A192F] tracking-tighter">병마장</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.hash === link.path.substring(1));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-[15px] transition-all relative py-2 group flex flex-col items-center",
                      isActive ? "text-[#0A192F] font-bold" : "text-[#4B5563] font-medium hover:text-[#0A192F]"
                    )}
                  >
                    <span>{link.name}</span>
                    <span className={cn(
                      "absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300",
                      isActive ? "bg-[#B48752] opacity-100 scale-100" : "bg-transparent opacity-0 scale-0 group-hover:bg-[#B48752]/50 group-hover:opacity-100 group-hover:scale-100"
                    )}></span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="/contact"
              className="hidden md:inline-flex h-[44px] items-center justify-center rounded-[8px] bg-transparent border border-[#0A192F] px-7 text-[14px] font-bold text-[#0A192F] transition-all hover:bg-[#0A192F] hover:text-white hover:shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">프리미엄 상담하기</span>
              <div className="absolute inset-0 bg-[#0A192F] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-text-main"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl px-5 py-6 shadow-xl absolute w-full left-0 top-full flex flex-col gap-2">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.hash === link.path.substring(1));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-[17px] font-bold py-3.5 border-b border-gray-50 flex items-center justify-between transition-colors",
                      isActive ? "text-[#102B4E]" : "text-[#4B5563] hover:text-[#111827]"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B48752]"></span>}
                  </Link>
                )
              })}
              <a
                href="/contact"
                className="mt-6 flex h-[54px] w-full items-center justify-center rounded-[10px] bg-[#0A192F] text-[16px] font-bold text-white shadow-md active:scale-95 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                상담하기
              </a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
