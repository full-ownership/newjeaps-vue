<script setup>
import { ref } from "vue";
import axios from "axios";
import apiClient from "@/api";

// 데이터
const title = ref("");
const content = ref("");


// 공지사항 등록 함수
const submitNotice = async () => {
try {
  const payload = {
    title: title.value,
    content: content.value,
  };

  const response = await apiClient.post(
    "/api/service/notice", // 실제 서버 주소
    payload,
    {
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  title.value = ""; // 입력 필드 초기화
  content.value = "";
} catch (error) {
  console.error(error);
}
};


// 제출 상태
const submitted = ref(false);

// // 글쓰기 제출 처리
// const submitPost = () => {
//   if (title.value && content.value) {
//     submitted.value = true; // 작성 완료 상태 변경
//   }
// };
</script>


<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-8">
      <div class="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">글쓰기</h1>
        <form @submit.prevent="submitNotice" class="space-y-4">
          <!-- 제목 입력 -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">제목</label>
            <input
              v-model="title"
              id="title"
              type="text"
              placeholder="제목을 입력하세요"
              class="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
  
          <!-- 내용 입력 -->
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">내용</label>
            <textarea
              v-model="content"
              id="content"
              placeholder="내용을 입력하세요"
              rows="5"
              class="mt-1 block w-full px-4 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
  
          <!-- 제출 버튼 -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              작성 완료
            </button>
          </div>
        </form>
      </div>
  
      <!-- 작성된 내용 출력 -->
      <div v-if="submitted" class="w-full max-w-2xl mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">작성된 내용</h2>
        <div class="space-y-2">
          <p class="text-gray-700"><strong>제목:</strong> {{ title }}</p>
          <p class="text-gray-700"><strong>내용:</strong> {{ content }}</p>
        </div>
      </div>
    </div>
  </template>
  

  
  <style scoped>
  /* 기본 폰트 설정 */
  body {
    font-family: 'Inter', sans-serif;
  }
  </style>
  