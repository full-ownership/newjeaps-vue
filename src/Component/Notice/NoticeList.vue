<template>
  <div>
    <h2 class="text-lg font-bold mb-4">최신 공지사항 및 뉴스</h2>
    <ul class="space-y-4">
      <li
        v-for="notice in notices"
        :key="notice.id"
        class="border-b pb-2"
      >
        <!-- 공지 분류 및 등록일 -->
        <div class="flex justify-between items-center">
          <span class="text-sm font-bold text-gray-700">{{ notice.category }}</span>
          <span class="text-sm text-gray-500">{{ notice.date }}</span>
        </div>
        <!-- 공지 제목 -->
        <p class="text-base font-medium text-gray-900">{{ notice.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";

const store = useNoticeStore();
const { notices } = store;
</script>

