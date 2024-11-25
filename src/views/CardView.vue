<template>
  <div class="w-[360px] mx-auto p-1 mb-1">
    <div class="bg-white border-b-2 flex flex-row py-3">
      <!-- 이미지 섹션 -->
       <div class="bg-pink-100 w-28 h-28 mx-2">
        <img :src="imgUrl" alt="이미지" class="w-full h-full object-cover" />
       </div>
      <!-- 내용 섹션 -->
      <div class="ml-2">
        <span class="inline-flex mb-1 items-center text-xxs w-auto text-gray-600 border-2 border-gray-200 bg-white rounded-lg px-2 text-center">
          {{ buildingUse }}</span>
        <h5 class="text-lg font-bold text-gray-800 pl-1">{{ buildingName }}</h5>
        <div class="pl-1">
          <span class="text-sm text-gray-600">
            {{ districtName }}</span>
          <span class="text-sm text-gray-600">
            {{ legalName }}</span>
        </div>
          <div class="pl-1 flex flex-row justify-center">
            <div>
              <span class="bg-blue-500 text-white text-xxs px-2 py-1 mr-1 text-center">
              평당가
              </span>
            </div>
            <div class="bg-pink-200 px-2">
              <span class="text-sm">{{ minPropertyPrice }}</span>
              <span class="text-md">만원</span>
              <span class="text-md"> - </span>
              <span class="text-sm">{{ maxPropertyPrice }}</span>
              <span class="text-md">만원</span>
            </div>

          </div>

        <!-- 버튼 -->
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  imgUrl : String,
  id: Number, // int → Number
  buildingUse: String,
  buildingName: String,
  districtName: String,
  legalName: String,
  minPropertyPrice: Number, // double → Number
  maxPropertyPrice: Number  // double → Number
});
</script>

<style scoped>
/* TailwindCSS 스타일을 사용하기 때문에 별도의 추가 스타일은 필요하지 않습니다. */
</style>
