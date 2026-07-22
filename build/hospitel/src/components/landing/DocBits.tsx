import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScPVeqViqRpAwrADPPJ8Ws7lsdgjemz35S2k1q3xwW4rU-SSg/viewform?usp=header";
export const KAKAO_URL = "https://pf.kakao.com/_APxbgb/chat";

export function docImg(file: string) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}doc-images/${file}`.replace(/([^:]\/)\/+/g, "$1");
}

const imgBorder = "border border-[#E3E8EF] rounded-[2px]";

export function Figure({
  src,
  caption,
  className = "",
  maxWidth = 640,
}: {
  src: string;
  caption?: string;
  className?: string;
  maxWidth?: number;
}) {
  return (
    <figure className={`my-6 mx-auto w-full ${className}`} style={{ maxWidth }}>
      <img
        src={docImg(src)}
        alt={caption || ""}
        className={`block w-full h-auto ${imgBorder}`}
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-2 text-[13px] text-[#888888] text-center leading-relaxed">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ImagePair({
  items,
}: {
  items: { src: string; caption?: string }[];
}) {
  return (
    <div className="my-6 mx-auto grid max-w-[640px] grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <figure key={item.src} className="m-0">
          <img
            src={docImg(item.src)}
            alt={item.caption || ""}
            className={`block w-full h-auto sm:h-[400px] object-cover object-top ${imgBorder}`}
            loading="lazy"
          />
          {item.caption ? (
            <figcaption className="mt-2 text-[13px] text-[#888888] text-center leading-relaxed">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export function EvidenceSlider({
  note,
  items,
  fit = "cover",
}: {
  note: string;
  items: { src: string; caption?: string }[];
  /** cover: 긴 캡처용 / contain: 글씨 읽기용(AI 화면 등) */
  fit?: "cover" | "contain";
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, [updateArrows, items.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("figure");
    const step = card ? card.getBoundingClientRect().width + 14 : 314;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const imgCls =
    fit === "contain"
      ? `block w-full h-auto max-h-[520px] object-contain bg-[#F7F9FC] ${imgBorder}`
      : `block w-full h-[400px] object-cover object-top ${imgBorder}`;

  const arrowTop = fit === "contain" ? "top-[42%]" : "top-[200px]";

  return (
    <div className="my-6 -mx-5 md:mx-0">
      <p className="mb-2 text-center text-[12.5px] text-[#888888] px-5">{note}</p>
      <div className="relative">
        <button
          type="button"
          aria-label="이전"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className={`absolute left-1 md:left-0 ${arrowTop} z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#E3E8EF] bg-white/95 text-[#1A3F6F] shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-0 hover:bg-white`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="다음"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className={`absolute right-1 md:right-0 ${arrowTop} z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#E3E8EF] bg-white/95 text-[#1A3F6F] shadow-sm transition-opacity disabled:pointer-events-none disabled:opacity-0 hover:bg-white`}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <div
          ref={railRef}
          className="flex gap-3.5 overflow-x-auto px-5 md:px-12 pb-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <figure
              key={item.src}
              className={`m-0 shrink-0 snap-center ${
                fit === "contain" ? "w-[min(420px,85vw)]" : "w-[300px] max-w-[78vw]"
              }`}
            >
              <img
                src={docImg(item.src)}
                alt={item.caption || ""}
                className={imgCls}
                loading="lazy"
              />
              {item.caption ? (
                <figcaption className="mt-2 text-[12.5px] text-[#888888] text-center leading-relaxed">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StackFigures({
  items,
  maxWidth = 420,
}: {
  items: { src: string; caption?: string }[];
  maxWidth?: number;
}) {
  return (
    <div className="my-6 mx-auto w-full space-y-6" style={{ maxWidth }}>
      {items.map((item) => (
        <figure key={item.src} className="m-0">
          <img
            src={docImg(item.src)}
            alt={item.caption || ""}
            className={`block w-full h-auto ${imgBorder}`}
            loading="lazy"
          />
          {item.caption ? (
            <figcaption className="mt-2 text-[13px] text-[#888888] text-center leading-relaxed">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

export function MetricBoxes({
  items,
  columns = 2,
}: {
  items: { label: string; value: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`my-6 mx-auto grid max-w-[640px] gap-3.5 ${
        columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="border border-[#E3E8EF] border-l-[3px] border-l-[#1A3F6F] bg-white px-[18px] py-4"
        >
          <p className="m-0 mb-1 text-[13px] text-[#888888]">{item.label}</p>
          <p className="m-0 text-[20px] md:text-[22px] font-extrabold text-[#1A3F6F] leading-snug">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CaseBand({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="w-full bg-[#1A3F6F] text-white py-8 md:py-[34px] mb-10">
      <div className="mx-auto w-full max-w-[860px] px-5 md:px-8">
        <p className="m-0 mb-2 text-[12px] font-bold tracking-[3px] text-[#9FC0E4]">{num}</p>
        <h2 className="m-0 mb-2 text-[24px] md:text-[26px] font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <p className="m-0 text-[15px] text-[#C9DCF0] leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
}

export function CaseCloser({ children }: { children: ReactNode }) {
  return (
    <div className="mt-11 bg-[#1A3F6F] px-6 py-[30px] text-center">
      <p className="m-0 text-[16px] md:text-[17px] font-semibold text-white leading-[1.7]">
        {children}
      </p>
    </div>
  );
}

export function DocTable({
  headers,
  rows,
  highlightLastOfFirstCol,
  emphasizeRowIndex,
  title,
}: {
  headers?: string[];
  rows: string[][];
  highlightLastOfFirstCol?: boolean;
  /** 0-based body row to color red (guide consultation row) */
  emphasizeRowIndex?: number;
  title?: string;
}) {
  return (
    <div className="my-6 overflow-x-auto">
      {title ? (
        <p className="mb-2 text-[15px] font-bold text-[#1A3F6F]">{title}</p>
      ) : null}
      <table className="w-full min-w-[480px] border-collapse text-[15px]">
        {headers ? (
          <thead>
            <tr className="bg-[#1A3F6F] text-white">
              {headers.map((h) => (
                <th key={h} className="px-3.5 py-3 text-left font-bold border border-[#E3E8EF]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, ri) => {
            const emphasize = emphasizeRowIndex === ri;
            const sumRow =
              highlightLastOfFirstCol && row[0]?.includes("합계");
            return (
              <tr key={`${row[0]}-${ri}`}>
                {row.map((cell, ci) => {
                  const isKeyCol = ci === 0;
                  const Tag = isKeyCol ? "th" : "td";
                  let cls =
                    "px-3.5 py-3 border border-[#E3E8EF] text-left";
                  if (emphasize) {
                    cls += " text-[#CC2222] font-bold";
                  } else if (sumRow) {
                    cls += " font-bold text-[#1A3F6F] bg-[#EDF3FA]";
                  } else if (isKeyCol) {
                    cls += " bg-[#F7F9FC] font-bold text-[#1A3F6F] w-[40%]";
                  } else {
                    cls += " text-[#333]";
                  }
                  return (
                    <Tag key={`${ri}-${ci}`} className={cls}>
                      {cell}
                    </Tag>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function CtaPair({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "onNavy";
}) {
  const formCls =
    variant === "onNavy"
      ? "bg-white text-[#1A3F6F] hover:bg-[#F7F9FC]"
      : "bg-[#1A3F6F] text-white hover:bg-[#15355c]";
  return (
    <div className={`flex flex-col sm:flex-row gap-3 justify-center ${className}`}>
      <a
        href={FORM_URL}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex h-[52px] items-center justify-center rounded-[3px] px-7 text-[15px] font-bold transition-colors ${formCls}`}
      >
        문의폼 작성하기
      </a>
      <a
        href={KAKAO_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-[52px] items-center justify-center rounded-[3px] bg-[#FEE500] px-7 text-[15px] font-bold text-[#191919] hover:bg-[#f5dc00] transition-colors"
      >
        카카오톡 채널 문의
      </a>
    </div>
  );
}

export function SectionRule() {
  return null;
}
