<script setup>
import TabBar from "@/Component/Notice/TabBar.vue";
import MainInfo from "@/Component/Notice/MainInfo.vue";
import { useRouter } from 'vue-router';
import NoticeList from "@/Component/Notice/NoticeList.vue";
import FAQList from "@/Component/Notice/FAQList.vue";
import NewsList from "@/Component/Notice/NewsList.vue";
import { useNoticeStore } from "@/stores/notice";
import { computed, onMounted } from "vue";
import { useUserStore } from '@/stores/userStore'; // Pinia 스토어 import

const store = useNoticeStore();
const activeTab = computed(() => store.activeTab);
const setActiveTab = store.setActiveTab;

const tabs = [
  { id: "mainInfo", name: "공지사항" },
  { id: "notice", name: "최신 뉴스" },
  { id: "faq", name: "자주 묻는 질문" },
];

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUserInfo();
});

const goWrite = () =>{
  router.push({ name: "admin" });
}



</script>

<template>
  <div class="container mx-auto px-4 py-8">
    
    <!-- 페이지 타이틀 -->
    <h1 class="text-3xl font-bold mb-6">고객센터</h1>

    <!-- 탭 네비게이션 -->
    <TabBar :tabs="tabs" :activeTab="activeTab" @changeTab="setActiveTab" />
    <!--회원일때만 표시됨-->
    <div v-if="userStore.userInfos.data.role=='USER'" class="flex justify-end">
      <button @click="goWrite" class="bg-blue-600 px-4 py-2 rounded-lg text-white">글쓰기</button>
    </div>

    <!-- 주요 안내 -->
    <div v-if="activeTab === 'mainInfo'" class="py-6">
      <MainInfo />
    </div>

    <!-- 공지사항 -->
    <div v-else-if="activeTab === 'notice'" class="py-6">
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
