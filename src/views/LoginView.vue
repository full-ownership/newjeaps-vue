<template>
    <div class="login-container pt-32 pb-32">
      <div class="login-card">
        <img alt="loginImg" :src="loginImg" class="login-image" />
        <img alt="logo" :src="logo" class="logo" />
  
        <div>
          <img alt="kakao" :src="kakaoBtn" class="kakao-button" />
        </div>
  
        <div>
          <img alt="email" :src="emailBtn" class="email-button" />
        </div>
  
        <div class="separator">
          <div class="separator-line"></div>
          <span class="separator-text">또는</span>
          <div class="separator-line"></div>
        </div>
  
        <img alt="google" :src="googleBtn" class="google-button" />
      </div>
    </div>
  </template>
  
  <script>
  import emailBtn from '../assets/buttons/emailbtn.png';
  import googleBtn from '../assets/buttons/googlebtn.png';
  import kakaoBtn from '../assets/buttons/kakaobtn.png';
  import loginImg from '../assets/img/loginPage3.gif';
  import logo from '../assets/img/logo.png';
  
  export default {
    name: 'Login',
    data() {
      return {
        emailBtn,
        googleBtn,
        kakaoBtn,
        loginImg,
        logo,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    font-family: 'PretendardRegular', sans-serif;
  }
  
  .login-card {
    border: 1px solid #ddd;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    margin-top: 64px;
    margin-bottom: 64px;
    border-radius: 8px;
  }
  
  .login-image {
    width: 100%;
    margin: auto;
  }
  
  .logo {
    width: 33%;
    margin-top: 28px;
  }
  
  .kakao-button,
  .email-button {
    width: 100%;
    margin-top: 16px;
  }
  
  .separator {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 16px;
  }
  
  .separator-line {
    flex-grow: 1;
    border-top: 1px solid #ddd;
  }
  
  .separator-text {
    font-size: 12px;
    color: #999;
    margin: 0 8px;
  }
  
  .google-button {
    width: 40px;
    margin-top: 16px;
  }
  </style>
  