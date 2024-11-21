<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- 공지사항 제목 및 더보기 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-800">공지사항</h2>
    </div>

    <!-- 공지사항 리스트 -->
    <ul class="space-y-6">
      <li
        v-for="notice in paginatedNotices"
        :key="notice.id"
        class="neumorphic-card p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
      >
        <div>
          <!-- 공지사항 제목 -->
          <p class="text-lg font-bold text-gray-900">{{ notice.title }}</p>
          <!-- 카테고리 및 날짜 -->
          <div class="flex justify-between text-sm text-gray-500 mt-2">
            <span>{{ notice.category }}</span>
            <span>{{ notice.date }}</span>
          </div>
          <!-- 공지사항 내용 -->
          <p class="text-sm text-gray-700 mt-3">{{ notice.description }}</p>
        </div>
      </li>
    </ul>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-8 space-x-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="{
          'neumorphic-button-active': currentPage === page,
          'neumorphic-button': currentPage !== page,
        }"
        class="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg active:shadow-inner"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 공지사항 더미 데이터
const notices = ref([
  {
    id: 1,
    title: "서비스 점검 안내",
    category: "시스템 점검",
    date: "2024-11-21",
    description: "11월 23일 오전 2시부터 6시까지 시스템 점검이 예정되어 있습니다.",
  },
  {
    id: 2,
    title: "신규 기능 업데이트",
    category: "공지",
    date: "2024-11-20",
    description: "새로운 대시보드 기능이 추가되었습니다. 많은 이용 부탁드립니다.",
  },
  {
    id: 3,
    title: "이용약관 변경 안내",
    category: "법적 안내",
    date: "2024-11-15",
    description: "12월 1일부터 적용되는 새로운 이용약관을 확인해주세요.",
  },
  {
    id: 4,
    title: "회원 가입 이벤트",
    category: "이벤트",
    date: "2024-11-10",
    description: "회원 가입 이벤트가 진행 중입니다. 지금 가입하고 특별한 혜택을 받아보세요!",
  },
  {
    id: 5,
    title: "긴급 공지: 서비스 장애 복구",
    category: "긴급 공지",
    date: "2024-11-05",
    description: "서버 장애로 인해 불편을 끼쳐드려 죄송합니다. 현재 복구 작업이 완료되었습니다.",
  },
  {
    id: 6,
    title: "신규 서버 배포",
    category: "시스템 점검",
    date: "2024-11-03",
    description: "신규 서버가 성공적으로 배포되었습니다. 성능이 향상되었습니다.",
  },
  {
    id: 7,
    title: "보안 업데이트",
    category: "보안",
    date: "2024-10-28",
    description: "중요 보안 패치가 적용되었습니다. 최신 버전을 확인해주세요.",
  },
]);

// 페이지네이션 상태
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = ref(3); // 페이지당 항목 수

// 페이지네이션 계산
const totalPages = computed(() => Math.ceil(notices.value.length / itemsPerPage.value));

// 현재 페이지에 해당하는 공지사항만 필터링
const paginatedNotices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return notices.value.slice(start, end);
});
</script>

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
