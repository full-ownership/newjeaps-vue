<script setup>
import { ref, computed } from 'vue';

defineProps({
  imgUrl : String,
  id: String,
  jibun: String, // int → Number
  buildingUse: String,
  buildingName: String,
  districtName: String,
  legalName: String,
  minPropertyPrice: Number, // double → Number
  maxPropertyPrice: Number  // double → Number
});

// 전달받은 imgUrl이 없을 경우 랜덤 이미지를 설정
// const imgUrl = ref(null); // imgUrl이 null로 초기화
// 랜덤 이미지를 반환하는 computed
// 랜덤 이미지를 설정하는 변수
const randomImg = new URL(`../assets/img/home/home (${Math.floor(Math.random() * 21) + 1}).jpeg`, import.meta.url).href;


</script>

<style scoped>
/* TailwindCSS 스타일을 사용하기 때문에 별도의 추가 스타일은 필요하지 않습니다. */
</style>

<template>
  <div class="w-[360px] mx-auto p-1 mb-1">

    <div class="bg-white border-b-1 border-gray-100 flex flex-row py-3">

        <!-- 이미지 섹션 -->
        <div class="bg-pink-100 w-28 h-28 mx-2">
        <!-- imgUrl이 있으면 imgUrl 사용, 없으면 randomImage -->
        <img v-if="imgUrl" :src="imgUrl" alt="이미지" class="w-full h-full object-cover" />
        <img v-else :src="randomImg" alt="랜덤 이미지" class="w-full h-full object-cover" />
      </div>

      <div class="ml-2">
        <span class="inline-flex mb-1 items-center text-xxs w-auto text-gray-600 border-2 border-gray-200 bg-white rounded-lg px-2 text-center">
          {{ buildingUse }}</span>
        <h5 class="text-lg font-bold text-gray-800 pl-1">{{ buildingName }}</h5>
        <div class="pl-1">
          <span class="text-sm text-gray-600">
            {{ districtName }}&nbsp;</span>
          <span class="text-sm text-gray-600">
            {{ legalName }}&nbsp;</span>
          <span class="text-sm text-gray-600">
            {{ jibun }}</span>
        </div>
          <div class="pl-1 mt-1 flex flex-row justify-center">
            <div class="flex justify-center">
              <span class="bg-blue-500 text-white text-xxs px-2 py-1 mr-1 text-center">
              매매가
              </span>
            </div>
            <div class="px-2">
              <span class="text-sm">{{ minPropertyPrice }}</span>
              <span class="text-md">천만원</span>
              <span class="text-md"> - </span>
              <span class="text-sm">{{ maxPropertyPrice }}</span>
              <span class="text-md">천만원</span>
            </div>

          </div>

        <!-- 버튼 -->
      </div>
    </div>
  </div>
</template>

