import { SeoHead } from "../components/SeoHead";
import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <div className="w-full bg-white">
      <SeoHead title="이용약관" description="병마장 서비스 이용약관" path="/terms" />
      <section className="mx-auto max-w-[840px] px-5 py-16 md:py-24 md:px-8">
        <p className="mb-3 text-sm font-bold text-[#B48752]">LEGAL</p>
        <h1 className="mb-8 text-[32px] font-bold tracking-tight text-[#0A192F] md:text-[40px]">이용약관</h1>
        <div className="space-y-8 text-[15px] leading-relaxed text-[#4B5563]">
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">1. 목적</h2>
            <p>본 약관은 병마장(이하 &quot;회사&quot;)이 제공하는 웹사이트 및 관련 서비스의 이용 조건과 절차를 규정합니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">2. 서비스 내용</h2>
            <p>회사는 병원 마케팅 상담, 콘텐츠 제공, AI 진단 등 정보를 제공하며, 개별 계약이 필요한 유료 서비스는 별도 약정에 따릅니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">3. 이용자의 의무</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>허위 정보로 상담을 신청하지 않습니다.</li>
              <li>서비스 운영을 방해하는 행위를 하지 않습니다.</li>
              <li>타인의 권리를 침해하는 콘텐츠를 게시하지 않습니다.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">4. AI 기능</h2>
            <p>AI 챗봇·진단 결과는 참고용 정보이며, 의료·법률·세무 자문이 아닙니다. 최종 의사결정은 이용자 및 전문가 상담을 통해 이루어져야 합니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">5. 면책</h2>
            <p>천재지변, 통신 장애, 제3자 서비스 장애 등 회사의 합리적 통제 범위를 벗어난 사유로 인한 손해에 대해 책임을 지지 않습니다.</p>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-bold text-[#111827]">6. 준거법</h2>
            <p>본 약관은 대한민국 법률에 따르며, 분쟁 발생 시 관할 법원은 민사소송법에 따릅니다.</p>
          </section>
          <p>시행일: 2026년 7월 20일</p>
        </div>
        <Link to="/" className="mt-12 inline-block font-bold text-[#102B4E]">← 홈으로</Link>
      </section>
    </div>
  );
}
