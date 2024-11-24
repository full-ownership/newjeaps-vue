<template>
  <div class="flex border-b mb-6">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('changeTab', tab.id)"
      :class="[
        'px-6 py-2 font-medium',
        activeTab === tab.id ? 'border-b-4  border-[#5995ED] text-black' : 'text-gray-500',
      ]"
      class="transition"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
});
</script>
