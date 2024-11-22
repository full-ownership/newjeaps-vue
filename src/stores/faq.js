import { defineStore } from "pinia";
import axios from "axios";

export const useFaqStore = defineStore("faq", {
  state: () => ({
    faqs: [], // FAQ 목록
    pagination: {
      currentPage: 1, // 현재 페이지
      pageSize: 10, // 페이지당 항목 수
      totalItems: 0, // 전체 FAQ 수
      totalPages: 0, // 전체 페이지 수
    },
    keyword: "", // 검색 키워드
    activeTab: "faqInfo", // 기본 활성화 탭
    faqDetail: null, // FAQ 상세 데이터
  }),

  actions: {
    // FAQ 목록 가져오기
    async fetchFaqs() {
      try {
        console.log("FAQ 데이터 요청 시작");
        const response = await axios.get("https://back.newjeaps.com/api/service/faq", {
          params: {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            keyword: this.keyword || null,
          },
        });
        console.log("API 응답:", response.data);

        const responseData = response.data.data;
        this.faqs = responseData.content; // FAQ 목록 업데이트
        console.log("FAQ 데이터:", this.faqs);

        this.pagination = {
          ...this.pagination,
          totalItems: responseData.pagination.totalItems,
          totalPages: responseData.pagination.totalPages,
        };
        console.log("페이지네이션 상태:", this.pagination);
      } catch (error) {
        console.error("FAQ 데이터를 가져오는 중 오류 발생:", error);
      }
    },

    // FAQ 상세 데이터 가져오기
    async fetchFaqDetail(faqId) {
      try {
        console.log("FAQ 상세 데이터 요청 시작:", faqId);
        const response = await axios.get(`https://back.newjeaps.com/api/service/faq/${faqId}`);
        console.log("API 응답 (상세):", response.data);
        this.faqDetail = response.data.data; // 상세 FAQ 데이터 저장
      } catch (error) {
        console.error("FAQ 상세 데이터를 가져오는 중 오류 발생:", error);
      }
    },

    // 페이지 변경
    setPage(page) {
      this.pagination.currentPage = page;
      this.fetchFaqs();
    },

    // 검색 키워드 설정
    setKeyword(keyword) {
      this.keyword = keyword;
      this.pagination.currentPage = 1;
      this.fetchFaqs();
    },

    // 활성화된 탭 설정
    setActiveTab(tab) {
      console.log("탭 변경:", tab);
      this.activeTab = tab;
    },
  },
});
