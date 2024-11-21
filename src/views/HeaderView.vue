<template>
  <header class="h-20 font-PretendardRegular fixed inset-x-0 top-0 z-50 bg-white text-gray-700 body-font border-b border-gray-200">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <div class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img alt="logo" src="@/assets/img/logo.png" class="w-24 -mr-1" @click="goToHome" />
      </div>
      <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <a @click="goToMapView" href="" class="mr-5 hover:text-gray-900">지도</a>
        <a @click="goToIntroductionView" class="mr-5 hover:text-gray-900">회사소개</a>
        <button
          type="button"
          class="mb-0 text-grey bg-white-400 hover:bg-blue-400 hover:text-white border focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:white"
          @click="goToLogin"
        >
          로그인 | 회원가입
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push({ name: 'home' });
};


const goToLogin = () => {
  console.log('Login button clicked');
  router.push({ name: 'login' });
};

const goToMapView = () => {
  router.push({name: 'map'});
}

const goToIntroductionView = () =>{
  router.push({name: 'introduction'})
}

</script>
