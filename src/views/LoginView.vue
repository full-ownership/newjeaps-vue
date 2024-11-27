<script setup>
import emailBtn from '../assets/buttons/emailbtn.png';
import googleBtn from '../assets/buttons/googlebtn.png';
import kakaoBtn from '../assets/buttons/kakaobtn.png';
import loginImg from '../assets/img/loginPage3.gif';
import logo from '../assets/img/logo.png';

import { useRouter } from 'vue-router';



const router = useRouter();

const goToSignup = () => {
  router.push('/signup'); // 라우터 이름으로 이동
};

// Google OAuth2 인증 URL로 리다이렉트
const redirectToGoogleAuth = () => {
  const googleAuthUrl = 'https://back.newjeaps.com/api/oauth2/authorization/google';
  window.location.href = googleAuthUrl; // 해당 URL로 이동
};
</script>

<template>
    <div class="login-container flex justify-center h-[100vh] pt-32 pb-32">
      <div class="login-card w-[30%] p-4 flex flex-col justify-center items-center">
        <div>
          <img alt="loginImg" :src="loginImg" class="login-image mb-6" />
        </div>
        
        <div class="mb-6 flex justify-center">
          <img alt="logo" :src="logo" class="logo" width="150"/>
        </div>
        

        <div class="mb-2">
          <img alt="kakao" :src="kakaoBtn" class="kakao-button" />
        </div>

        <div class="mb-2">
          <img alt="email" :src="emailBtn" class="email-button" />
        </div>

        <div class="separator">
          <div class="separator-line"></div>
          <div class="separator-text text-center text-bold mb-4">또는</div>
          <div class="separator-line"></div>
        </div>
        <div class="flex justify-center">
          <img alt="google" :src="googleBtn" class="google-button w-[40px] mb-4" 
          @click="redirectToGoogleAuth"/>
        </div>
        <div>
          <a href="#" @click.prevent="goToSignup" class="text-blue-500 hover:text-blue-700 font-semibold">
      회원가입
    </a>
        </div>
      </div>
    </div>
  
</template>

  <style scoped>

  </style>
