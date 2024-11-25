<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import house1 from "@/assets/image/h1.jpg";
import house2 from "@/assets/image/h2.jpg";
import house3 from "@/assets/image/h3.jpg";

const recommendations = [
  {
    image: house1,
    title: "빌라 500/37",
    description: "천안시 서북구 쌍용동 | 7분 거리 | 주차공간 완비",
  },
  {
    image: house2,
    title: "원룸 300/33",
    description: "천안시 동남구 용곡동 | 역세권 | 넓은 공간",
  },
  {
    image: house3,
    title: "투룸 700/50",
    description: "공주시 중동 | 테라스 포함 | 애완동물 가능",
  },
  {
    image: house1,
    title: "오피스텔 전세 1억",
    description: "아산시 배방읍 | 최신 인테리어 | 5분 거리",
  },
  {
    image: house2,
    title: "원룸 전세 1억2천",
    description: "천안시 성정동 | 복층 구조 | 현대식 인테리어",
  },
  {
    image: house3,
    title: "투룸 600/40",
    description: "공주시 산성동 | 테라스 포함 | 주차 공간 확보",
  },
];

const currentIndex = ref(0); // 현재 슬라이드 인덱스
const intervalId = ref(null); // 자동 슬라이드 타이머 ID

// 다음 슬라이드로 이동
const nextSlide = () => {
  currentIndex.value =
    (currentIndex.value + 1) % Math.ceil(recommendations.length / 3);
};

// 이전 슬라이드로 이동
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + Math.ceil(recommendations.length / 3)) %
    Math.ceil(recommendations.length / 3);
};

// 자동 슬라이드 설정
const startAutoScroll = () => {
  intervalId.value = setInterval(nextSlide, 4000); // 4초마다 슬라이드 전환
};

// 자동 슬라이드 중지
const stopAutoScroll = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
});
</script>

<template>
  <div class="w-full max-w-6xl mx-auto my-12">
    <!-- 추천 매물 헤더 -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">
        뉴집스 AI가 딱 맞는 매물을 추천했어요 🏡
      </h2>
      <a href="#" class="text-blue-500 hover:underline text-sm font-medium">
        더 많은 보기 &gt;
      </a>
    </div>

    <!-- 추천 매물 캐러셀 -->
    <div class="relative overflow-hidden rounded-lg shadow-md bg-white">
      <!-- 슬라이드 트랙 -->
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, index) in recommendations"
          :key="index"
          class="flex-shrink-0 w-1/3 px-4"
        >
          <!-- 슬라이드 카드 -->
          <div class="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              :src="item.image"
              alt="Recommendation Image"
              class="w-full h-56 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 truncate">
                {{ item.title }}
              </h3>
              <p class="text-sm text-gray-600 truncate">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 좌/우 버튼 -->
      <button
        @click="prevSlide"
        class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 shadow-md w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-100 transition"
      >
        &#8249;
      </button>
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 shadow-md w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-100 transition"
      >
        &#8250;
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 슬라이드 애니메이션 */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>
