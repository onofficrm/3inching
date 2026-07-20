import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

const GREETING =
  "안녕하세요! 병마장 수석 컨설턴트입니다. 현재 원장님의 병원에서 가장 큰 마케팅 고민은 무엇인가요?";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    const history = messages.filter((m) => m.text !== GREETING);
    const nextMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.text || "응답을 불러오지 못했습니다." },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="AI 마케팅 컨설턴트 열기"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#102B4E] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A192F]",
          "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6",
          isOpen && "pointer-events-none scale-0 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      <div
        className={cn(
          "fixed right-5 z-50 flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-2xl transition-all duration-300",
          "bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:bottom-6",
          isOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-0 opacity-0"
        )}
      >
        <div className="flex items-center justify-between bg-[#102B4E] p-4 text-white">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span className="text-[15px] font-bold">AI 마케팅 컨설턴트</span>
          </div>
          <button
            type="button"
            aria-label="채팅 닫기"
            onClick={() => setIsOpen(false)}
            className="text-white/80 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#FAFAFA] p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                "flex max-w-[85%] gap-2",
                msg.role === "user" ? "flex-row-reverse self-end" : "self-start"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  msg.role === "user" ? "bg-[#B48752]" : "bg-[#102B4E]"
                )}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-[12px] p-3 text-[14px] leading-relaxed",
                  msg.role === "user"
                    ? "rounded-tr-none bg-[#B48752] text-white"
                    : "rounded-tl-none border border-gray-100 bg-white text-[#4B5563] shadow-sm"
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex max-w-[85%] gap-2 self-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#102B4E]">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-2 rounded-[12px] rounded-tl-none border border-gray-100 bg-white p-3 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[#102B4E]" />
                <span className="text-[13px] text-gray-500">진단 중...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 border-t border-gray-100 bg-white p-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="마케팅 고민을 입력해주세요..."
            className="flex-1 rounded-full border border-gray-200 bg-[#FAFAFA] px-4 py-2.5 text-[14px] transition-colors focus:border-[#B48752] focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#102B4E] transition-colors hover:bg-[#0A192F] disabled:opacity-50"
          >
            <Send className="h-4 w-4 -ml-0.5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
