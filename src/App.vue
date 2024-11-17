<script setup>
import HeaderView from '@/Component/HeaderView.vue'
import FooterView from '@/Component/FooterView.vue'
import MainView from '@/views/MainView.vue'
import { RouterView } from 'vue-router'
import RecommendationView from '@/views/RecommendationView.vue'

</script>

<template>
  <div>
       <!-- <HeaderView /> -->
    <HeaderView />
    <MainView />
    <!-- <RecommendationView /> -->
    <FooterView />
  </div>
</template>
<style scoped>
</style>
