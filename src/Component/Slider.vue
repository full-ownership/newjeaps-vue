<template>
    <div>
      <Slider v-model="value" :min="0" :max="100" :step="10" tooltips />
      <div>선택된 값: {{ value }}</div>
    </div>
  </template>
  
  <script>
  import Slider from '@vueform/slider';
  import '@vueform/slider/themes/default.css'; // 테마 파일 추가
  
  export default {
    components: {
      Slider,
    },
    data() {
      return {
        value: 30, // 초기 값 설정
      };
    },
  };
  </script>
  
  <style>
  /* 스타일 추가 */
  </style>
  