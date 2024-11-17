<script setup>
import NoticeList from '@/Component/Notice/NoticeList.vue'

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 타이틀 -->
    <h1 class="text-3xl font-bold mb-6">공지사항</h1>

    <!-- 탭 네비게이션 -->
     <!-- <TabNavigation /> -->

    <!-- 공지사항 리스트 -->
    <div class="w-full mt-6">
      <NoticeList />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px; 
}
</style>
