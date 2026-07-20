import { SeoHead } from "../components/SeoHead";
import { Link } from "react-router-dom";

export function PrivacyPage() {
  return (
    <div className="w-full bg-white">
      <SeoHead title="개인정보처리방침" description="병마장 개인정보처리방침" path="/privacy" />
      <section className="mx-auto max-w-[840px] px-5 py-16 md:py-24 md:px-8">
        <p className="mb-3 text-sm font-bold text-[#B48752]">LEGAL</p>
        <h1 className="mb-8 text-[32px] font-bold tracking-tight text-[#0A192F] md:text-[40px]">개인정보처리방침</h1>
        <div className="space-y-8 text-[15px] leading-relaxed text-[#4B5563]">
          <p>병마장(이하 &quot;회사&quot;)은 관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하게 처리하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">1. 수집하는 개인정보 항목</h2>
            <p>상담 문의 시: 이름, 연락처, 이메일(선택), 문의내용, 접속 IP, 유입 페이지</p>
            <p className="mt-2">AI 진단 이용 시: 설문 응답(목표/문제/예산), 추천 결과, 접속 IP</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">2. 수집 및 이용 목적</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>상담 신청 확인 및 회신</li>
              <li>마케팅 진단·제안 제공</li>
              <li>서비스 개선 및 부정 이용 방지</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">3. 보유 및 이용 기간</h2>
            <p>원칙적으로 목적 달성 후 지체 없이 파기합니다. 다만 관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안 보관합니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">4. 제3자 제공</h2>
            <p>이용자 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만 법령에 근거한 요청이 있는 경우 예외로 할 수 있습니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">5. 처리 위탁</h2>
            <p>서비스 운영을 위해 호스팅·이메일·AI API(Google Gemini) 등 처리 위탁이 발생할 수 있으며, 위탁 시 관련 계약을 통해 안전하게 관리합니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">6. 이용자 권리</h2>
            <p>이용자는 개인정보 열람·정정·삭제·처리정지를 요청할 수 있습니다. 문의: 사이트 하단 연락처 또는 상담 폼.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">7. 고지</h2>
            <p>본 방침은 2026년 7월 20일부터 적용됩니다. 변경 시 사이트에 공지합니다.</p>
          </section>
        </div>
        <Link to="/" className="mt-12 inline-block font-bold text-[#102B4E]">← 홈으로</Link>
      </section>
    </div>
  );
}
