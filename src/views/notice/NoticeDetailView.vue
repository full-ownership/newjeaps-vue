<script setup>
import { useNoticeStore } from "@/stores/notice";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// Pinia 스토어 및 현재 라우트 가져오기
const noticeStore = useNoticeStore();
const route = useRoute();

// 공지사항 ID 가져오기
const noticeId = route.params.id;

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  noticeStore.fetchNoticeDetail(noticeId);
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 공지사항 제목 -->
    <div class="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mt-20">
      <h1 class="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-4">
        {{ noticeStore.noticeDetail?.title }}
      </h1>

      <!-- 작성일 및 조회수 -->
      <div class="text-sm text-gray-500 flex justify-between items-center mb-6">
        <p>작성일: <span class="font-medium">{{ noticeStore.noticeDetail?.createdAt }}</span></p>
        <p>조회수: <span class="font-medium">{{ noticeStore.noticeDetail?.views }}</span></p>
      </div>

      <!-- 공지사항 내용 -->
      <div class="text-gray-800 leading-relaxed">
        <p>{{ noticeStore.noticeDetail?.content }}</p>
      </div>

      <!-- 뒤로가기 버튼 -->
      <div class="mt-8 text-center">
        <router-link
          to="/notice"
          class="bg-[#5995ED] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          목록으로 돌아가기
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.bg-gray-50 {
  background-color: #f9fafb;
}


.mt-20 {
  margin-top: 5rem;
}
</style>
