export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header";
export const KAKAO_URL = "http://pf.kakao.com/_APxbgb/chat";

export function docImg(file: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}doc-images/${file}`.replace(/([^:]\/)\/+/g, "$1");
}

export function Figure({
  src,
  caption,
  className = "",
}: {
  src: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`my-6 ${className}`}>
      <img
        src={docImg(src)}
        alt={caption || ""}
        className="w-full rounded-[4px] border border-black/5 shadow-sm"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-2 text-[13px] italic text-[#888888] leading-relaxed">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function CtaPair({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <a
        href={FORM_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-[52px] items-center justify-center rounded-[6px] bg-[#1A3F6F] px-7 text-[15px] font-bold text-white hover:bg-[#15355c] transition-colors"
      >
        문의폼 작성하기
      </a>
      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-[52px] items-center justify-center rounded-[6px] bg-[#FEE500] px-7 text-[15px] font-bold text-[#371D1E] hover:bg-[#f5dc00] transition-colors"
      >
        카카오톡 채널 문의
      </a>
    </div>
  );
}

export function SectionRule() {
  return <hr className="border-0 border-t border-gray-200 my-0" />;
}
