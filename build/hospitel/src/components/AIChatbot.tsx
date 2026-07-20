import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "model";
  text: string;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "안녕하세요! 병마장 수석 컨설턴트입니다. 현재 원장님의 병원에서 가장 큰 마케팅 고민은 무엇인가요?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    const newMessages: Message[] = [...messages, { role: "user", text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.filter(m => m.text !== "안녕하세요! 병마장 수석 컨설턴트입니다. 현재 원장님의 병원에서 가장 큰 마케팅 고민은 무엇인가요?")
        })
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      setMessages(prev => [...prev, { role: "model", text: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", text: "죄송합니다. 일시적인 오류가 발생했습니다. 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-[#102B4E] rounded-full flex items-center justify-center shadow-lg hover:bg-[#0A192F] hover:-translate-y-1 transition-all duration-300 z-40 md:flex hidden",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-[360px] h-[500px] bg-white rounded-[20px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-[#102B4E] p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-bold text-[15px]">AI 마케팅 컨설턴트</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#FAFAFA] flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-2 max-w-[85%]", msg.role === "user" ? "self-end flex-row-reverse" : "self-start")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0", msg.role === "user" ? "bg-[#B48752]" : "bg-[#102B4E]")}>
                {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
              </div>
              <div className={cn("p-3 rounded-[12px] text-[14px] leading-relaxed", 
                msg.role === "user" ? "bg-[#B48752] text-white rounded-tr-none" : "bg-white border border-gray-100 text-[#4B5563] rounded-tl-none shadow-sm"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full bg-[#102B4E] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 bg-white border border-gray-100 rounded-[12px] rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#102B4E]" />
                <span className="text-[13px] text-gray-500">진단 중...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="마케팅 고민을 입력해주세요..."
            className="flex-1 bg-[#FAFAFA] border border-gray-200 rounded-full px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#B48752] transition-colors"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#102B4E] flex items-center justify-center disabled:opacity-50 hover:bg-[#0A192F] transition-colors shrink-0"
          >
            <Send className="w-4 h-4 text-white -ml-0.5" />
          </button>
        </div>
      </div>
    </>
  );
}
