<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Introduction1 from '@/Component/Introduction/Introduction1.vue';
import Introduction2 from '@/Component/Introduction/Introduction2.vue';
import Mouse from '@/Component/Mouse.vue';

const currentComponent = ref(1); // 현재 표시할 컴포넌트

// 스크롤 이벤트 핸들러 함수
const handleScroll = () => {
  const scrollPos = window.scrollY;  // 현재 스크롤 위치 확인
  console.log("현재 스크롤 위치: ", scrollPos);  // 스크롤 위치 로그 확인


  if (scrollPos > 500) {
    currentComponent.value = 2; // 두 번째 컴포넌트
  } else {
    currentComponent.value = 1; // 첫 번째 컴포넌트
  }
};

onMounted(() => {
  // 스크롤 이벤트 리스너 등록
  window.addEventListener('scroll', handleScroll);
  console.log("스크롤 이벤트 리스너 등록됨");
});

onBeforeUnmount(() => {
  // 스크롤 이벤트 리스너 해제
  window.removeEventListener('scroll', handleScroll);
  console.log("스크롤 이벤트 리스너 해제됨");
});
</script>

<template>
  <div id="introduction_container" class="pt-24 h-[100vh]  bg-pink-100 flex flex-col justify-center ">

    <div class="mt-[12.5%] ">
      <Introduction1 />
    </div>

    <div class="mt-auto mb-8">
      <Mouse></Mouse>
    </div>
  </div>
</template>
