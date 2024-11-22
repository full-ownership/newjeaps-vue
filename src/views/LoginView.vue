<script setup>
import emailBtn from '../assets/buttons/emailbtn.png';
import googleBtn from '../assets/buttons/googlebtn.png';
import kakaoBtn from '../assets/buttons/kakaobtn.png';
import loginImg from '../assets/img/loginPage3.gif';
import logo from '../assets/img/logo.png';

import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignup = () => {
  router.push({ name: 'signup' });
};
</script>

<template>
  <div class="login-container pt-32 pb-32">
    <div class="login-card">
      <!-- 로그인 이미지 -->
      <img alt="Login Illustration" :src="loginImg" class="login-image" />

      <!-- 로고 -->
      <img alt="Logo" :src="logo" class="login-logo" />

      <!-- 카카오 로그인 -->
      <button class="login-button">
        <img alt="Kakao Login" :src="kakaoBtn" class="login-button-img" />
      </button>

      <!-- 이메일 로그인 -->
      <button @click="goToSignup" class="login-button">
        <img alt="Email Login" :src="emailBtn" class="login-button-img" />
      </button>

      <!-- 구분선 -->
      <div class="separator">
        <div class="separator-line"></div>
        <span class="separator-text">또는</span>
        <div class="separator-line"></div>
      </div>

      <!-- 구글 로그인 -->
      <button class="google-button">
        <img alt="Google Login" :src="googleBtn" class="google-button-img" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 */
.login-container {
  display: flex;
  justify-content: center;
  font-family: 'PretendardRegular', sans-serif;
  background-color: #f9f9f9;
}

/* 로그인 카드 */
.login-card {
  border: 1px solid #ddd;
  background: #fff;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  margin: 64px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 로그인 이미지 */
.login-image {
  width: 100%;
  margin-bottom: 28px;
}

/* 로고 */
.login-logo {
  width: 33%;
  margin-bottom: 28px;
}

/* 버튼 */
.login-button {
  width: 100%;
  margin-top: 16px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.login-button-img {
  width: 100%;
  display: block;
}

/* 구글 버튼 */
.google-button {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.google-button-img {
  width: 40px;
}

/* 구분선 */
.separator {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

.separator-line {
  flex-grow: 1;
  border-top: 1px solid #ddd;
}

.separator-text {
  font-size: 12px;
  color: #999;
  margin: 0 8px;
  white-space: nowrap;
}
</style>
