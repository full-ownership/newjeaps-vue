import { defineStore } from "pinia";

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    activeTab: "notice", // 기본 활성화 탭
    mainInfo: [
      { id: 1, title: "운영 시간 안내", description: "평일 09:00 ~ 18:00" },
      { id: 2, title: "고객센터 번호", description: "문의 전화: 1899-1234" },
    ],
    notices: [
      { id: 1, category: "공지사항", title: "다방 소식과 함께하는 특별 기획 이벤트", date: "2024.09.23" },
      { id: 2, category: "공지사항", title: "2024년 추석 연휴 안내", date: "2024.09.13" },
      { id: 3, category: "공지사항", title: "다방 APP 서비스 업데이트 안내", date: "2024.08.27" },
    ],
    faqs: [
      { id: 1, question: "회원 가입은 어떻게 하나요?", answer: "회원 가입은 로그인 화면에서 가능합니다." },
      { id: 2, question: "결제 관련 문의는 어디서 하나요?", answer: "결제 관련 문제는 고객센터에서 도와드립니다." },
    ],
  }),

  actions: {
    setActiveTab(tabId) {
      this.activeTab = tabId; // 탭 상태 업데이트
    },
  },
});
