<script setup>
import { ref } from 'vue';

const notices = ref([
  { title: "다방 '소비자 인지도 1위' 기념 'X배너' 제공 이벤트", date: '2024.09.23', category: "공지사항" },
  { title: "2024년 추석 연휴 휴무 안내", date: '2024.09.13', category: "공지사항" },
  { title: "다방APP 서비스 업데이트: '실거래가정보', '건물세대정보' 제공 (8/27)", date: '2024.08.27', category: "공지사항" },
  { title: "'강남·서초·송파' 다방 지인 소개 이벤트 (8~9월)", date: '2024.08.05', category: "공지사항" },
  { title: "다방 광고 검사 강화: 주택/빌라 매매유형 '미끼성 허위매물'", date: '2024.07.05', category: "공지사항" },
]);
</script>

<template>
  <ul class="list space-y-2">
    <li v-for="(notice, index) in notices" :key="index" class="flex justify-between py-2 border-b border-gray-200">
      <span class="text-gray-500 w-20">{{ notice.category }}</span>
      <span class="text-gray-900 w-2/3 truncate">{{ notice.title }}</span>
      <span class="text-gray-400 text-sm">{{ notice.date }}</span>
    </li>
  </ul>
</template>

<style scoped>
.list {
  font-size: 0.875rem;
}
</style>
