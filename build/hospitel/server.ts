import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const systemInstruction = `당신은 '병마장'이라는 병원 마케팅 전문 에이전시의 수석 컨설턴트입니다. 
사용자의 병원 상황(진료과목, 지역, 현재 고민 등)을 듣고, 어떤 마케팅 전략이 필요한지 전문적이고 친절하게 진단해줍니다.
답변은 너무 길지 않게, 핵심을 짚어주고 다음 질문을 유도하여 2~3번의 대화 후 우리 서비스(SEO, 유튜브, 지역키워드 등)를 추천해주세요.
단, 무조건적인 영업보다는 실질적인 조언(예: "현재 지역 검색량 대비 노출이 부족할 수 있습니다.")을 바탕으로 제안하세요.`;

      let contents = [];
      if (history && history.length > 0) {
         contents = history.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
         }));
      }
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  app.post("/api/recommend", async (req, res) => {
    try {
      const { answers } = req.body;
      const prompt = `다음은 병원 원장님이 작성한 마케팅 고민 설문 응답입니다:
${JSON.stringify(answers, null, 2)}

이 응답을 분석하여 우리 '병마장'의 4가지 주요 서비스 중 1~2가지를 추천하고 그 이유를 3~4줄로 설명해주세요.
[서비스 목록]
1. SEO·GEO (네이버 플레이스, 구글 검색 상위 노출)
2. 미디어 (유튜브 등 영상 콘텐츠 제작 및 채널 관리)
3. 커뮤니티 (지역 맘카페, 환자 커뮤니티 여론 형성)
4. 지역 키워드 (세부 지역 기반 키워드 선점)

출력 형식 (JSON):
{
  "recommendedServices": ["서비스명1", "서비스명2"],
  "reason": "추천 이유 설명"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Recommend API Error:", error);
      res.status(500).json({ error: "Failed to generate recommendation" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
