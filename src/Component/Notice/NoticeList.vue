<template>
  <div>
    <h2 class="text-xl font-bold mb-4">공지사항</h2>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NoticeItem
        v-for="item in notices"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup>
import { useNoticeStore } from "@/stores/notice";
import NoticeItem from "./NoticeItem.vue";

const store = useNoticeStore();
const { notices } = store;
</script>
