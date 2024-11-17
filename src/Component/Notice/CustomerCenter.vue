<script setup>
import TabNavigation from './TabNavigation.vue';
import NoticeList from './NoticeList.vue';
import FAQList from './FAQList.vue';
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-bold mb-6">고객센터</h1>

    <!-- 탭 네비게이션 -->
    <TabNavigation />

    <!-- 콘텐츠 영역 -->
    <div class="flex mt-8 space-x-8">
      <!-- 최신 공지사항 및 뉴스 리스트 -->
      <div class="w-2/3">
        <h2 class="text-xl font-semibold mb-4">최신 공지사항 및 뉴스</h2>
        <NoticeList />
        <div class="text-right text-gray-400 mt-2 cursor-pointer hover:text-gray-700">더보기</div>
      </div>

      <!-- 자주 묻는 질문 리스트 -->
      <div class="w-1/3">
        <h2 class="text-xl font-semibold mb-4">자주 묻는 질문 TOP 5</h2>
        <FAQList />
        <div class="text-right text-gray-400 mt-2 cursor-pointer hover:text-gray-700">더보기</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
