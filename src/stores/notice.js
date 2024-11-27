
import { defineStore } from "pinia";
import axios from "axios";

export const useNoticeStore = defineStore("notice", {
  state: () => ({
    notices: [],
    faqs: [],
    pagination: {
      currentPage: 1, // 현재 페이지
      pageSize: 10, // 페이지당 항목 수
      totalItems: 0, // 전체 공지사항 수
      totalPages: 0, // 전체 페이지 수
    },
    keyword: "", // 검색 키워드..?
    activeTab: "mainInfo", // 기본 활성화 탭
    noticeDetail: null, // 공지사항 상세 데이터
  }),

  actions: {
    // 공지사항 목록 가져오기
    async fetchNotices() {
      try {
        console.log("공지사항 데이터 요청 시작");
        const response = await axios.get("https://back.newjeaps.com/api/service/notice", {
          params: {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            keyword: this.keyword || null,
          },
        });
        console.log("API 응답:", response.data);

        const responseData = response.data.data;
        this.notices = responseData.content;
        console.log("공지사항 데이터:", this.notices);

        this.pagination = {
          ...this.pagination,
          totalItems: responseData.pagination.totalItems,
          totalPages: responseData.pagination.totalPages,
        };
        console.log("페이지네이션 상태:", this.pagination);
      } catch (error) {
        console.error("공지사항 데이터를 가져오는 중 오류 발생:", error);
      }
    },

    // 공지사항 상세 데이터 가져오기
    async fetchNoticeDetail(noticeId) {
      try {
        console.log("공지사항 상세 데이터 요청 시작:", noticeId);
        const response = await axios.get(`https://back.newjeaps.com/api/service/notice/${noticeId}`);
        console.log("API 응답 (상세):", response.data);
        this.noticeDetail = response.data.data; // 상세 공지 데이터 저장
      } catch (error) {
        console.error("공지사항 상세 데이터를 가져오는 중 오류 발생:", error);
      }
    },





    // 페이지 변경
    setPage(page) {
      this.pagination.currentPage = page;
      this.fetchNotices();
    },

    // 검색 키워드 설정
    setKeyword(keyword) {
      this.keyword = keyword;
      this.pagination.currentPage = 1;
      this.fetchNotices();
    },

    // 활성화된 탭 설정
    setActiveTab(tab) {
      console.log("탭 변경:", tab);
      this.activeTab = tab;
    },
  },
});
