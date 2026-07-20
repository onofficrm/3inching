import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, Loader2, RefreshCw } from "lucide-react";

const QUESTIONS = [
  {
    id: "goal",
    question: "현재 가장 시급한 마케팅 목표는 무엇인가요?",
    options: [
      "신환 유치 확보",
      "병원 인지도 상승",
      "충성 환자 및 재방문율 증가",
      "기존 마케팅 비용 효율화",
    ],
  },
  {
    id: "problem",
    question: "현재 병원 마케팅의 가장 큰 문제점은?",
    options: [
      "검색해도 우리 병원이 안 나옴",
      "광고비는 쓰는데 문의가 없음",
      "환자들이 우리 병원의 전문성을 모름",
      "경쟁 병원에 환자를 뺏기고 있음",
    ],
  },
  {
    id: "budget",
    question: "월 예상 마케팅 예산 규모는?",
    options: [
      "100~300만 원",
      "300~500만 원",
      "500만 원 이상",
      "아직 정해지지 않음 (상담 필요)",
    ],
  },
] as const;

type RecommendResult = {
  recommendedServices: string[];
  reason: string;
};

export function AIRecommend() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendResult | null>(null);

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      void submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      if (!response.ok) throw new Error("API request failed");
      const data = (await response.json()) as RecommendResult;
      setResult({
        recommendedServices: data.recommendedServices ?? [],
        reason: data.reason ?? "",
      });
    } catch (error) {
      console.error(error);
      setResult({
        recommendedServices: ["SEO·GEO", "미디어"],
        reason:
          "일시적인 오류로 AI 분석에 실패했습니다. 하지만 입력해주신 내용을 바탕으로 검색 최적화와 영상 콘텐츠 구축을 추천해 드립니다. 정확한 진단을 위해 무료 상담을 신청해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-[800px] overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-xl">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-gray-100">
        <div
          className="h-full bg-[#B48752] transition-all duration-500 ease-out"
          style={{
            width: result ? "100%" : `${(currentStep / QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-[#B48752]" />
          <h3 className="text-center text-[20px] font-bold text-[#0A192F] md:text-[24px]">
            AI 맞춤형 솔루션 진단
          </h3>
        </div>

        {!result && !isLoading ? (
          <div className="flex flex-col items-center">
            <span className="mb-4 text-[14px] font-bold text-[#B48752]">
              Step {currentStep + 1} of {QUESTIONS.length}
            </span>
            <h4 className="mb-10 text-center text-[24px] font-bold tracking-tight text-[#111827] md:text-[32px]">
              {QUESTIONS[currentStep].question}
            </h4>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              {QUESTIONS[currentStep].options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="group flex w-full items-center justify-between rounded-[12px] border border-gray-200 p-5 text-left transition-all hover:border-[#102B4E] hover:bg-[#FAFAFA]"
                >
                  <span className="text-[16px] font-semibold text-[#4B5563] group-hover:text-[#102B4E]">
                    {option}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-[#102B4E]" />
                </button>
              ))}
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="mb-6 h-12 w-12 animate-spin text-[#B48752]" />
            <h4 className="mb-2 text-[24px] font-bold text-[#0A192F]">
              원장님의 답변을 분석하고 있습니다
            </h4>
            <p className="text-[#4B5563]">AI가 최적의 마케팅 솔루션을 도출 중입니다...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0FDF4]">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="mb-8 text-[28px] font-bold tracking-tight text-[#0A192F] md:text-[36px]">
              추천 솔루션이 준비되었습니다
            </h4>

            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {result!.recommendedServices.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-[#102B4E] px-6 py-3 text-[16px] font-bold text-white shadow-md"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="relative mb-10 w-full rounded-[16px] border border-gray-100 bg-[#FAFAFA] p-6 text-left">
              <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                <span className="flex items-center gap-1 text-[13px] font-bold tracking-wider text-[#B48752] uppercase">
                  <Sparkles className="h-3.5 w-3.5" /> AI 분석 리포트
                </span>
              </div>
              <p className="text-[16px] leading-relaxed font-medium text-[#4B5563]">
                {result!.reason}
              </p>
            </div>

            <div className="flex w-full gap-4 md:w-auto">
              <button
                type="button"
                onClick={reset}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-gray-200 bg-white px-6 py-4 font-bold text-[#4B5563] transition-colors hover:bg-gray-50 md:flex-none"
              >
                <RefreshCw className="h-4 w-4" /> 다시 하기
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#B48752] px-8 py-4 font-bold text-white shadow-md transition-colors hover:bg-[#9CA3AF] md:flex-none"
              >
                상세 상담 신청하기 <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
