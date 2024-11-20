<script setup>
import TabBar from "@/Component/Notice/TabBar.vue";
import NoticeList from "@/Component/Notice/NoticeList.vue";
import FAQList from "@/Component/Notice/FAQList.vue";
import CustomerCenter from "@/Component/Notice/CustomerCenter.vue";

import { useNoticeStore } from "@/stores/notice";
import { computed } from "vue";

const store = useNoticeStore();

// 상태와 액션 가져오기
const activeTab = computed(() => store.activeTab); // 상태를 반응형으로 설정
const setActiveTab = store.setActiveTab;

// 탭 데이터
const tabs = [
  { id: "notice", name: "공지사항" },
  { id: "faq", name: "자주 묻는 질문" },
  { id: "mainInfo", name: "주요 안내" },
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-bold mb-6">고객센터</h1>

    <!-- 탭 네비게이션 -->
    <TabBar :tabs="tabs" :activeTab="activeTab" @changeTab="setActiveTab" />

    <!-- 탭별 콘텐츠 -->
    <transition name="fade" mode="out-in">
      <div :key="activeTab">
        <div v-if="activeTab === 'notice'">
          <NoticeList />
        </div>
        <div v-else-if="activeTab === 'faq'">
          <FAQList />
        </div>
        <div v-else-if="activeTab === 'mainInfo'">
          <CustomerCenter />
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}

/* 애니메이션 스타일 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
