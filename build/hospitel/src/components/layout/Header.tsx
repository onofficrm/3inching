import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { FORM_URL } from "../landing/DocBits";

const NAV_LINKS = [
  { name: "오프닝", hash: "opening" },
  { name: "SEO·GEO", hash: "case-seo" },
  { name: "미디어", hash: "case-media" },
  { name: "커뮤니티", hash: "case-community" },
  { name: "키워드", hash: "case-keyword" },
  { name: "선택 가이드", hash: "guide" },
  { name: "블로그", href: "/blog" },
];

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("opening");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => scrollToHash(id));
      setActiveHash(id);
    }
  }, [location.hash, onHome]);

  useEffect(() => {
    if (!onHome) return;
    const ids = NAV_LINKS.filter((l) => l.hash).map((l) => l.hash!);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveHash(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const goSection = (hash: string) => {
    setIsMobileMenuOpen(false);
    if (onHome) {
      navigate({ pathname: "/", hash: `#${hash}` }, { replace: false });
      scrollToHash(hash);
    } else {
      navigate({ pathname: "/", hash: `#${hash}` });
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col">
      <div className="w-full bg-[#1A3F6F] h-9 flex items-center justify-center border-b border-white/10">
        <span className="text-white/90 text-[11px] md:text-[12px] font-bold tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CC2222] animate-pulse" />
          동일 지역·동일 진료과목은 한 곳만 진행합니다
        </span>
      </div>

      <header
        className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        )}
      >
        <div className="mx-auto flex h-[64px] md:h-[72px] max-w-[1240px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-8 lg:gap-10 min-w-0">
            <button
              type="button"
              onClick={() => goSection("opening")}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="w-8 h-8 bg-[#1A3F6F] rounded-[6px] flex items-center justify-center">
                <span className="text-white font-[900] text-[14px]">병</span>
              </div>
              <span className="text-[20px] font-[900] text-[#1A3F6F] tracking-tighter">병마장</span>
            </button>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 overflow-x-auto">
              {NAV_LINKS.map((link) => {
                if (link.href) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-[14px] whitespace-nowrap py-2 transition-colors text-[#555] font-medium hover:text-[#1A3F6F]"
                    >
                      {link.name}
                    </a>
                  );
                }
                const active = onHome && activeHash === link.hash;
                return (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => goSection(link.hash!)}
                    className={cn(
                      "text-[14px] whitespace-nowrap py-2 transition-colors",
                      active ? "text-[#1A3F6F] font-bold" : "text-[#555] font-medium hover:text-[#1A3F6F]"
                    )}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex h-[42px] items-center justify-center rounded-[6px] bg-[#1A3F6F] px-5 text-[13px] font-bold text-white hover:bg-[#15355c]"
            >
              문의하기
            </a>
            <button
              className="lg:hidden p-2 text-[#1A3F6F]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-4 absolute w-full left-0 top-full shadow-lg">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.href ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="py-3 text-[16px] font-bold text-[#333] border-b border-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <button
                    key={link.name}
                    type="button"
                    className="py-3 text-left text-[16px] font-bold text-[#333] border-b border-gray-50"
                    onClick={() => goSection(link.hash!)}
                  >
                    {link.name}
                  </button>
                )
              )}
              <a
                href={FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex h-[50px] items-center justify-center rounded-[6px] bg-[#1A3F6F] text-white font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의폼 작성하기
              </a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
