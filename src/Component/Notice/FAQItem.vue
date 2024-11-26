<template>
  <li class="border p-4 rounded hover:shadow transition">
    <h3 class="font-bold text-lg">{{ faq.question }}</h3>
    <p class="text-gray-600 mt-2">{{ faq.answer }}</p>
  </li>
</template>

<script setup>
defineProps({
  faq: {
    type: Object,
    required: true,
  },
});
</script>
