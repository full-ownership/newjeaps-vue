<template>
  <div>
    <h2 class="text-lg font-bold mb-4">자주 묻는 질문 TOP 5</h2>
    <ul class="space-y-4">
      <li
        v-for="faq in faqs"
        :key="faq.id"
        class="border-b pb-2"
      >
        <!-- 질문 -->
        <p class="text-base font-medium text-gray-900">{{ faq.question }}</p>
        <!-- 답변 -->
        <p class="text-sm text-gray-500">{{ faq.answer }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";

const store = useNoticeStore();
const { faqs } = store;
</script>

