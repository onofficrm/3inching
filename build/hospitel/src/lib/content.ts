import { useEffect, useState } from "react";

export type BlogPost = {
  id: string;
  slug?: string;
  category: string;
  type?: string;
  title: string;
  summary: string;
  date: string;
  readTime?: string;
  image?: string;
  featured?: boolean;
  body?: string;
};

export type CaseItem = {
  id: string;
  department: string;
  title: string;
  metric: string;
  summary: string;
  tags?: string[];
  image?: string;
};

async function fetchContent<T>(type: "blog" | "cases"): Promise<T[]> {
  try {
    const res = await fetch(`/api/content?type=${type}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.ok && Array.isArray(data.items)) return data.items as T[];
    }
  } catch {
    /* fall through */
  }
  try {
    const base = "/plugin/onoff-builder-bridge/imports/hospitel/";
    const res = await fetch(`${base}content/${type}.json`);
    if (res.ok) return (await res.json()) as T[];
  } catch {
    /* ignore */
  }
  return [];
}

export function useBlogPosts() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetchContent<BlogPost>("blog").then((rows) => {
      if (alive) {
        setItems(rows);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  return { items, loading };
}

export function useCases() {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetchContent<CaseItem>("cases").then((rows) => {
      if (alive) {
        setItems(rows);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, []);
  return { items, loading };
}
