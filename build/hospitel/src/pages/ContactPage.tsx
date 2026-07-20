import { Link } from "react-router-dom";
import { SeoHead } from "../components/SeoHead";
import { InquiryForm } from "../components/InquiryForm";

export function ContactPage() {
  return (
    <div className="w-full bg-[#FAFAFA]">
      <SeoHead
        title="상담 신청"
        description="병마장 병원 마케팅 상담을 신청하세요. 검색·미디어·커뮤니티 전략을 진단해 드립니다."
        path="/contact"
      />
      <section className="mx-auto max-w-[720px] px-5 py-16 md:py-24 md:px-8">
        <p className="mb-3 text-sm font-bold text-[#B48752]">CONTACT</p>
        <h1 className="mb-3 text-[32px] font-bold tracking-tight text-[#0A192F] md:text-[40px]">상담 신청</h1>
        <p className="mb-10 text-[#4B5563]">
          아래 폼으로 남겨주시면 확인 후 연락드립니다. 급하신 경우{" "}
          <a href="http://pf.kakao.com/_APxbgb/chat" target="_blank" rel="noreferrer" className="font-semibold text-[#102B4E] underline">
            카카오톡 문의
          </a>
          도 가능합니다.
        </p>
        <InquiryForm source="contact" />
        <p className="mt-8 text-center text-sm text-[#6B7280]">
          <Link to="/privacy" className="underline">개인정보처리방침</Link>
          {" · "}
          <Link to="/terms" className="underline">이용약관</Link>
        </p>
      </section>
    </div>
  );
}
