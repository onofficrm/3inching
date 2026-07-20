import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

const QUESTIONS = [
  {
    id: "goal",
    question: "현재 가장 시급한 마케팅 목표는 무엇인가요?",
    options: ["신환 유치 확보", "병원 인지도 상승", "충성 환자 및 재방문율 증가", "기존 마케팅 비용 효율화"]
  },
  {
    id: "problem",
    question: "현재 병원 마케팅의 가장 큰 문제점은?",
    options: ["검색해도 우리 병원이 안 나옴", "광고비는 쓰는데 문의가 없음", "환자들이 우리 병원의 전문성을 모름", "경쟁 병원에 환자를 뺏기고 있음"]
  },
  {
    id: "budget",
    question: "월 예상 마케팅 예산 규모는?",
    options: ["100~300만 원", "300~500만 원", "500만 원 이상", "아직 정해지지 않음 (상담 필요)"]
  }
];

export function AIRecommend() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ recommendedServices: string[], reason: string } | null>(null);

  const handleSelect = (option: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitAnswers(newAnswers);
    }
  };

  const submitAnswers = async (finalAnswers: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers })
      });
      if (!response.ok) throw new Error("API request failed");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        recommendedServices: ["SEO·GEO", "미디어"],
        reason: "일시적인 오류로 AI 분석에 실패했습니다. 하지만 입력해주신 내용을 바탕으로 검색 최적화와 영상 콘텐츠 구축을 추천해 드립니다. 정확한 진단을 위해 무료 상담을 신청해주세요."
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
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-[24px] shadow-xl border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <div 
          className="h-full bg-[#B48752] transition-all duration-500 ease-out"
          style={{ width: result ? '100%' : `${(currentStep / QUESTIONS.length) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Sparkles className="w-5 h-5 text-[#B48752]" />
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#0A192F] text-center">AI 맞춤형 솔루션 진단</h3>
        </div>

        {!result && !isLoading ? (
          <div className="flex flex-col items-center">
            <span className="text-[#B48752] font-bold text-[14px] mb-4">
              Step {currentStep + 1} of {QUESTIONS.length}
            </span>
            <h4 className="text-[24px] md:text-[32px] font-bold text-[#111827] text-center mb-10 tracking-tight">
              {QUESTIONS[currentStep].question}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className="w-full text-left p-5 rounded-[12px] border border-gray-200 hover:border-[#102B4E] hover:bg-[#FAFAFA] transition-all group flex items-center justify-between"
                >
                  <span className="font-semibold text-[#4B5563] group-hover:text-[#102B4E] text-[16px]">
                    {option}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#102B4E] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#B48752] mb-6" />
            <h4 className="text-[24px] font-bold text-[#0A192F] mb-2">원장님의 답변을 분석하고 있습니다</h4>
            <p className="text-[#4B5563]">AI가 최적의 마케팅 솔루션을 도출 중입니다...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-[28px] md:text-[36px] font-bold text-[#0A192F] mb-8 tracking-tight">
              추천 솔루션이 준비되었습니다
            </h4>
            
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {result.recommendedServices.map((service, idx) => (
                <span key={idx} className="px-6 py-3 bg-[#102B4E] text-white rounded-full font-bold text-[16px] shadow-md">
                  {service}
                </span>
              ))}
            </div>

            <div className="bg-[#FAFAFA] border border-gray-100 rounded-[16px] p-6 mb-10 w-full text-left relative">
               <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2">
                 <span className="text-[#B48752] font-bold text-[13px] uppercase tracking-wider flex items-center gap-1">
                   <Sparkles className="w-3.5 h-3.5" /> AI 분석 리포트
                 </span>
               </div>
               <p className="text-[#4B5563] text-[16px] leading-relaxed font-medium">
                 {result.reason}
               </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={reset}
                className="flex-1 md:flex-none px-6 py-4 rounded-[10px] bg-white border border-gray-200 text-[#4B5563] font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" /> 다시 하기
              </button>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header"
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-none px-8 py-4 rounded-[10px] bg-[#B48752] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#9CA3AF] transition-colors shadow-md"
              >
                상세 상담 신청하기 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
