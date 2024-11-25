import { defineStore } from "pinia";
import axios from "axios";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    },
    activeTab: "news",
    newsDetail: null,
  }),

  actions: {
    async fetchNews() {
      try {
        console.log("News 데이터 요청 시작");

        const response = await axios.get("https://back.newjeaps.com/api/news", {
          params: {
            currentPage: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
          },
          withCredentials: true,
        });

        console.log("api 응답: ", response.data);

        const responseData = response.data.data || {};
        this.news = responseData.content || [];
        console.log("News 데이터: ", this.news);

        this.pagination = {
          ...this.pagination,
          totalItems: responseData.pagination?.totalItems || 0,
          totalPages: responseData.pagination?.totalPages || 0,
        };
      } catch (error) {
        console.error("News 데이터를 가져오는 중 오류 발생: ", error);
      }
    },

    setPage(page) {
      this.pagination.currentPage = page;
      this.fetchNews();
    },

    setActiveTab(tab) {
      console.log("탭 변경: ", tab);
      this.activeTab = tab;
    },
  },
});
