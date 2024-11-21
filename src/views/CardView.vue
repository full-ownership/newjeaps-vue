<template>
  <div class="w-[360px] mx-auto p-1 mb-1">
    <div class="bg-white border-b-2 flex flex-row py-3">
      <!-- 이미지 섹션 -->
       <div class="bg-pink-100 w-28 h-28 mx-2">
         이미지
       </div>
      <!-- 내용 섹션 -->
      <div class="ml-2">
        <span class="inline-flex mb-1 items-center text-xxs w-auto text-gray-600 border-2 border-gray-200 bg-white rounded-lg px-2 text-center">
          {{ buildingUse }}</span>
        <h5 class="text-lg font-bold text-gray-800 pl-1">아파트 이름</h5>

        <h5 class="text-lg font-bold text-gray-800 pl-1">{{ buildingName }}</h5>
        <div class="pl-1">
          <span class="text-sm text-gray-600">
            {{ districtName }}</span>
          <span class="text-sm text-gray-600">
            {{ legalName }}</span>
        </div>
          <div class="pl-1">
            <span class="text-md">최소 </span>
            <span class="text-sm">{{ minPropertyPrice }}</span>
            <span class="text-md">만원</span>
            <span class="text-md"> - </span>

            <span class="text-md">최대 </span>

            <span class="text-md">최대</span>

            <span class="text-sm">{{ maxPropertyPrice }}</span>
            <span class="text-md">만원</span>
          </div>

        <!-- 버튼 -->
      </div>
    </div>
  </div>
</template>

<script setup>

// export default {
//   props: {
//     image: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     buttonText: {
//       type: String,
//       default: "Click Me",
//     },
//   },
//   methods: {
//     onButtonClick() {
//       this.$emit("button-click");
//     },
//   },
// };

defineProps({
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
