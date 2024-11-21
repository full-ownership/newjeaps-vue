<template>
  <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <h3 class="font-bold text-lg">{{ item.title }}</h3>
    <p class="text-gray-500 text-sm mt-2">{{ item.date }}</p>
    <p class="text-gray-700 mt-4">{{ item.category }}</p>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
