<script setup>
import {useFaqStore} from '@/stores/faq';
import { useRouter } from 'vue-router';

const router = useRouter();
const faqStore = useFaqStore();

faqStore.fetchFaqs();

const goToDetail = (faqId) => {
  router.push(`/notice/faqDetail/${faqId}`);
}


</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- 제목 및 검색 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">공지사항</h2>
    </div>

    <!-- 공지사항 리스트 -->
    <ul class="space-y-6">
      <li
        v-for="faq in faqStore.faqs"
        :key="faq.faqId"
        class="neumorphic-card p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
        @click="goToDetail(faq.faqId)"
      >
        <div>
          <!-- 공지사항 제목 -->
          <p class="text-lg font-bold text-gray-900">{{ faq.question }}</p>
          <!-- 작성일 및 조회수 -->
        </div>
      </li>
    </ul>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-4">
      <button
        v-for="page in faqStore.pagination.totalPages"
        :key="page"
        @click="faqStore.setPage(page)"
        :class="{
          'neumorphic-button-active': faqStore.pagination.currentPage === page,
          'neumorphic-button': faqStore.pagination.currentPage !== page,
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

/* 뉴모피즘 버튼 스타일 */
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
