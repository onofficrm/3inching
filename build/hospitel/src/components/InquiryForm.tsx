import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

type InquiryFormProps = {
  compact?: boolean;
  source?: string;
};

export function InquiryForm({ compact = false, source = "spa" }: InquiryFormProps) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const refreshToken = async () => {
    try {
      const res = await fetch("/api/inquiry", { method: "GET", credentials: "same-origin" });
      const data = await res.json();
      if (data.token) setToken(data.token);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    void refreshToken();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          name,
          phone,
          email,
          message,
          privacy_agree: privacy,
          website_url: honeypot,
          referer_page: `${source}:${window.location.pathname}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "접수에 실패했습니다.");
      }
      setDone(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setPrivacy(false);
      await refreshToken();
    } catch (err) {
      setError(err instanceof Error ? err.message : "접수에 실패했습니다.");
      await refreshToken();
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-[16px] border border-green-100 bg-[#F0FDF4] p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-green-600" />
        <h3 className="mb-2 text-[22px] font-bold text-[#0A192F]">문의가 접수되었습니다</h3>
        <p className="mb-6 text-[#4B5563]">확인 후 빠르게 연락드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="rounded-[10px] bg-[#102B4E] px-5 py-3 text-sm font-bold text-white"
        >
          추가 문의하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-[16px] border border-gray-100 bg-white shadow-sm ${compact ? "p-5" : "p-6 md:p-8"}`}>
      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />
      <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111827]">
          이름
          <input required value={name} onChange={(e) => setName(e.target.value)} className="rounded-[8px] border border-gray-200 px-3 py-2.5 font-medium" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-[#111827]">
          연락처
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-0000-0000" className="rounded-[8px] border border-gray-200 px-3 py-2.5 font-medium" />
        </label>
      </div>
      <label className="mt-4 flex flex-col gap-1.5 text-sm font-semibold text-[#111827]">
        이메일 (선택)
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-[8px] border border-gray-200 px-3 py-2.5 font-medium" />
      </label>
      <label className="mt-4 flex flex-col gap-1.5 text-sm font-semibold text-[#111827]">
        문의내용
        <textarea required rows={compact ? 4 : 5} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-[8px] border border-gray-200 px-3 py-2.5 font-medium" placeholder="병원명, 지역, 고민을 알려주세요." />
      </label>
      <label className="mt-4 flex items-start gap-2 text-sm text-[#4B5563]">
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" />
        <span>
          <Link to="/privacy" className="font-semibold text-[#102B4E] underline">개인정보처리방침</Link>에 동의합니다.
        </span>
      </label>
      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !privacy}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-[#0A192F] font-bold text-white transition hover:bg-[#111827] disabled:opacity-50"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        상담 신청하기
      </button>
    </form>
  );
}
