<template>
  <div class="p-4 max-w-md mx-auto">
    <h3 class="text-lg font-semibold mb-4">범위 선택</h3>

    <!-- Range Slider -->
    <div class="flex flex-col">
      <input
        type="range"
        v-model="range.min"
        :min="minValue"
        :max="maxValue"
        class="slider accent-blue-500"
        @input="ensureRange"
      />
      <input
        type="range"
        v-model="range.max"
        :min="minValue"
        :max="maxValue"
        class="slider accent-blue-500 mt-2"
        @input="ensureRange"
      />
    </div>

    <!-- 선택된 범위 출력 -->
    <div class="mt-4">
      <p>선택된 최소값: <span class="font-bold">{{ range.min }}</span></p>
      <p>선택된 최대값: <span class="font-bold">{{ range.max }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minValue: 0, // 슬라이더의 최소값
      maxValue: 100, // 슬라이더의 최대값
      range: {
        min: 20, // 초기 최소값
        max: 80, // 초기 최대값
      },
    };
  },
  methods: {
    ensureRange() {
      // 최소값이 최대값보다 크지 않도록 강제
      if (this.range.min > this.range.max) {
        this.range.min = this.range.max;
      }
    },
  },
};
</script>

<style>
.slider {
  appearance: none;
  width: 100%;
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
}
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
}
</style>
