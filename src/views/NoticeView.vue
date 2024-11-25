<script setup>
import TabBar from "@/Component/Notice/TabBar.vue";
import MainInfo from "@/Component/Notice/MainInfo.vue";
import NewsList from "@/Component/Notice/NewsList.vue";
import FAQList from "@/Component/Notice/FAQList.vue";
import { useNoticeStore } from "@/stores/notice";
import { computed } from "vue";

const store = useNoticeStore();
const activeTab = computed(() => store.activeTab);
const setActiveTab = store.setActiveTab;

const tabs = [
  { id: "mainInfo", name: "공지사항" },
  { id: "news", name: "최신 뉴스" },
  { id: "faq", name: "자주 묻는 질문" },
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 페이지 타이틀 -->
    <h1 class="text-3xl font-bold mb-6">고객센터</h1>

    <!-- 탭 네비게이션 -->
    <TabBar :tabs="tabs" :activeTab="activeTab" @changeTab="setActiveTab" />

    <!-- 주요 안내 -->
    <div v-if="activeTab === 'mainInfo'" class="py-6">
      <MainInfo />
    </div>

    <!-- 공지사항 -->
    <div v-else-if="activeTab === 'news'" class="py-6">
      <NewsList />
    </div>

    <!-- 자주 묻는 질문 -->
    <div v-else-if="activeTab === 'faq'" class="py-6">
      <FAQList />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
