<script setup>
import { ref } from "vue";
import { useNoticeStore } from "@/stores/notice";
import { useRouter } from 'vue-router';

const router = useRouter();

// Pinia 스토어 인스턴스 생성
const noticeStore = useNoticeStore();

// 검색 키워드 상태
const searchKeyword = ref("");

// 공지사항 데이터 초기 로드
noticeStore.fetchNotices();

// 검색 실행
const searchNotices = () => {
  noticeStore.setKeyword(searchKeyword.value);
};

//디테일 가즈아
const goToDetail = (noticeId) => {
  router.push(`/notice/noticeDetail/${noticeId}`);
}

</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- 제목 및 검색 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">공지사항</h2>
      <div>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="검색어를 입력하세요"
          class="border rounded-lg px-4 py-2 mr-2"
        />
        <button @click="searchNotices" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          검색
        </button>
      </div>
    </div>

    <!-- 공지사항 리스트 -->
    <ul class="space-y-6">
      <li
        v-for="notice in noticeStore.notices"
        :key="notice.noticeId"
        class="neumorphic-card p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
        @click="goToDetail(notice.noticeId)"
      >
        <div>
          <!-- 공지사항 제목 -->
          <p class="text-lg font-bold text-gray-900">{{ notice.title }}</p>
          <!-- 작성일 및 조회수 -->
          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <span>작성일: {{ notice.createdAt }}</span>
            <span>조회수: {{ notice.views }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-4">
      <button
        v-for="page in noticeStore.pagination.totalPages"
        :key="page"
        @click="noticeStore.setPage(page)"
        :class="{
          'neumorphic-button-active': noticeStore.pagination.currentPage === page,
          'neumorphic-button': noticeStore.pagination.currentPage !== page,
        }"
        class="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg active:shadow-inner"
      >
        {{ page }}
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

/* 버튼 스타일 */
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

.neumorphic-button:active {
  box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.9);
  transform: scale(0.98);
}
</style>
