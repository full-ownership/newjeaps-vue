<script setup>
import apartment from "@/assets/icons/apartment.png";
import heart from "@/assets/icons/heart.png";
import notice from "@/assets/icons/notice.png";
import ChatbotButton from '@/Component/Chatbot/ChatbotButton.vue'
import Footer from '@/Component/Footer/FooterView.vue'
import { useRouter } from "vue-router";
import { Carousel, Slide, Navigation as CarouselNavigation, Pagination } from "vue3-carousel";
import 'vue3-carousel/carousel.css'
import  CarouselImg1  from "@/assets/img/carousel/carousel1.png"
import  CarouselImg2  from "@/assets/img/carousel/carousel2.png"
import  CarouselImg3  from "@/assets/img/carousel/carousel3.png"
import  News  from "@/assets/icons/news.png"
import { ref } from "vue";

const router = useRouter();

const goToNotice = () => {
  router.push({ name: "notice" });
};

const goToMapView = (param) => {
  //console.log('mapView 등장')
  console.log(param)
  router.push({ name: 'map', params: {param} } );
}

const slides = ref([CarouselImg1, CarouselImg3, CarouselImg2]);

</script>

<template>
  <!-- 헤더 높이만큼 상단 마진 추가 -->
  <div class="flex flex-col items-center mt-20">
    <div class="w-full flex flex-col items-center ">
      <div class="bg-gray-200 my-8">
        <Carousel 
        :itemsToShow="2.5"
        :loop="true"
        :autoplay="false"
        :autoplaySpeed="3000"
        :paginationEnabled="true"
        :navigationEnabled="true"
        :draggingEnabled="true"
        :gap="12"
        :modelValue="2"
        class="carousel-wrapper">
          <Slide v-for="(slide, index) in slides" :key="index">
          <img :src="slide" alt="Carousel Image" />
          </Slide>
          <template #addons>
            <CarouselNavigation>
              <template #prev>
                <div>
                  <span class="carousel-prev-arrow">‹</span>
                </div>
              </template>
              <template #next>
                <span class="carousel-next-arrow">›</span>
              </template>
            </CarouselNavigation>
            <Pagination/>
          </template>
        </Carousel>
      </div>
      <!-- 콘텐츠 영역 -->
       <div class="font-PretendardSemiBold w-[75vw] text-xl mb-4">
       주요메뉴 바로가기 📌 
       </div>

      <div class="flex flex-row justify-center w-full bg-gray-100">
        <div class="flex flex-row w-[75vw] justify-around items-center my-8 ">
          <!-- 아파트 카드 -->
          <div class="card bg-white flex flex-row shadow-lg px-6 py-5 cursor-pointer" @click="goToMapView('아파트')">
            <div class="mr-4 flex justify-center items-center">
            <img alt="logo" :src="apartment" class="w-12 m-auto" />
          </div>
            <div class="flex flex-col">
              <div class="font-PretendardSemiBold text-s">아파트 매물 탐색하기 </div>
              <p class="font-PretendardRegular text-xs text-gray-700 mb-1">풍부한 단지정보 및 실시간 랭킹까지 →</p>
            </div>
          </div>

            <!-- 최신뉴스 카드 -->
         <div class="card bg-white flex flex-row shadow-lg px-6 py-5 cursor-pointer" @click="goToNotice">
            <div class="mr-4 flex justify-center items-center">
              <img alt="logo" :src="News" class="w-8 m-auto" />
            </div>
            <div class="flex flex-col">
              <div class="font-PretendardSemiBold text-s">부동산 뉴스</div>
              <p class="font-PretendardRegular text-xs text-gray-700 mb-1">관련 최신뉴스 확인하기</p>
            </div>
        </div>

        <!-- 관심목록 카드 -->
        <div class="card bg-white flex flex-row shadow-lg px-6 py-5  cursor-pointer" @click="goToMapView('아파트')">
          <div class="mr-4 flex justify-center items-center">
            <img alt="logo" :src="heart" class="w-8 m-auto" />
          </div>
            <div class="flex flex-col">
              <div class="font-PretendardSemiBold text-s">관심목록</div>
              <p class="font-PretendardRegular text-xs text-gray-700 mb-1">냐의 관심목록</p>
            </div>
            
          </div>

        <!-- 공지사항 카드 -->
        <div class="card bg-white flex flex-row shadow-lg px-6 py-5   cursor-pointer" @click="goToNotice">
            <div class="mr-4 flex justify-center items-center">
              <img alt="logo" :src="notice" class="w-8 m-auto" />
            </div>
            <div class="flex flex-col">
              <div class="font-PretendardSemiBold text-s">공지사항</div>
              <p class="font-PretendardRegular text-xs text-gray-700 mb-1">공지사항 / FAQ</p>
            </div>
        </div>

        <div class="card bg-white flex flex-row shadow-lg px-10 py-5 cursor-pointer card-with-background" @click="goToNotice">
            <div class="flex flex-col justify-center">
              <div class="font-PretendardSemiBold text-md text-white mb-1">전세계약시 꼭 확인해아할 사항은?</div>
              <p class="font-PretendardRegular text-xs text-gray-700 text-white text-center"> ⚠️ 지금 바로 깡통전세 체크리스트 확인하기</p>
            </div>
        </div>
        </div>
        </div>
      
    </div>
    <Footer />
    <div class="fixed bottom-0 right-0 p-6">
      <ChatbotButton />
    </div>
  </div>

  <!-- <ChatbotButton /> -->

  
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
.carousel-wrapper {
  width: 75vw; /* 캐러셀 전체 너비 */
  margin: 0 auto;
  overflow: hidden; /* 가로 슬라이드가 넘치지 않도록 설정 */
  background-color: rgb(255, 255, 255);
}

.carousel-prev-arrow {
  color: #ffffff; /* 원하는 색상으로 변경 */
  font-size: 3rem; /* 화살표 크기 */
  transition: color 0.3s ease; /* hover 시 부드럽게 색상 변환 */
}

.carousel-next-arrow {
  color: #ffffff; /* 원하는 색상으로 변경 */
  font-size: 3rem; /* 화살표 크기 */
  transition: color 0.3s ease; /* hover 시 부드럽게 색상 변환 */
}

.slide {
  display: inline-block;
  width: 100%; /* 각 슬라이드가 캐러셀 컨테이너에 맞도록 */
  text-align: center;
}

.card-with-background {
  position: relative;
  background-image: url('@/assets/img/suspicious.jpg');
  background-size: cover;
  background-position: center;
}

.card-with-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4); /* 어두운 색상 (검은색)으로 오버레이 */
  z-index: 1; /* 오버레이가 이미지 위에 표시되도록 설정 */
}

</style>
