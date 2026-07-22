import type { ReactNode } from "react";
import { SeoHead } from "../components/SeoHead";
import {
  Figure,
  ImagePair,
  EvidenceSlider,
  StackFigures,
  MetricBoxes,
  CaseBand,
  CaseCloser,
  DocTable,
  CtaPair,
  FORM_URL,
  KAKAO_URL,
} from "../components/landing/DocBits";

function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[20px] md:text-[22px] font-bold text-[#1A3F6F] mt-10 mb-4">
      {children}
    </h3>
  );
}

function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[16px] md:text-[17px] leading-[1.85] text-[#333] mb-4 ${className}`}>
      {children}
    </p>
  );
}

function Bold({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-[#111]">{children}</strong>;
}

function Section({
  id,
  tint,
  children,
  band,
}: {
  id: string;
  tint?: boolean;
  children: ReactNode;
  band?: { num: string; title: string; subtitle: string };
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-[120px] w-full ${tint ? "bg-[#F7F9FC]" : "bg-white"}`}
    >
      {band ? <CaseBand {...band} /> : null}
      <div className="w-full py-14 md:py-16 flex justify-center">
        <div className="w-full max-w-[860px] px-5 md:px-8">{children}</div>
      </div>
    </section>
  );
}

export function MainPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      <SeoHead
        title="병마장 - 환자가 제 발로 찾아오는 시스템"
        description="실제 클라이언트 사례로 보는 병원 마케팅. SEO·GEO, 미디어, 커뮤니티, 키워드 노출 전략."
        path="/"
      />

      {/* ① 오프닝 */}
      <Section id="opening">
        <p className="text-[13px] font-bold tracking-widest text-[#1A3F6F] mb-4">
          실제 클라이언트 사례로 보는 병마장
        </p>
        <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-[900] text-[#1A3F6F] leading-[1.2] tracking-tight mb-8">
          환자가 제 발로 찾아오는 시스템
        </h1>
        <P>
          전과 다르다는 걸 이미 느끼고 계셨을 겁니다. <Bold>기분 탓이 아닙니다.</Bold>
        </P>
        <P>
          <Bold>네이버가 바뀌었기 때문입니다.</Bold>
        </P>
        <P>1년 전 방식과 지금의 방식은 기준 자체가 다릅니다.</P>
        <P>
          그런데 지금 이 순간에도 누군가는 검색하고 있습니다. 네이버에서, AI에서, 커뮤니티에서.
        </P>
        <P>
          그 어느 화면에도,{" "}
          <span className="font-bold text-[#CC2222]">우리 병원은 없습니다.</span>
        </P>
        <Figure
          src="image1.jpeg"
          caption="검색 화면 — 이 지역 병원들은 나오지만, 원장님은 없습니다 (상호 가림)"
        />
        <P>
          <Bold>기준이 바뀌면, 방식도 바뀌어야 합니다.</Bold>
        </P>
        <P>병마장은 그렇게 움직입니다.</P>
        <P>실제 클라이언트 사례 네 가지를 보여드립니다.</P>
        <P className="text-[#555555] text-[15px]">
          아래 모든 화면의 병원 상호와 질환명은 가려져 있습니다. 진행 중인 클라이언트를 보호하기
          위해서입니다. 원장님이 함께하시면, 원장님도 같은 방식으로 보호받습니다.
        </P>
      </Section>

      {/* ② 사례 ① SEO · GEO */}
      <Section
        id="case-seo"
        tint
        band={{
          num: "사례 01",
          title: "SEO · GEO",
          subtitle: "검색하면 없던 병원이, 네이버와 AI 첫 줄에 오기까지",
        }}
      >
        <P>실제 클라이언트의 사례입니다.</P>

        <H3>도입 배경</H3>
        <P>
          문을 연 지 몇 해 된 한의원이었습니다. 진료는 자신 있었지만, 매출은 월 2,000만원대에서
          멈춰 있었습니다. 도심 상가라 월세가 매출의 30%에 가까웠고, 매달 고정비를 메우기에
          급급했습니다.
        </P>
        <P>
          환자가 없는 이유는 명확했습니다.{" "}
          <Bold>환자가 이 병원을 찾을 방법이 없기 때문입니다.</Bold>
        </P>

        <H3>도입 효과</H3>
        <P>
          <Bold>①&nbsp;&nbsp;네이버 웹영역 최상단 노출</Bold>
        </P>
        <P>작업 후, 환자가 어떤 키워드로 검색해도 이 병원/한의원이 웹영역 맨 위에 나옵니다.</P>
        <ImagePair items={[{ src: "image2.jpeg" }, { src: "image3.jpeg" }]} />
        <Figure src="image4.jpeg" />

        <P>이게 다가 아닙니다.</P>
        <P>
          <Bold>②&nbsp;&nbsp;AI가 어떻게 물어도 추천하는 병원</Bold>
        </P>
        <P>어떤 AI에, 어떤 방식으로 물어도 결과는 같습니다.</P>
        <Figure src="image5.jpeg" maxWidth={520} />
        <EvidenceSlider
          fit="contain"
          note="— 다른 AI 답변 5건 (옆으로 넘겨보세요) —"
          items={[
            { src: "image6.jpeg" },
            { src: "image7.jpeg" },
            { src: "image8.jpeg" },
            { src: "image9.jpeg" },
            { src: "image10.jpeg" },
          ]}
        />
        <P>질문이 어떻게 바뀌어도, 답에는 이 병원/한의원이 있습니다.</P>

        <H3>결과</H3>
        <P>
          검색하면 없던 병원이, 이제 <Bold>네이버와 AI 양쪽 첫 줄</Bold>에 있습니다.
        </P>
        <P>환자가 어떤 단어로 검색을 시작하든, 그 끝에 이 병원이 있습니다.</P>
        <P>그리고 검색 화면을 차지한 만큼, 실제 변화가 따라왔습니다.</P>
        <MetricBoxes
          items={[
            { label: "월 환자수", value: "246명 → 680명" },
            { label: "월 매출", value: "2,323만원 → 1억 127만원" },
          ]}
        />
        <StackFigures
          maxWidth={420}
          items={[
            { src: "image11.png", caption: "월 환자수 (12개월)" },
            { src: "image12.jpeg", caption: "월 매출 추이" },
          ]}
        />
        <P>월 2,000만원대에 멈춰 있던 병원이, 검색을 잡으면서 달라지기 시작했습니다.</P>
        <CaseCloser>
          네이버의 오늘과 AI의 내일 — 환자가 검색하는 모든 곳에서, 가장 먼저 보이는 병원이
          되었습니다.
        </CaseCloser>
      </Section>

      {/* ③ 사례 ② 미디어 */}
      <Section
        id="case-media"
        band={{
          num: "사례 02",
          title: "미디어",
          subtitle: "영상 한 편이, 전국에서 환자를 데려오기까지",
        }}
      >
        <P>실제 클라이언트의 사례입니다.</P>

        <H3>도입 배경</H3>
        <P>영상 올려보셨습니까. 환자 왔습니까.</P>
        <P>
          대부분 안 옵니다. 영상이 문제가 아닙니다. <Bold>방식이 문제입니다.</Bold>
        </P>
        <P>병원 소개, 장비 자랑, 원장 인터뷰 — 환자는 그걸 보고 움직이지 않습니다.</P>
        <P>
          <Bold>환자가 오는 영상 방식이 따로 있습니다.</Bold>
        </P>

        <MetricBoxes
          columns={3}
          items={[
            { label: "영상 조회수", value: "13.5K" },
            { label: "문의 경로", value: "댓글 · DM" },
            { label: "내원", value: "충남 논산 → 서울" },
          ]}
        />

        <H3>도입 효과</H3>
        <P>
          <Bold>①&nbsp;&nbsp;영상이 환자를 움직입니다</Bold>
        </P>
        <P>유튜브·틱톡·인스타그램에 영상을 발행하자, 반응이 따라왔습니다.</P>
        <Figure src="image13.png" caption="조회수 13.5K 영상 (얼굴·질환 모자이크)" />
        <P>
          조회수는 단순한 숫자가 아니었습니다. 영상을 본 사람들이 댓글과 메시지로
          &quot;어느 병원이냐&quot;, &quot;어떻게 가냐&quot;를 직접 물어왔습니다.
        </P>
        <Figure
          src="image14.jpeg"
          caption={"\"주소가 어디냐\"는 댓글에, 병원이 직접 답합니다"}
        />

        <P>
          <Bold>②&nbsp;&nbsp;영상은 거리를 가리지 않습니다</Bold>
        </P>
        <P>
          조회수는 올랐습니다. 그런데 환자가 왔습니까. 기존 방식으로 찍은 영상은 그렇습니다. 보고
          끝납니다. 예약으로 이어지지 않습니다. 방식이 달라지면 결과가 다릅니다. 충남 논산에서,
          영상 한 편을 보고 먼 길을 찾아옵니다.
        </P>
        <Figure
          src="image17.jpeg"
          caption="영상을 보고 온 예약 문의 — 조회수가 예약으로 바뀌는 지점"
        />
        <ImagePair
          items={[
            { src: "image15.jpeg" },
            { src: "image16.jpeg", caption: "먼 거리에서 이어진 상담 — 지역을 가리지 않습니다" },
          ]}
        />
        <P>
          실제로 이 환자들은, 영상을 보고 직접 검색하여 커뮤니티(네이버카페)에 유입된
          환자들입니다.
        </P>
        <StackFigures
          maxWidth={520}
          items={[
            { src: "image18.jpeg", caption: "카페 가입 경로 설문 — 유튜브 · 틱톡 · 검색" },
            { src: "image19.jpeg" },
          ]}
        />
        <P>
          <Bold>충남 논산에서 서울까지 — 영상 하나가 환자를 전국에서 데려옵니다.</Bold>
        </P>

        <H3>결과</H3>
        <P>
          영상을 발행하기 전과 후, 환자가 병원을 알게 되는 경로가 달라졌습니다. 한 번 만든 영상은
          사라지지 않습니다. 지금도 누군가 그 영상을 보고 있고, 그 끝에 이 병원이 있습니다.
        </P>
        <CaseCloser>원장님이 잠든 시간에도, 영상이 환자를 데려옵니다.</CaseCloser>
      </Section>

      {/* ④ 사례 ③ 커뮤니티 */}
      <Section
        id="case-community"
        tint
        band={{
          num: "사례 03",
          title: "커뮤니티 (네이버카페)",
          subtitle: "처음 보는 병원을, 환자가 믿고 찾아오기까지",
        }}
      >
        <P>실제 클라이언트의 사례입니다.</P>

        <H3>도입 배경</H3>
        <P>지금까지 쓴 돈, 계산해보신 적 있습니까?</P>
        <P>네이버 대표카페 침투 혹은 제휴비용을 지불하며 글 작성하고 있습니까?</P>
        <P>
          글 올리고, 사라지고, 또 발주합니다. 쌓이는 게 없습니다.{" "}
          <Bold>전부 매몰비용입니다.</Bold>
        </P>
        <P>
          직접 커뮤니티를 만들면 다릅니다. 후기가 쌓이고,{" "}
          <Bold>환자가 환자를 데려옵니다.</Bold>
        </P>

        <H3>도입 효과</H3>
        <P>
          <Bold>①&nbsp;&nbsp;환자가 원장을 직접 만납니다</Bold>
        </P>
        <P>
          질환 커뮤니티를 만들자, 같은 증상을 가진 환자들이 모이기 시작했습니다. 그리고 그
          안에서, 원장이 직접 환자의 질문에 답합니다.
        </P>
        <Figure
          src="image20.png"
          caption={
            '"지방인데 치료 가능할까요" → "내일 오후 3시 예약했습니다"'
          }
        />
        <Figure src="image21.png" caption="실제 차트 — 예약 확인" maxWidth={420} />
        <P>질문 하나가 예약으로 끝나는 데 하루가 걸리지 않았습니다.</P>
        <EvidenceSlider
          note="원장 직접 답변 3건 더 보기"
          items={[
            { src: "image22.jpeg", caption: "지방 환자 치료 프로그램 안내" },
            { src: "image23.jpeg", caption: "저혈압·어지럼증 원인과 치료 방향" },
            { src: "image24.jpeg", caption: "3년 된 교통사고 후유증 — 원인 분석부터 내원 안내까지" },
          ]}
        />
        <P>환자들과 직접 소통하는 원장은, 그 누구도 광고라고 생각하지 않습니다.</P>

        <P>
          <Bold>②&nbsp;&nbsp;신뢰가 환자를 데려옵니다</Bold>
        </P>
        <P>
          커뮤니티에서 우리 병원을 알게 된 환자는, 다른 병원을 더 찾지 않습니다. 이미 신뢰가
          생긴 공간 안에 있기 때문입니다.
        </P>
        <Figure
          src="image26.png"
          caption="기존 치료제로 효과를 못 본 환자의 후기"
        />
        <EvidenceSlider
          note="같은 후기 4건 더 보기"
          items={[
            { src: "image25.png", caption: "증상이 사라지고, 진통제를 끊었습니다" },
            { src: "image27.jpeg", caption: "최근 5년간 안 해본 게 없을 정도로" },
            { src: "image28.jpeg", caption: "결론부터 — 매우 많이 개선됐습니다" },
            { src: "image29.jpeg", caption: "별거 없는 일상이, 저에게는 가장 큰 기적" },
          ]}
        />

        <P>
          <Bold>③&nbsp;&nbsp;네이버가 직접 인정합니다</Bold>
        </P>
        <P>
          커뮤니티가 쌓이면, 네이버 검색 결과의 &quot;관련 경험 카페글&quot; 영역에 직접
          노출됩니다. 증상을 검색하든, 원인을 검색하든, 치료법을 검색하든 — 검색어가 바뀌어도
          같은 카페가 반복해서 등장합니다.
        </P>
        <Figure
          src="image30.jpeg"
          caption={'"증상" 검색 — 관련 경험 카페글에 노출'}
        />
        <EvidenceSlider
          note="검색어를 바꿔도 같은 카페 — 3건 더 보기"
          items={[
            { src: "image31.jpeg", caption: '"원인" 검색 — 같은 카페가 다시 노출' },
            { src: "image32.jpeg", caption: "또 다른 증상 검색 — 노출 범위 확장" },
            { src: "image33.jpeg", caption: "치료 방법 검색 — 여전히 상단 노출" },
          ]}
        />

        <H3>결과</H3>
        <P>원장이 직접 답하자, 환자가 예약했습니다.</P>
        <P>후기가 쌓이자, 아무도 이 병원을 광고라고 하지 않았습니다.</P>
        <P>커뮤니티를 만들기 전에는 없던 일입니다.</P>
        <P>건당 돈 내고 올린 글은 사라졌습니다.</P>
        <CaseCloser>한 번 쌓인 신뢰는, 광고처럼 사라지지 않습니다.</CaseCloser>
      </Section>

      {/* ⑤ 사례 ④ 키워드 — v27: CPC vs 앞에 사례4가 아니라 요청서는 CPC가 사례3 뒤.
          요청서/v27 순서: 사례3 → CPC vs → 사례4 → 가이드 → 종결 */}
      {/* CPC vs 커뮤니티 */}
      <section id="compare" className="scroll-mt-[120px] w-full bg-[#12294A] text-white py-14 md:py-16">
        <div className="mx-auto w-full max-w-[860px] px-5 md:px-8">
          <p className="text-center text-[13px] font-bold tracking-[3px] text-[#8FB2DA] mb-7">
            왜 세 가지를 같이 하는가
          </p>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-5 items-stretch max-w-[760px] mx-auto">
            <div className="border border-white/15 bg-white/5 px-[22px] py-6">
              <h3 className="m-0 mb-2.5 text-[17px] font-extrabold text-white leading-snug">
                CPC · 단순 상위노출 광고
              </h3>
              <p className="m-0 text-[14.5px] text-[#C4D6EC] leading-relaxed">
                돈을 넣는 동안만 보입니다. 멈추면 그날로 사라집니다.
              </p>
            </div>
            <div className="flex items-center justify-center text-[14px] font-extrabold tracking-[2px] text-[#7FA3CE] py-1">
              VS
            </div>
            <div className="border border-white/35 bg-white/15 px-[22px] py-6">
              <h3 className="m-0 mb-2.5 text-[17px] font-extrabold text-white leading-snug">
                내 병원의 자산이 쌓이는 커뮤니티
              </h3>
              <p className="m-0 text-[14.5px] text-[#C4D6EC] leading-relaxed">
                한 번 쌓인 글과 후기는 남습니다. 시간이 지날수록 늘어납니다.
              </p>
            </div>
          </div>
          <div className="max-w-[660px] mx-auto mt-9 text-center">
            <P className="text-[#C4D6EC] text-[15.5px]">
              검색으로 들어온 환자, 영상으로 들어온 예비환자 모두 커뮤니티 한 곳에 모입니다.
              그리고 그 커뮤니티가 다시 검색과 영상의 신뢰가 됩니다.
            </P>
            <P className="text-[#C4D6EC] text-[15.5px] font-bold">
              세 가지는 따로 작동하지 않습니다. 하나의 구조로 맞물려 돌아갑니다.
            </P>
            <p className="m-0 mt-5 text-[18px] font-extrabold text-white leading-snug">
              이것이 광고가 멈춰도 환자가 계속 오는 이유입니다.
            </p>
          </div>
        </div>
      </section>

      {/* ⑥ 사례 ④ */}
      <Section
        id="case-keyword"
        band={{
          num: "사례 04",
          title: "병원 중심 키워드 노출 전략",
          subtitle: "지역·동·증상 키워드를 매월 대량 배포해 검색 노출을 넓히는 구조",
        }}
      >
        <H3>역할</H3>
        <P>
          내 병원 근처의 동, 지하철역, 지역명, 진료 증상 키워드를 조합해{" "}
          <Bold>네이버·다음 검색 노출</Bold>을 넓히는 구조입니다.
        </P>
        <P>
          먼저 시작한 전주 원장님은, 이미 그 동네 검색을 가져갔습니다. 나중에 시작해도,{" "}
          <Bold>이미 채워진 자리는 다시 비지 않습니다.</Bold>
        </P>
        <P className="text-[#555555] text-[15px]">
          AI 검색 대응이 필요하다면 상품 ①을 별도로 문의하세요.
        </P>

        <H3>레퍼런스</H3>
        <P>
          <Bold>전주다나을한의원</Bold> (melazian.com)
        </P>
        <P>전주 효자동 일대 지역·동·증상 키워드 배포 운영 중.</P>
        <P>네이버 통합검색 다수 키워드 노출 확인. 원장 직접 환자 증가 체감.</P>
        <Figure
          src="image36.jpeg"
          caption={'"효자동 다이어트한의원" 검색 — 통합검색 상단 노출'}
        />
        <Figure
          src="image34.jpg"
          caption="운영 중인 원장님의 실제 피드백"
          maxWidth={330}
        />
        <EvidenceSlider
          fit="contain"
          note="다른 키워드 노출 화면 2건 더 보기"
          items={[
            { src: "image35.jpeg", caption: '"전주 야간진료 한의원" 검색' },
            { src: "image37.jpeg", caption: '"전주 공휴일 한의원" 검색' },
          ]}
        />
        <P>
          <Bold>키워드를 바꿔도, 같은 병원이 반복해서 나옵니다.</Bold>
        </P>

        <H3>상품 구성</H3>
        <DocTable
          title="매월 반복 발행 — 월 156건"
          rows={[
            ["네이버 블로그", "월 28건"],
            ["블로그 네트워크", "월 100건"],
            ["워드프레스 웹문서", "월 28건"],
            ["월 발행 합계", "156건"],
          ]}
          highlightLastOfFirstCol
        />
        <DocTable
          title="분기 · 기간 내 제공"
          rows={[
            ["다음(Daum) 키워드 노출", "5건"],
            ["언론 보도자료", "3개월마다 1회 (3개월 이상 계약 시)"],
          ]}
        />
        <DocTable
          title="계약 조건"
          rows={[
            ["계약 방식", "월 단위"],
            ["키워드 구성", "병원 위치 기준 동 단위 + 진료 증상 키워드 조합"],
            ["목적", "네이버·다음 통합검색 및 웹문서 영역 노출 확장 (SEO 전용)"],
            ["금액", "규모 및 목표에 따라 별도 협의"],
          ]}
        />
        <P>
          <Bold>단독 운영도 가능합니다.</Bold>
          <br />
          다른 상품 없이 ④번만으로 시작할 수 있습니다.
        </P>
        <P>검색 기반이 갖춰지면, 그때 ①~③을 붙이는 방식으로 단계적으로 확장합니다.</P>

        <H3>장기 계약 혜택</H3>
        <DocTable
          headers={["기간", "혜택"]}
          rows={[
            ["6개월 이상", "월 비용 10% 할인"],
            ["12개월 이상", "서버 비용 병마장 부담 + 월 비용 10% 할인"],
          ]}
        />
        <CaseCloser>
          먼저 깔아둔 키워드는, 나중에 온 병원이 비집고 들어올 자리를 남기지 않습니다.
        </CaseCloser>
      </Section>

      {/* ⑦ 상품 선택 가이드 */}
      <Section id="guide" tint>
        <h2 className="text-[26px] md:text-[32px] font-bold text-[#1A3F6F] tracking-tight mb-6 leading-snug">
          상품 선택 가이드
        </h2>
        <P>뭐부터 해야 할지 모르겠다면, 속 얘기부터 하면 됩니다.</P>
        <P>원장님의 지금 상황과 규모에 따라, 무엇부터 할지가 달라집니다.</P>

        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {[
            {
              n: "01",
              t: "SEO · GEO",
              d: "검색과 AI에 노출되는 구조",
            },
            {
              n: "02",
              t: "미디어",
              d: "영상으로 환자를 데려오는 구조",
            },
            {
              n: "03",
              t: "커뮤니티",
              d: "환자가 신뢰하고 머무는 구조",
            },
            {
              n: "04",
              t: "병원 중심 키워드 노출 전략",
              d: "내 병원 근처의 동, 지하철역, 지역명, 진료 증상 키워드를 조합해 검색 노출을 넓히는 구조",
            },
          ].map((c) => (
            <div
              key={c.n}
              className="bg-white border border-[#E3E8EF] border-t-[3px] border-t-[#1A3F6F] px-5 py-[18px]"
            >
              <p className="m-0 mb-1.5 text-[12px] font-extrabold tracking-[2px] text-[#1A3F6F]">
                {c.n}
              </p>
              <p className="m-0 mb-1.5 text-[16px] font-extrabold text-[#111]">{c.t}</p>
              <p className="m-0 text-[14.5px] text-[#444] leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>

        <DocTable
          headers={["이런 상황이라면", "추천 조합"]}
          emphasizeRowIndex={6}
          rows={[
            ["검색에 아무것도 안 뜬다", "1 + 4"],
            ["AI 목적이지만 SEO도 동시에 가져가고 싶다", "1"],
            ["병원을 알리는 게 급하다", "2 + 4"],
            ["환자 신뢰와 재방문이 약하다", "3 + 4"],
            ["검색·신뢰 동시에 잡고 싶다", "1 + 3 + 4"],
            ["서브키워드 커버리지를 더 넓히고 싶다", "4 추가"],
            ["내가 뭘 해야 될지 모르겠다", "상담"],
          ]}
        />

        <P>어떤 조합이든, 원장님 상황에 맞는 시작점은 상담에서 함께 정합니다.</P>
        <P>
          다만 상담은, <Bold>병마장이 아직 그 지역·그 과목을 진행하지 않을 때만</Bold> 가능합니다.
        </P>
      </Section>

      {/* ⑧ 종결 + CTA */}
      <section id="closing" className="scroll-mt-[120px] w-full bg-white">
        <div className="w-full py-14 md:py-16 flex justify-center">
          <div className="w-full max-w-[860px] px-5 md:px-8">
            <div className="text-center max-w-[640px] mx-auto">
              <p className="text-[19px] font-extrabold text-[#111] mb-2 leading-snug">
                광고는 멈추면 사라집니다.
              </p>
              <p className="text-[19px] font-extrabold text-[#1A3F6F] mb-2 leading-snug">
                쌓인 신뢰는 사라지지 않습니다.
              </p>
              <p className="text-[19px] font-extrabold text-[#111] mb-0 leading-snug">
                디지털 자산은 선점한 병원이 독식합니다.
              </p>
            </div>

            <div className="mt-9 mx-auto max-w-[660px] bg-[#F7F9FC] border border-[#E3E8EF] border-l-[3px] border-l-[#CC2222] px-[22px] py-5">
              <p className="m-0 mb-2 text-[15.5px] text-[#333]">
                병마장은 <Bold>같은 지역 · 같은 진료과목을 단 한 곳만</Bold> 진행합니다.
              </p>
              <p className="m-0 mb-2 text-[15.5px] text-[#333]">
                원장님이 망설이는 지금도, 옆 동네 같은 과목 원장님은 위 사례를 보고 있을 수
                있습니다.
              </p>
              <p className="m-0 text-[15.5px] text-[#333]">
                먼저 자리를 잡은 병원이 그 지역의 검색과 AI를 가져갑니다.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-[#1A3F6F] text-center px-6 py-11 md:py-12">
          <p className="m-0 mb-6 text-[21px] font-extrabold text-white">
            아직 이 자리가 비어 있을 때 확인하세요
          </p>
          <CtaPair variant="onNavy" />
          <p className="mt-[18px] mb-0 text-[13px] text-[#A9C6E6]">
            지역과 진료과목만 보내주시면 진행 가능 여부를 확인해 답변드립니다.
          </p>
          <p className="mt-3 mb-0 text-[12px] text-[#8FB2DA]">
            <a href={FORM_URL} className="underline" target="_blank" rel="noreferrer">
              문의폼
            </a>
            {" · "}
            <a href={KAKAO_URL} className="underline" target="_blank" rel="noreferrer">
              카카오톡 채널
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
