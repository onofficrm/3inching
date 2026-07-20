import { useEffect } from "react";

type SeoHeadProps = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
};

const SITE = "병마장";
const DEFAULT_DESC =
  "병원 마케팅 전문 에이전시 병마장. SEO·GEO, 미디어, 커뮤니티, 지역키워드로 병원의 디지털 자산을 구축합니다.";
const DEFAULT_OG = "/apple-touch-icon.png";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function SeoHead({
  title,
  description = DEFAULT_DESC,
  path = "/",
  image = DEFAULT_OG,
  noindex = false,
}: SeoHeadProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex,nofollow" : "index,follow");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", image.startsWith("http") ? image : `${window.location.origin}${image}`);
    upsertMeta("property", "og:url", `${window.location.origin}${path}`);
    upsertMeta("name", "twitter:card", "summary_large_image");
  }, [title, description, path, image, noindex]);

  return null;
}
