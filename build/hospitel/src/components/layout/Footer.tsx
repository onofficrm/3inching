import { Link } from "react-router-dom";
import { FORM_URL, KAKAO_URL } from "../landing/DocBits";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="w-full bg-[#FAFAFA] py-12 flex justify-center border-b border-gray-100">
        <div className="w-full max-w-[860px] px-5 md:px-8 text-center">
          <h2 className="text-[22px] md:text-[26px] font-bold text-[#1A3F6F] mb-6 tracking-tight">
            아직 이 자리가 비어 있을 때 확인하세요
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[50px] items-center justify-center rounded-[6px] bg-[#1A3F6F] px-7 text-[15px] font-bold text-white"
            >
              문의폼 작성하기
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[50px] items-center justify-center rounded-[6px] bg-[#FEE500] px-7 text-[15px] font-bold text-[#371D1E]"
            >
              카카오톡 채널 문의
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[860px] px-5 md:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#1A3F6F] rounded flex items-center justify-center">
                <span className="text-white font-bold text-[11px]">병</span>
              </div>
              <h2 className="text-[18px] font-[900] text-[#1A3F6F]">병마장</h2>
            </div>
            <p className="text-[#555] text-[14px] leading-relaxed max-w-sm">
              환자가 제 발로 찾아오는 시스템. SEO·GEO, 미디어, 커뮤니티, 키워드 노출 전략.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-[#555]">
            <a href="/#case-seo" className="hover:text-[#1A3F6F]">사례</a>
            <a href="/#guide" className="hover:text-[#1A3F6F]">선택 가이드</a>
            <Link to="/blog" className="hover:text-[#1A3F6F]">블로그</Link>
            <Link to="/privacy" className="hover:text-[#1A3F6F]">개인정보처리방침</Link>
            <Link to="/terms" className="hover:text-[#1A3F6F]">이용약관</Link>
          </div>
        </div>
        <p className="mt-8 pt-6 border-t border-gray-100 text-[12px] text-[#888]">
          © {new Date().getFullYear()} 병마장. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
