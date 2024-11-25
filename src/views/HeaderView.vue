<template>
  <header class="h-20 font-PretendardRegular fixed inset-x-0 top-0 z-50 bg-white text-gray-700 body-font border-b border-gray-200">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img alt="logo" src="@/assets/img/logo.png" class="w-24 -mr-1" @click="goToHome" />
      </div>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a @click="goToMapView({ buildingUse: '아파트', sidoName: '서울특별시', gugunName: '종로구' });"  class="mr-5 hover:text-gray-900">지도</a>
        <a @click="goToIntroductionView" class="mr-5 hover:text-gray-900">회사소개</a>
        <div>
      <div v-if="userStore.userInfos.data.nickname">
        <button @click="goToMyPage">
        {{ userStore.userInfos.data.nickname}}
        </button>
      </div>
      <div v-else>
        <button
        type="button"
        class="mb-0 text-grey bg-white-400 hover:bg-blue-400 hover:text-white border focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:white"
        @click="goToLogin">
          로그인 | 회원가입
        </button>
      </div>
  </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'; // Pinia 스토어 import
import { onMounted } from 'vue';


const router = useRouter();

const goToHome = () => {
  router.push({ name: 'home' });
};

const goToLogin = () => {
  console.log('Login button clicked');
  router.push({ name: 'login' });
};

const goToMapView = (param) => {

  console.log('동작')

  if (!param) {
    console.error("param is not provided");
    return;
  }

  console.log("Received param:", param);
  // Router로 이동
  router.push({ name: 'map', query: { ...param } });
};

const goToIntroductionView = () =>{
  router.push({name: 'introduction'})
}

const goToMyPage = () => {
  router.push({name: 'mypage'})
}

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUserInfo();
  console.log(userStore.userInfos.data.nickname);
});

</script>
