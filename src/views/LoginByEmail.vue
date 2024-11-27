<script setup>
import { ref } from "vue";
import apiClient from "@/api";
import { useRouter } from "vue-router";

const router = useRouter(); // Vue Router 사용
// 로그인 입력값을 관리할 ref 객체
const email = ref("");
const pwd = ref("");

// 로그인 함수
const loginByEmail = async () => {
  try {
    // 요청 데이터
    console.log(email.value);
    console.log(pwd.value);
    const payload = {
      email: email.value,
      pwd: pwd.value,
    };
    // POST 요청
 const response = await apiClient.post("/api/members/login", payload, {
  headers: {
    "Content-Type": "application/json", // URL-encoded 형식 명시
  },});
    // 성공 데이터 반환 (필요 시 추가 작업)
    router.push("/"); // 특정 경로로 리다이렉트

    return response.data;
  } catch (error) {
    // 오류 처리
    console.error("로그인 실패:", error.response?.data || error.message);
    throw error;
  } 
};
</script>
<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="w-full max-w-lg bg-white rounded border border-gray-100 px-20 py-20 mt-24 rounded-lg">
        <h1 class="text-2xl font-bold mb-6 text-center mb-12">이메일로 로그인하기</h1>
        <form @submit.prevent="register" class="space-y-4">
          <!-- 이메일 -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              이메일 주소
            </label>
            <div class="flex items-center mt-1">
              <input
                v-model="email"
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                class="flex-1 block h-12 rounded-md border-gray-300 shadow-sm mb-8"
                required
              /></div>
              
          <!-- 비밀번호 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              v-model="pwd"
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm mb-8"
              required
              
            />
          </div>
        </div>
  
    
          <!-- 제출 버튼 -->
          <button
            type="submit"
            class="w-full bg-primary h-12 text-white py-2 px-4 rounded-md hover:bg-primary-dark transition"    
            @click="loginByEmail"     
          > 로그인 하기
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <style>
  body {
    font-family: "Inter", sans-serif;
  }
  
  .bg-primary {
    background-color: #5995ed;
  }
  
  .bg-primary-dark {
    background-color: #407bcd;
  }
  
  .text-primary {
    color: #5995ed;
  }
  </style>
  