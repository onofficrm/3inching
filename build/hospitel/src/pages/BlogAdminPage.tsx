import { Eye, Save, Send } from "lucide-react";
import { Link } from "react-router-dom";

export function BlogAdminPage() {
  return (
    <div className="w-full flex flex-col items-center bg-bg-sub min-h-screen">
      
      {/* Simple Header for Admin */}
      <section className="w-full bg-[#102B4E] py-8 flex justify-center text-white">
        <div className="w-full max-w-[1200px] px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/60 mb-2">
             <Link to="/" className="hover:text-white transition-colors">홈</Link>
             <span>/</span>
             <Link to="/blog" className="hover:text-white transition-colors">인사이트</Link>
             <span>/</span>
             <span className="text-white">글쓰기 (Admin)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">블로그 에디터</h1>
        </div>
      </section>

      <div className="w-full max-w-[1200px] px-4 md:px-8 flex flex-col lg:flex-row gap-8 py-10">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white border border-border rounded-[12px] shadow-sm p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-bold text-text-main text-[15px]">글 제목</label>
              <input 
                type="text" 
                id="title" 
                placeholder="직관적이고 매력적인 제목을 입력하세요" 
                className="p-3 border border-border rounded-[6px] text-lg font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="font-bold text-text-main text-[14px]">URL 슬러그</label>
              <div className="flex items-center">
                <span className="bg-gray-100 border border-r-0 border-border rounded-l-[6px] px-3 py-3 text-text-sub text-[14px]">
                  byungmajang.com/blog/
                </span>
                <input 
                  type="text" 
                  id="slug" 
                  placeholder="how-to-marketing-hospital" 
                  className="flex-1 p-3 border border-border rounded-r-[6px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="summary" className="font-bold text-text-main text-[14px]">요약문</label>
              <textarea 
                id="summary"
                rows={2}
                placeholder="글의 핵심 내용을 2~3줄로 요약해 주세요. 목록 카드에 표시됩니다."
                className="p-3 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none w-full"
              ></textarea>
            </div>

            {/* Editor Area Placeholder */}
            <div className="flex-1 flex flex-col min-h-[400px]">
              <label className="font-bold text-text-main text-[14px] mb-2">본문 에디터</label>
              <div className="border border-border rounded-t-[6px] bg-gray-50 p-2 flex gap-2 items-center mb-0 border-b-0">
                 {/* Toolbar placeholder */}
                 <button className="h-8 w-8 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] font-bold text-text-main">B</button>
                 <button className="h-8 w-8 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] italic text-text-main">I</button>
                 <div className="w-px h-5 bg-border mx-1"></div>
                 <button className="h-8 px-2 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] text-text-main">H2</button>
                 <button className="h-8 px-2 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] text-text-main">H3</button>
                 <div className="w-px h-5 bg-border mx-1"></div>
                 <button className="h-8 px-2 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] text-text-main">이미지</button>
                 <button className="h-8 px-2 bg-white border border-border rounded hover:bg-gray-100 flex items-center justify-center text-[12px] text-text-main">표</button>
              </div>
              <textarea 
                className="flex-1 w-full border border-border rounded-b-[6px] p-4 focus:outline-none focus:ring-1 focus:ring-primary resize-none text-text-main"
                placeholder="본문을 작성하세요..."
              ></textarea>
            </div>
          </div>

          <div className="bg-white border border-border rounded-[12px] shadow-sm p-6 flex flex-col gap-6">
             <h3 className="font-bold text-text-main text-[16px]">SEO (검색엔진 최적화)</h3>
             
             <div className="flex flex-col gap-2">
               <label htmlFor="seo-title" className="font-bold text-text-main text-[14px]">SEO 제목</label>
               <input 
                 type="text" 
                 id="seo-title"
                 placeholder="검색 결과에 노출될 제목 (미입력 시 글 제목 사용)" 
                 className="p-3 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors w-full"
               />
             </div>
             
             <div className="flex flex-col gap-2">
               <label htmlFor="meta-desc" className="font-bold text-text-main text-[14px]">메타 설명</label>
               <textarea 
                 id="meta-desc"
                 rows={3} 
                 className="p-3 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none w-full" 
                 placeholder="검색 결과에 노출될 설명을 160자 이내로 입력하세요. (미입력 시 요약문 사용)"
               ></textarea>
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6">
          <div className="bg-white border border-border rounded-[12px] shadow-sm p-5 flex flex-col gap-4">
             <h3 className="font-bold text-text-main border-b border-border pb-3 text-[16px]">발행 관리</h3>
             
             <div className="grid grid-cols-2 gap-2 mt-2">
               <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-[6px] text-text-main hover:bg-gray-50 transition-colors text-[14px] font-bold">
                 <Save className="w-4 h-4" /> 임시저장
               </button>
               <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-[6px] text-text-main hover:bg-gray-50 transition-colors text-[14px] font-bold">
                 <Eye className="w-4 h-4" /> 미리보기
               </button>
             </div>
             
             <button className="flex items-center justify-center gap-2 h-[48px] bg-primary text-white rounded-[6px] hover:bg-primary/90 transition-colors text-[15px] font-bold w-full mt-2">
               <Send className="w-4 h-4" /> 발행하기
             </button>
          </div>

          <div className="bg-white border border-border rounded-[12px] shadow-sm p-5 flex flex-col gap-4">
             <h3 className="font-bold text-text-main border-b border-border pb-3 text-[16px]">설정</h3>
             
             <div className="flex flex-col gap-2">
               <label className="font-bold text-text-main text-[14px]">공개 상태</label>
               <select className="p-2.5 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary w-full bg-white">
                 <option>공개</option>
                 <option>비공개</option>
                 <option>예약 발행</option>
               </select>
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-bold text-text-main text-[14px]">발행일</label>
               <input type="datetime-local" className="p-2.5 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary w-full bg-white" />
             </div>

             <div className="flex flex-col gap-2">
               <label className="font-bold text-text-main text-[14px]">작성자</label>
               <input type="text" defaultValue="병마장" className="p-2.5 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary w-full bg-white" />
             </div>
             
             <div className="flex flex-col gap-2 mt-2">
               <label className="font-bold text-text-main text-[14px]">카테고리</label>
               <select className="p-2.5 border border-border rounded-[6px] text-[14px] focus:outline-none focus:border-primary w-full bg-white">
                 <option>SEO·GEO</option>
                 <option>AI 검색</option>
                 <option>병원 영상</option>
                 <option>커뮤니티</option>
                 <option>지역 키워드</option>
                 <option>병원 마케팅 사례</option>
               </select>
             </div>

             <div className="flex flex-col gap-2 mt-2">
               <label className="font-bold text-text-main text-[14px]">대표 이미지</label>
               <div className="w-full aspect-[4/3] border-[2px] border-dashed border-border rounded-[6px] flex flex-col items-center justify-center text-text-caption text-[14px] cursor-pointer hover:bg-gray-50 transition-colors">
                 클릭하여 이미지 업로드
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
