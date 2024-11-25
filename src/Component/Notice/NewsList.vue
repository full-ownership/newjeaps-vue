<script setup>
import { computed } from "vue";
import { useNewsStore } from "@/stores/news";

// Pinia 스토어 가져오기
const newsStore = useNewsStore();

// 초기 데이터 로드
newsStore.fetchNews();

// 현재 페이지에 보여질 뉴스 리스트 계산
const newsList = computed(() => newsStore.news);

// 동적 페이지네이션 계산
const visiblePages = computed(() => {
  const totalPages = newsStore.pagination.totalPages;
  const currentPage = newsStore.pagination.currentPage;
  const maxVisiblePages = 5; // 표시할 최대 페이지 수

  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

// 페이지 이동 함수
const goToPage = (page) => {
  if (page !== newsStore.pagination.currentPage && page > 0 && page <= newsStore.pagination.totalPages) {
    newsStore.setPage(page);
    newsStore.fetchNews(); // 페이지 변경 후 뉴스 데이터를 다시 로드
  }
};
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- 제목 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">최신 부동산 뉴스</h2>
    </div>

    <!-- 뉴스 리스트 -->
    <ul class="space-y-6">
      <li
        v-for="news in newsList"
        :key="news.newsId"
        class="neumorphic-card p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
      >
        <div>
          <!-- 뉴스 제목 -->
          <a
            :href="news.link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-lg font-bold text-blue-600 hover:underline"
            @click.stop
          >
            {{ news.title }}
          </a>
          <p class="text-sm text-gray-700 mt-2">{{ news.description }}</p>
          <!-- 작성일 -->
          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <span>작성일: {{ new Date(news.pubDate).toLocaleDateString() }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-2">
      <!-- 이전 버튼 -->
      <button
        @click="goToPage(newsStore.pagination.currentPage - 1)"
        :disabled="newsStore.pagination.currentPage === 1"
        class="neumorphic-button px-4 py-2"
      >
        이전
      </button>

      <!-- 동적 페이지 번호 -->
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="{
          'neumorphic-button-active': newsStore.pagination.currentPage === page,
          'neumorphic-button': newsStore.pagination.currentPage !== page,
        }"
        class="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg"
      >
        {{ page }}
      </button>

      <!-- 다음 버튼 -->
      <button
        @click="goToPage(newsStore.pagination.currentPage + 1)"
        :disabled="newsStore.pagination.currentPage === newsStore.pagination.totalPages"
        class="neumorphic-button px-4 py-2"
      >
        다음
      </button>
    </div>
  </div>
</template>


<style scoped>
/* 뉴모피즘 카드 스타일 */
.neumorphic-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1), -10px -10px 20px rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.neumorphic-card:hover {
  box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.2), -15px -15px 30px rgba(255, 255, 255, 0.9);
  transform: scale(1.02);
}

.neumorphic-button {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.1), -6px -6px 12px rgba(255, 255, 255, 0.8);
  color: #333;
  transition: all 0.3s ease-in-out;
}

.neumorphic-button:hover {
  box-shadow: inset 6px 6px 12px rgba(0, 0, 0, 0.1), inset -6px -6px 12px rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

.neumorphic-button-active {
  background: #5995ed;
  color: white;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.8);
}

.neumorphic-button:disabled {
  background: #f0f0f0;
  color: #aaa;
  cursor: not-allowed;
}
</style>
