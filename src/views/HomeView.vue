<script setup>
import apartment from "@/assets/icons/apartment.png";
import villa from "@/assets/icons/villa.png";
import onlyhouse from "@/assets/icons/onlyhouse.png";
import officetel from "@/assets/icons/officetel.png";
import heart from "@/assets/icons/heart.png";
import notice from "@/assets/icons/notice.png";
import ChatbotButton from '@/Component/Chatbot/ChatbotButton.vue'

import { useRouter } from "vue-router";

const router = useRouter();

const goToNotice = () => {
  router.push({ name: "notice" });
};
</script>

<template>
  <div class="flex bg-gray-100 h-[100vh] items-center justify-center
  ">
    <!-- 헤더 높이만큼 상단 패딩 추가 -->
    <div class="w-[75vw] mx-auto flex flex-col  items-center p-12 ">
      <!-- 서치바 영역 -->
      <form class="items-center max-w-lg mx-auto w-2/3 mb-10">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="border text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="검색어를 입력하세요."
            required
          />
        </div>
      </form>

      <!-- 콘텐츠 영역 -->
      <div class="flex flex-col justify-around w-full">
        <div class="grid grid-cols-9 gap-3 w-full">
          <!-- 아파트 카드 -->
          <div class="card bg-white h-40 col-span-3 row-span-2 rounded-lg p-6 cursor-pointer">
            <div class="font-PretendardSemiBold text-xl mb-2">아파트</div>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">아파트 아파트 ~! 아파트는 hold on 아시죠?</p>
            <p class="font-PretendardRegular text-xs text-gray-700">풍부한 단지정보 및 실시간 랭킹까지-</p>
            <div class="flex justify-end">
              <img alt="logo" :src="apartment" class="w-12 mr-0" />
            </div>
          </div>

          <!-- 연립 다세대 카드 -->
          <div class="card bg-white h-40 col-span-2 row-span-2 rounded-lg p-6 cursor-pointer">
            <div class="font-PretendardSemiBold text-xl mb-1">연립 다세대</div>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보</p>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보 여기 다!</p>
            <div class="flex justify-end">
              <img alt="logo" :src="villa" class="w-12 mr-0" />
            </div>
          </div>

          <div class="card bg-white h-50 col-span-4 row-span-3 rounded-lg p-8"></div>

          <!-- 단독/다가구 카드 -->
          <div class="card bg-white h-40 col-span-2 row-span-2 rounded-lg p-8 cursor-pointer">
            <div class="font-PretendardSemiBold text-xl mb-2">단독/다가구</div>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보</p>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보 여기 다!</p>
            <div class="flex justify-end">
              <img alt="logo" :src="onlyhouse" class="w-12 mr-0" />
            </div>
          </div>

          <!-- 오피스텔 카드 -->
          <div class="card bg-white h-40 col-span-3 row-span-2 rounded-lg p-8 cursor-pointer">
            <div class="font-PretendardSemiBold text-xl mb-2">오피스텔</div>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보</p>
            <p class="font-PretendardRegular text-xs text-gray-700 mb-1">오피스텔 정보 여기 다!</p>
            <div class="flex justify-end">
              <img alt="logo" :src="officetel" class="w-10 mr-0" />
            </div>
          </div>

          <!-- 관심목록 카드 -->
          <div class="card bg-white h-20 col-span-2 row-span-1 rounded-lg p-4 cursor-pointer">
            <div class="flex items-center justify-center">
              <img alt="logo" :src="heart" class="w-6 mr-0" />
            </div>
            <div class="font-PretendardRegular text-sm text-center mt-2">관심목록</div>
          </div>

          <!-- 공지사항 카드 -->
          <div
            class="card bg-white h-20 col-span-2 row-span-1 rounded-lg p-4 cursor-pointer"
            @click="goToNotice"
          >
            <div class="flex items-center justify-center">
              <img alt="logo" :src="notice" class="w-6 mr-0" />
            </div>
            <div class="font-PretendardRegular text-sm text-center mt-2">공지사항</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChatbotButton />
</template>

<style scoped>
/* 카드에 hover 애니메이션 추가 */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-3px); /* 살짝 위로 이동 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 옅은 그림자 효과 */
}
</style>
