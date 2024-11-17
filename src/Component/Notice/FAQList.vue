<script setup>
import { ref } from 'vue';

const faqs = ref([
  { category: "회원 정보/계정관리", question: "직원들과 광고상품을 나눠 관리하고 싶어요." },
  { category: "회원 정보/계정관리", question: "하위계정 추가(수정/삭제)는 어디서 하나요." },
  { category: "상품/결제 관리", question: "결제연장이 뭔가요." },
  { category: "매물/광고 관리", question: "임시저장은 어떻게 하나요." },
  { category: "매물/광고 관리", question: "공실매물을 광고하려면 어떻게 해야하나요." },
]);
</script>

<template>
  <ul class="list space-y-2">
    <li v-for="(faq, index) in faqs" :key="index" class="flex justify-between py-2 border-b border-gray-200">
      <span class="text-gray-500 w-1/3">{{ faq.category }}</span>
      <span class="text-gray-900 w-2/3 truncate">{{ faq.question }}</span>
    </li>
  </ul>
</template>

<style scoped>
.list {
  font-size: 0.875rem;
}
</style>
