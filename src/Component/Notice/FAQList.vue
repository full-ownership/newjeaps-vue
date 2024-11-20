<template>
  <div>
    <h2 class="text-xl font-bold mb-4">자주 묻는 질문</h2>
    <ul class="space-y-4">
      <FAQItem v-for="faq in faqs" :key="faq.id" :faq="faq" />
    </ul>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";
import FAQItem from "./FAQItem.vue";

const store = useNoticeStore();
const { faqs } = store;
</script>
