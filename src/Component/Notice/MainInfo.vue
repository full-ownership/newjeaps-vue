<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- 최신 공지사항 및 뉴스 -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">최신 공지사항 및 뉴스</h2>
        <a href="#" class="text-sm text-blue-500 hover:underline">더보기</a>
      </div>
      <ul class="space-y-4">
        <li
          v-for="notice in notices"
          :key="notice.id"
          class="flex justify-between items-start border-b pb-2"
        >
          <div>
            <p class="text-sm font-bold text-gray-700">{{ notice.category }}</p>
            <p class="text-base font-medium text-gray-900">{{ notice.title }}</p>
          </div>
          <span class="text-sm text-gray-500">{{ notice.date }}</span>
        </li>
      </ul>
    </div>

    <!-- 자주 묻는 질문 -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">자주 묻는 질문 TOP 5</h2>
        <a href="#" class="text-sm text-blue-500 hover:underline">더보기</a>
      </div>
      <ul class="space-y-4">
        <li
          v-for="faq in faqs"
          :key="faq.id"
          class="border-b pb-2"
        >
          <p class="text-base font-medium text-gray-900">{{ faq.question }}</p>
          <p class="text-sm text-gray-500">{{ faq.answer }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";

const store = useNoticeStore();
const { notices, faqs } = store;
</script>

<style scoped>
/* 추가 스타일은 필요에 따라 정의하세요 */
</style>
