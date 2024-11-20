<template>
  <div>
    <h2 class="font-bold text-lg mb-4">주요 안내</h2>
    <ul class="space-y-4">
      <li v-for="info in mainInfo" :key="info.id" class="border p-4 rounded hover:shadow transition">
        <p class="font-bold mb-2">{{ info.title }}</p>
        <p class="text-gray-600">{{ info.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";

const store = useNoticeStore();
const { mainInfo } = store;
</script>
